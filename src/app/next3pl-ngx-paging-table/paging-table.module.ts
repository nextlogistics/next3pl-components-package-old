import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagingTableComponent} from './paging-table.component';
import {PagingTableService} from './paging-table.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [PagingTableComponent],
  exports: [
    PagingTableComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgxDatatableModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  providers: [PagingTableService]
})
export class PagingTableModule {
}
