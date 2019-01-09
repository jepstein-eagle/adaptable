import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppAgGridComponent } from './app-aggrid.component';
// import { AppHyperGridComponent } from './app-hypergrid.component';
import { SwitchComponent } from './switch.component';
import { AdaptableBlotterModule } from 'adaptableblotter-angular-aggrid';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    AppAgGridComponent,
  //  AppHyperGridComponent,
    SwitchComponent,
  ],
  imports: [
    BrowserModule,
    AdaptableBlotterModule,
    AgGridModule.withComponents([]),
  ],
  providers: [],
  bootstrap: [
    SwitchComponent,
  ]
})
export class AppModule { }
