import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {SelectionType} from '@swimlane/ngx-datatable';
import {
  IPaging,
  IPagingResponse,
  NgxTableColumn,
  PageInfo,
  Paging,
  PagingResponse,
  PagingTableActions,
  PagingTableActionsWithRow,
  PagingTableColumnLink,
  ProgressColor,
  SortAttr
} from './paging.model';
import {PagingTableService} from './paging-table.service';
import {ResponseData} from '../common.model';
import {errorLogForDevelopment} from "../helpers/message";

// extend PagingBase class to your component class
@Component({
  selector: 'next3pl-paging-table',
  templateUrl: './paging-table.component.html',
  styleUrls: ['./paging-table.component.css']
})
export class PagingTableComponent implements OnInit, AfterViewInit {
  @ViewChild('dataTableWrapper', {static: true}) private dataTableWrapper!: ElementRef;

  @Output() selectedRow = new EventEmitter<any[]>();
  @Output() tableLinkClick = new EventEmitter<PagingTableColumnLink>();
  @Output() iconAction = new EventEmitter<PagingTableActionsWithRow>();
  @Input() pageChangeAction!: Subject<Paging>;
  @Input() public updateTable!: Subject<Paging>;
  @Input() pagingResponse!: Subject<ResponseData<any>>;
  @Input() needActionsColumn!: boolean;
  // ngx table properties
  @Input() pageSortByColumn!: string;
  @Input() sortByDirection!: string;
  @Input() isRowsSelectable!: boolean;
  @Input() tableColumns!: NgxTableColumn[];
  @Input() selectionType!: SelectionType;
  public rowSelected = [];

  public defaultPaging: IPagingResponse | undefined;
  public isLoading = false;
  public tableDataList = new BehaviorSubject<any[]>([]);

  private calcPageSize = 10;
  private cache: any = {};
  private sortAttr: SortAttr | undefined;
  private pagingFilter: Paging | undefined;

  constructor(private pagingService: PagingTableService) {
  }

  ngOnInit(): void {
    this.defaultPaging = this.getDefaultPaging();
    this.sortAttr = {} as SortAttr;
    this.sortAttr.dir = this.sortByDirection;
    this.sortAttr.prop = this.pageSortByColumn;
    this.updateTable.subscribe(async (filter: Paging) => {
      this.isLoading = true;
      this.cache = [];
      this.cache[0] = true;
      this.pagingFilter = filter;
      if (!this.pagingFilter) {
        this.pagingFilter = new Paging({} as IPaging);
      }
      // the only way to show the amount of pages is setting rows size
      this.defaultPaging = this.getDefaultPaging();
      this.pagingFilter?.setPaging(this.defaultPaging);
      await this.pageChangeAction.next(filter);
    });
    this.pagingResponseSubscriber();
  }

  ngAfterViewInit(): void {
    if (this.dataTableWrapper.nativeElement && this.defaultPaging) {
      this.calcPageSize = Math.round(+this.dataTableWrapper.nativeElement.offsetHeight / 45);
      this.defaultPaging.pageSize = this.calcPageSize;
    }
  }

  private getDefaultPaging(): PagingResponse {
    return this.pagingService.defaultPaging = {
      pageNumber: 1,
      pageSize: this.calcPageSize,
      pageSortBy: this.pageSortByColumn,
      totalItemCount: 30,
      pageSortDir: this.sortByDirection
    } as PagingResponse;
  }

  private pagingResponseSubscriber(): void {
    if (!this.pagingResponse) {
      errorLogForDevelopment('this.pagingResponse is undefined at pagingResponseSubscriber');
      return;
    }
    this.pagingResponse.subscribe(response => {
      if (response) {
        this.setTableDataAndPaging(response).then();
      }
    });
  }

  public getProgressColor(value: number, total: number): ProgressColor {
    let percentage = (value / total) * 100;
    let color = {} as ProgressColor;
    if (!value) {
      percentage = 0;
    }
    if (value > total) {
      percentage = 100;
    }
    if (percentage < 55) {
      color = {backGroundColor: 'white', frontColor: 'primary'};
    } else if (percentage >= 55 && percentage < 75) {
      color = {backGroundColor: 'white', frontColor: 'accent'};
    } else if (percentage > 75) {
      color = {backGroundColor: 'white', frontColor: 'green'};
    }

    return color;
  }

  public onSort(sortingTO: any): void {

    this.cache = [];
    this.tableDataList.next([]);
    this.sortAttr = sortingTO.sorts[0];
    if (!this.sortAttr) {
      errorLogForDevelopment('this.sortAttr is undefined at onSort');
      return;
    }
    if (!this.defaultPaging) {
      this.defaultPaging = this.getDefaultPaging();
    }
    this.defaultPaging.pageSortBy = this.sortAttr.prop.replace(/(\w)(\w*)/g,
      (g0: any, g1: string, g2: any) => {
        return g1.toUpperCase() + g2;
      });
    this.defaultPaging.pageSortDir = this.sortAttr.dir.toUpperCase();
    this.setPage({offset: 0, pageSize: this.defaultPaging.pageSize} as PageInfo).then();
  }

  public async setPage(pageInfo: PageInfo): Promise<void> {
    if (!this.defaultPaging) {
      return;
    }
    this.isLoading = true;
    // current page number is determined by last call to setPage
    this.defaultPaging.pageNumber = pageInfo.offset + 1;

    // don't load same data twice
    if (this.cache[pageInfo.offset]) {
      this.isLoading = false;
      return;
    }
    this.cache[pageInfo.offset] = true;
    // class to identify loading page
    const page = this.defaultPaging;
    page.pageNumber = pageInfo.offset + 1;
    page.pageSize = pageInfo.pageSize;

    if (!this.pagingFilter) {
      this.pagingFilter = new Paging({} as IPaging);
    }
    this.pagingFilter.setPaging(this.defaultPaging);
    await this.pageChangeAction.next(this.pagingFilter);
  }

  private async setTableDataAndPaging(response: any): Promise<void> {
    this.defaultPaging = response.paging as PagingResponse;
    if (!this.sortAttr) {
      errorLogForDevelopment('this.sortAttr is undefined at onSort');
      return;
    }
    if (!this.defaultPaging) {
      this.defaultPaging = this.getDefaultPaging();
    }
    this.defaultPaging.pageSortDir = this.sortAttr.dir.toUpperCase();
    let rows: any[] = [];

    /* TODO:
        use the splice to get in between pages
        to fix the issue with the list that adds to the actual list, force creating a list with all positions till the
        last page with empty objects then replace the data of that page
     */

    // if it is the first page, needs to clear all data because it is a new set of data
    // such as filter changed or new request
    if (this.defaultPaging.pageNumber === 1) {
      if (response.data && response.data.length) {
        rows = [...response.data];
      } else {
        rows = [];
      }
    } else {
      // other pages have to keep the old data and concat them
      // when scroll pages also need to keep the data
      rows = [...this.tableDataList.value, ...response.data];
    }

    this.tableDataList.next(rows);
    this.isLoading = false;
  }

  // for next version


  public onRowSelect({selected}: any): void {
    // if (this.isRowsSelectable) {
    //     this.rowSelected.splice(0, this.rowSelected.length);
    //     this.rowSelected.push(...selected);
    // }
    this.selectedRow.emit(selected);
  }

  public onActivate($event: any): void {

  }

  public onTableLinkClick(params: PagingTableColumnLink): void {
    this.tableLinkClick.emit(params);
  }

  public onActionIcon(icon: PagingTableActions, row: any): void {
    this.iconAction.emit({...icon, row});
  }
}

