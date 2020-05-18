import { Component } from '@angular/core';
import { GridOptions, Module } from '@ag-grid-community/all-modules';

import rowData from './rowData';
import columns from './columns';
import {
  AdaptableOptions,
  AdaptableApi,
} from '@adaptabletools/adaptable/types';

import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SideBarModule } from '@ag-grid-enterprise/side-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'APP_ROOT';
  adaptableStyle = {
    height: '100vh',
  };

  public gridOptions: GridOptions;
  public modules: Module[] = [RangeSelectionModule, MenuModule, SideBarModule];

  theOptions: AdaptableOptions = {
    primaryKey: 'OrderId',
    userName: 'demo user',
    adaptableId: 'an angular wrapper',
    containerOptions: {
      vendorContainer: 'vendorDiv', // is this rights
    },
    predefinedConfig: {},
    userInterfaceOptions: {
      showAdaptableToolPanel: true,
    },
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

  onAdaptableReady({
    adaptableApi,
    vendorGrid,
  }: {
    adaptableApi: AdaptableApi;
    vendorGrid: GridOptions;
  }) {
    console.log('adaptable ready!!!', adaptableApi);

    adaptableApi.auditEventApi.on('AuditCellEdited', args => {
      console.warn(args, '!!!!!');
    });

    adaptableApi.eventApi.on('SelectionChanged', selection => {
      console.warn('selection changed', selection);
    });
  }
}
