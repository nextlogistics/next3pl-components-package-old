import { Paging } from './paging-table/paging.model';
export class ResponseData<T> {
  constructor(dataType: T) {
  }

  success!: boolean;
  data: T | any;
  errors?: any[];
  // some requests send this property directly
  errorMessage?: string;
  paging?: Paging;
  mismatchParams?: boolean;
  pagingInjectedOnController?: boolean;
}
