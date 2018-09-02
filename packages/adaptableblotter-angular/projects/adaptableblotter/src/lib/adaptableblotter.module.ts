import { NgModule } from '@angular/core';
import { AdaptableBlotterComponent } from './adaptableblotter.component';
import { AdaptableblotterAgGridComponent } from './adaptableblotter-aggrid.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [AgGridModule.withComponents([])],
  declarations: [AdaptableBlotterComponent, AdaptableblotterAgGridComponent],
  exports: [AdaptableBlotterComponent]
})
export class AdaptableBlotterModule { }
