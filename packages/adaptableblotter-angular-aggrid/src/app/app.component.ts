import { Component } from '@angular/core';
import { IAdaptableBlotterOptions } from 'adaptableblotter-angular-aggrid';
import { GridOptions } from 'ag-grid-community';
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
    <div id="grid">
    <ag-grid-angular
      style="width: 100%; height: 97vh;"
      [rowData]="rowData"
      [columnDefs]="columnDefs"
      [gridOptions]="gridOptions">
    </ag-grid-angular>
    </div>
  </div>
  `
  // if useDefaultVendorGridThemes is false in BlotterOptions then add an agGrid theme in the angular component
  // e.g. something like:  class="ag-theme-balham"
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
    containerOptions: {
      adaptableBlotterContainer: 'adaptableBlotter'
    }
  };
}
