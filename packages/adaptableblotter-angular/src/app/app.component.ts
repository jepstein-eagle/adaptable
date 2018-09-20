import { Component } from '@angular/core';
import { IAdaptableBlotterOptions } from 'adaptableblotter-angular';
import { GridOptions } from 'ag-grid';
import HarnessHelper from './harness-helper';
import DataGenerator from './data-generator';

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

  gridOptions: GridOptions = {
    columnDefs: new HarnessHelper().getTradeSchema(),
    rowData: new DataGenerator().getTrades(5000),
    enableSorting: true,
    enableRangeSelection: true,
    enableFilter: true,
    enableColResize: true
  };

  blotterOptions: IAdaptableBlotterOptions = {
    primaryKey: 'tradeId',
    vendorGrid: this.gridOptions,
    userName: 'demo user',
    blotterId: 'angular wrapper',
    useDefaultVendorGridThemes: true
  };
}
