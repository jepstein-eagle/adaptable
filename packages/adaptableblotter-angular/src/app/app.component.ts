import { Component } from '@angular/core';
import { IAdaptableBlotterOptions } from 'adaptableblotter-angular';
import { GridOptions } from 'ag-grid';

@Component({
  selector: 'adaptableblotter-root',
  template: `
  <div>
    <adaptable-blotter
      [adaptableBlotterOptions]="blotterOptions"
      vendorGridName="agGrid">
    </adaptable-blotter>
    <ag-grid-angular
      style="width: 100%; height: 97vh;"
      class="ag-theme-balham"
      [rowData]="rowData"
      [columnDefs]="columnDefs"
      [gridOptions]="gridOptions">
    </ag-grid-angular>
  </div>
  `
})
export class AppComponent {
  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];

  columnDefs = [
    { headerName: 'Make', field: 'make' },
    { headerName: 'Model', field: 'model' },
    { headerName: 'Price', field: 'price' }
  ];

  gridOptions: GridOptions = {
    enableSorting: true
  };

  blotterOptions: IAdaptableBlotterOptions = {
    primaryKey: 'make',
    vendorGrid: this.gridOptions,
    userName: 'UtibeAbasi',
    blotterId: 'demo blotter',
  };
}
