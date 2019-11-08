import { Component } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

import rowData from './rowData';
import columns from './columns';
import { AdaptableBlotterOptions } from '../../../adaptableblotter/types';
import { BlotterApi } from '../../../adaptableblotter/types';

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

  theOptions: AdaptableBlotterOptions = {
    primaryKey: 'OrderId',
    userName: 'demo user',
    blotterId: 'an angular wrapper',
    containerOptions: {
      vendorContainer: 'adaptableBlotter',
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

  onBlotterReady(api: BlotterApi) {
    console.log('blotter ready!!!', api);

    api.auditEventApi.on('AuditCellEdited', function(args) {
      console.warn(args, '!!!!!');
    });
  }
}
