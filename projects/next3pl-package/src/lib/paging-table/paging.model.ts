export interface IPaging {
  pageNumber: number;
  pageSize: number;
  pageSortBy: string;
  pageSortDir: string;
}

export interface IPagingResponse extends IPaging {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  pageCount: number;
  totalItemCount: number;
}

export class Paging {
  pageNumber: number;
  pageSize: number;
  pageSortBy: string;
  pageSortDir: string;

  constructor(paging: IPaging) {
    this.pageNumber = paging.pageNumber;
    this.pageSize = paging.pageSize;
    this.pageSortBy = paging.pageSortBy;
    this.pageSortDir = paging.pageSortDir;
  }

  public setPaging(paging: IPaging): void {
    this.pageNumber = paging.pageNumber;
    this.pageSize = paging.pageSize;
    this.pageSortBy = paging.pageSortBy;
    this.pageSortDir = paging.pageSortDir;
  }
}

export class PagingResponse extends Paging {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  pageCount: number;
  totalItemCount: number;

  constructor(response: IPagingResponse) {
    const paging = {
      pageNumber: response.pageNumber,
      pageSize: response.pageSize,
      pageSortBy: response.pageSortBy,
      pageSortDir: response.pageSortBy
    } as IPaging;
    super(paging);
    this.hasNextPage = response.hasNextPage;
    this.hasPreviousPage = response.hasPreviousPage;
    this.isFirstPage = response.isFirstPage;
    this.isLastPage = response.isLastPage;
    this.pageCount = response.pageCount;
    this.totalItemCount = response.totalItemCount;
  }
}

export interface NgxTableColumn {
  prop: string;
  name: string;
  sortable: boolean;
  resizable: boolean;
  minWidth: number;
  maxWidth: number;
  width?: number;
  isLink?: boolean;
  isDate?: boolean;
  iconList?: PagingTableActions[];
  progressObj?: PagingTableProgressProps;
  convertToReadableText?: boolean;
}

export interface PagingTableProgressProps {
  isProgress: boolean;
  progressValue: string;
  totalValue: string;
  height: string;
}

export interface PagingTableActions {
  iconName: string;
  iconColor: any;
  actionName: string;
}

export interface PagingTableActionsWithRow extends PagingTableActions {
  row: any;
}

export interface PagingTableColumnLink {
  row: any;
  columnProp: string;
}
export interface PageInfo {
  offset: number;
  pageSize: number;
  limit: number;
  count: number;
}
export interface SortAttr {
  prop: string;
  dir: string;
}
export interface ProgressColor {
  frontColor: string;
  backGroundColor: string;
}
