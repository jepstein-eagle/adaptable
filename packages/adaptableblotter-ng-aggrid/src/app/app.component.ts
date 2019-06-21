import { Component } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

import rowData from './rowData';
import columns from './columns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'APP_ROOT';
  blotterStyle = {
    height: '100vh',
  };

  private gridOptions: GridOptions;

  theOptions: any = {
    primaryKey: 'OrderId',
    userName: 'demo user',
    blotterId: 'THE angular wrapper',
    licenceKey: 'abc5834u-yt5a4esp1-r1oq9jclf1',
    containerOptions: {
      vendorContainer: 'adaptableBlotter',
    },
  };
  constructor() {
    this.gridOptions = {
      animateRows: true,
      enableRangeSelection: true,
      floatingFilter: true,
      suppressAggFuncInHeader: true,
      sideBar: true,
      suppressMenuHide: true,
      rowData,
      onRowClicked: event => {
        console.log('row clicked', event);
      },
      columnDefs: columns,
      columnTypes: {
        abColDefNumber: {},
        abColDefString: {},
        abColDefBoolean: {},
        abColDefDate: {},
        abColDefObject: {},
      },
    };
  }
}
