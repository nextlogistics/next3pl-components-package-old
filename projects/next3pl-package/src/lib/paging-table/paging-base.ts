import { BehaviorSubject, Subject } from 'rxjs';
import { SelectionType } from '@swimlane/ngx-datatable';
import {ResponseData} from '../common.model';
import {NgxTableColumn, Paging} from './paging.model';

export class PagingBase<T> {
    // paging table variables
    public pagingResponse: BehaviorSubject<ResponseData<T> | undefined> | undefined;
    public updateTable: Subject<Paging>;
    public pageChangeAction: Subject<Paging>;
    public selectionType: SelectionType;
    public tableColumns: NgxTableColumn[] = [];

    constructor() {
        this.pagingResponse = new BehaviorSubject<ResponseData<T> | undefined>(undefined);
        this.updateTable = new Subject<Paging>();
        this.pageChangeAction = new Subject<Paging>();
        this.selectionType = SelectionType.single;
    }

    // this is to set the response got from request and this will subscribed in paging-table component
    public setPagingResponse(response: ResponseData<T>): void {
        this.pagingResponse?.next(response);
    }
}
