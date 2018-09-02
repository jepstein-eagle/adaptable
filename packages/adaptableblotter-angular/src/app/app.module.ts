import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppAgGridComponent } from './app-aggrid.component';
import { AdaptableBlotterModule } from 'adaptableblotter-angular';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    AppAgGridComponent
  ],
  imports: [
    BrowserModule,
    AdaptableBlotterModule,
    AgGridModule.withComponents([]),
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    AppAgGridComponent,
  ]
})
export class AppModule { }
