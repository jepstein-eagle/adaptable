import { Component } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import HarnessHelper from './harness-helper';
import DataGenerator from './data-generator';
import { IAdaptableBlotterOptions } from 'adaptableblotter-angular-aggrid';

@Component({
  selector: 'adaptableblotter-aggrid-root',
  template: `
    <div id="adaptableblotter-aggrid-angular-demo-app">
      <adaptable-blotter-aggrid
        [adaptableBlotterOptions]="blotterOptions"
        [gridOptions]="gridOptions"
        agTheme="balham"
      >
      </adaptable-blotter-aggrid>
    </div>
  `,
})
export class AppAgGridComponent {
  gridOptions: GridOptions = {
    columnDefs: new HarnessHelper().getTradeSchema(),
    rowData: new DataGenerator().getTrades(5000),
    enableRangeSelection: true,
    floatingFilter: true,
    suppressColumnVirtualisation: false,
  };
  blotterOptions: IAdaptableBlotterOptions = {
    primaryKey: 'tradeId',
    vendorGrid: this.gridOptions,
    userName: 'demo user',
    blotterId: 'AgGrid Wrapper',
    licenceKey: 'Community',
    containerOptions: {
      adaptableBlotterContainer: 'adaptableBlotter',
    },
  };
}
