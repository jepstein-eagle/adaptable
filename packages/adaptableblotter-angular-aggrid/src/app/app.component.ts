import { Component } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import HarnessHelper from './harness-helper';
import DataGenerator from './data-generator';
import { IAdaptableBlotterOptions } from 'adaptableblotter-angular-aggrid';

@Component({
  selector: 'adaptableblotter-root',
  template: `
  <div>
    <adaptable-blotter
      [adaptableBlotterOptions]="blotterOptions">
    </adaptable-blotter>
    <div id="grid">
    <ag-grid-angular
      style="width: 100%; height: 97vh;"
      class="ag-theme-blue"
      [rowData]="rowData"
      [columnDefs]="columnDefs"
      [gridOptions]="gridOptions">
    </ag-grid-angular>
    </div>
  </div>
  `
})
export class AppComponent {

  gridOptions: GridOptions = {
    columnDefs: new HarnessHelper().getTradeSchema(),
    rowData: new DataGenerator().getTrades(5000),
    enableRangeSelection: true,
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

