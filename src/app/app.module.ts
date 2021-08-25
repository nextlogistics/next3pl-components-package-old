import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PagingTableModule} from './next3pl-ngx-paging-table/paging-table.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagingTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
