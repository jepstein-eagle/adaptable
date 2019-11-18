import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';
import './index.css';

import { GridOptions } from 'ag-grid-community';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import {
  AdaptableBlotterOptions,
  PredefinedConfig,
  IAdaptableBlotter,
} from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { ActionColumnClickedEventArgs } from '../../../../App_Scripts/Api/Events/BlotterEvents';
import { ActionColumnRenderParams } from '../../../../App_Scripts/PredefinedConfig/ActionColumnState';
import Helper from '../../../../App_Scripts/Utilities/Helpers/Helper';
import { GridCell } from '../../../../App_Scripts/Utilities/Interface/Selection/GridCell';

/*
Basic demo that just tests that we can create an agGrid and an Adaptable Blotter working together
No JSON or anything complicated
Nor do we create the ag-Grid
*/

var adaptableblotter: IAdaptableBlotter;

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 50;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableBlotterOptions: AdaptableBlotterOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    blotterId: 'Basic Demo',

    vendorGrid: gridOptions,
    predefinedConfig: demoConfig,
  };

  adaptableBlotterOptions.generalOptions = {
    showAdaptableBlotterToolPanel: true,
  };

  adaptableBlotterOptions.layoutOptions = {
    autoSizeColumnsInDefaultLayout: true,
  };

  adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);

  adaptableblotter.api.eventApi.on('ActionColumnClicked', (args: ActionColumnClickedEventArgs) => {
    //  adaptableblotter.api.gridApi.deleteGridData([args.data[0].id.rowData]);
    let rowData: any = args.data[0].id.rowData;
    // rowData.notional = 38;
    // adaptableblotter.api.gridApi. ([rowData]);
    const rowDataNew = Object.assign({}, rowData);

    console.log('this is the new object we create');

    rowDataNew.notional = 200;
    rowDataNew.bidOfferSpread = 38;
    console.log(rowDataNew);
    adaptableblotter.api.gridApi.updateGridData([rowDataNew]);
    //gridOptions.api!.updateRowData({ update: [rowDataNew] });

    let gridCell: GridCell = {
      // columnId: 'bidOfferSpread',
      columnId: 'notional',
      value: 38,
      primaryKeyValue: args.data[0].id.primaryKeyValue,
    };
    // adaptableblotter.api.gridApi.setGridCell(gridCell);

    // args.data[0].id.rowData.setDataValue('bloombergBid', this.roundTo4Dp(bid - directionToAdd));
  });
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['QuickSearch', 'Export', 'Layout'],
  },
  ActionColumn: {
    ActionColumns: [
      {
        ColumnId: 'Delete',
        ButtonText: 'Delete Row',
        ShouldRenderPredicate: (params: ActionColumnRenderParams) => {
          return true; //return params.rowData.tradeDate < Date.now();
        },
        //  RenderFunction: (params: ActionColumnRenderParams) => {
        //    return params.rowData.currency === 'USD'
        //      ? '<button style="color:red; font-weight:bold">Delete Trade</button>'
        //      : '<button style="color:blue; font-weight:bold">Delete Trade</button>';
        //  },
      },
    ],
  },
};

export default () => {
  useEffect(() => {
    if (!process.browser) {
      return;
    }

    InitAdaptableBlotter();
  }, []);

  return null;
};
