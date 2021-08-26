<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { Next3plPackageComponent } from './next3pl-package.component';

=======
import {NgModule} from '@angular/core';
import {Next3plPackageComponent} from './next3pl-package.component';
import {PagingTableModule} from "./paging-table/paging-table.module";
>>>>>>> master


@NgModule({
  declarations: [
<<<<<<< HEAD
    Next3plPackageComponent
  ],
  imports: [
  ],
=======
    Next3plPackageComponent,
    PagingTableModule
  ],
  imports: [],
>>>>>>> master
  exports: [
    Next3plPackageComponent
  ]
})
<<<<<<< HEAD
export class Next3plPackageModule { }
=======
export class Next3plPackageModule {
}
>>>>>>> master
