import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppAgGridComponent } from './app-aggrid.component';
import { AppHyperGridComponent } from './app-hypergrid.component';
import { AdaptableBlotterModule } from 'adaptableblotter-angular';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    AppAgGridComponent,
    AppHyperGridComponent,
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
    AppHyperGridComponent,
  ]
})
export class AppModule { }
