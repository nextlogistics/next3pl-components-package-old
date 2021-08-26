import {NgModule} from '@angular/core';
import {Next3plPackageComponent} from './next3pl-package.component';
import {PagingTableModule} from "./paging-table/paging-table.module";


@NgModule({
  declarations: [
    Next3plPackageComponent,
    PagingTableModule
  ],
  imports: [],
  exports: [
    Next3plPackageComponent
  ]
})
export class Next3plPackageModule {
}
