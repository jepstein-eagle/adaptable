// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';

import { RedComponentComponent } from './red-component/red-component.component';
import { AdaptableBlotterAngularAgGridModule } from '../../projects/adaptableblotter-angular-aggrid/src/public-api';

@NgModule({
  declarations: [AppComponent, RedComponentComponent],
  imports: [
    BrowserModule,
    AdaptableBlotterAngularAgGridModule,
    AgGridModule.withComponents([RedComponentComponent]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
