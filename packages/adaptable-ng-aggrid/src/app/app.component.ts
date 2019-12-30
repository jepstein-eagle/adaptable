import { Component } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

import rowData from './rowData';
import columns from './columns';
import { AdaptableOptions } from '../../../adaptable/types';
import { AdaptableApi } from '../../../adaptable/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'APP_ROOT';
  blotterStyle = {
    height: '100vh',
  };

  public gridOptions: GridOptions;

  theOptions: AdaptableOptions = {
    primaryKey: 'OrderId',
    userName: 'demo user',
    adaptableId: 'an angular wrapper',
    containerOptions: {
      vendorContainer: 'vendorDiv', // is this rights
    },
    predefinedConfig: {},
    auditOptions: {
      auditCellEdits: {
        auditAsEvent: true,
      },
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
      onGridReady: params => {
        console.log(params);
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

  onAdaptableReady(api: AdaptableApi) {
    console.log('adaptable ready!!!', api);

    api.auditEventApi.on('AuditCellEdited', function(args) {
      console.warn(args, '!!!!!');
    });
  }
}
