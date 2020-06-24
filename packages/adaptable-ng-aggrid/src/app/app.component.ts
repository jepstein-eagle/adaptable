import { Component } from '@angular/core';
import {
  GridOptions,
  Module,
  ClientSideRowModelModule,
} from '@ag-grid-community/all-modules';

import rowData from './rowData';
import columns from './columns';
// import {
//   AdaptableOptions,
//   AdaptableApi,
// } from '@adaptabletools/adaptable/types';

import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { MenuModule } from '@ag-grid-enterprise/menu';

import { SideBarModule } from '@ag-grid-enterprise/side-bar';
import {
  AdaptableApi,
  AdaptableOptions,
} from '@adaptabletools/adaptable/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'APP_ROOT';

  public gridOptions: GridOptions;
  public rowData: any[];
  private showAdaptable = true;
  public modules: Module[] = [
    RangeSelectionModule,
    MenuModule,
    SideBarModule,
    ClientSideRowModelModule,
  ];

  theOptions: AdaptableOptions = {
    primaryKey: 'OrderId',
    userName: 'demo user',
    adaptableId: 'an angular wrapper',
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
    this.rowData = rowData;
    this.gridOptions = {
      animateRows: true,
      enableRangeSelection: true,

      suppressAggFuncInHeader: true,
      sideBar: true,
      suppressMenuHide: true,

      onRowClicked: event => {
        console.log('row clicked', event);
      },
      onGridReady: params => {
        console.log(params);
        const { api } = params;

        setTimeout(() => {
          setInterval(() => {
            const index = Math.round(Math.random() * rowData.length);
            let data = rowData[index];
            if (data) {
              data = { ...data };
              data.OrderCost = Math.round(Math.random() * 100);
              data.ItemCost = Math.round(Math.random() * 100);
              data.PackageCost = Math.round(Math.random() * 100);

              console.log(data);

              api.applyTransactionAsync({ update: [data] });
            }
          }, 100);
        }, 500);
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

    // setTimeout(() => {
    //   this.showAdaptable = true;

    //   setTimeout(() => {
    //     this.showAdaptable = false;
    //   }, 2000);
    // }, 1000);
  }

  onAdaptableReady({
    adaptableApi,
    vendorGrid,
  }: {
    adaptableApi: AdaptableApi;
    vendorGrid: GridOptions;
  }) {
    console.log('IS adaptable ready!!!', adaptableApi);

    adaptableApi.auditEventApi.on('AuditCellEdited', args => {
      console.warn(args, '!!!!!');
    });

    adaptableApi.eventApi.on('SelectionChanged', selection => {
      console.warn('selection changed', selection);
    });
  }
}
