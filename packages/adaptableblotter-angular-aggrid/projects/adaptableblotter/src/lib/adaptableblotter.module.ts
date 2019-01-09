import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdaptableBlotterComponent } from './adaptableblotter.component';
import { AdaptableblotterAgGridComponent } from './adaptableblotter-aggrid.component';
// import { AdaptableblotterHyperGridComponent } from './adaptableblotter-hypergrid.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    CommonModule,
    AgGridModule.withComponents([])
  ],
  declarations: [
    AdaptableBlotterComponent,
    AdaptableblotterAgGridComponent,
  ],
  exports: [
    AdaptableBlotterComponent,
    AdaptableblotterAgGridComponent,
  ]
})
export class AdaptableBlotterModule { }

