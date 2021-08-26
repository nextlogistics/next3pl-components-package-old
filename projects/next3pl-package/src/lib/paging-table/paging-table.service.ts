import { Injectable } from '@angular/core';
import {PagingResponse} from './paging.model';

@Injectable()
export class PagingTableService {
    public defaultPaging: PagingResponse | undefined;

    constructor() {
    }
}
