import { Component } from '@angular/core';
import { IAdaptableBlotterOptions } from 'adaptableblotter-angular';
import { GridOptions } from 'ag-grid';

import HarnessHelper from './harness-helper';
import DataGenerator from './data-generator';

@Component({
  selector: 'adaptableblotter-aggrid-root',
  template: `
   <div id="adaptableblotter-aggrid-react-demo-app">
    <adaptable-blotter-aggrid
      [adaptableBlotterOptions]="blotterOptions"
      [gridOptions]="gridOptions">
    </adaptable-blotter-aggrid>
  </div>
  `
})
export class AppAgGridComponent {
  gridOptions: GridOptions = {
    columnDefs: new HarnessHelper().getTradeSchema(),
    rowData: new DataGenerator().getTrades(5000),
    enableSorting: true,
    enableRangeSelection: true,
    enableFilter: true,
    floatingFilter: true,
    enableColResize: true,
    suppressColumnVirtualisation: false,
  };
  blotterOptions: IAdaptableBlotterOptions = {
    primaryKey: 'tradeId',
    vendorGrid: this.gridOptions,
    userName: 'demo user',
    blotterId: 'AgGrid Wrapper',
    useDefaultVendorGridThemes: true
  };
}
