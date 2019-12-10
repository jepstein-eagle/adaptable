import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';
import './index.css';

import { GridOptions } from 'ag-grid-community';
import {
  AdaptableBlotterOptions,
  PredefinedConfig,
  BlotterApi,
} from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import AdaptableBlotter from '../../../../agGrid';

var api: BlotterApi;

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 5000;
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
    autoSizeColumnsInLayout: true,
  };

  api = AdaptableBlotter.init(adaptableBlotterOptions);

  api.eventApi.on('BlotterReady', () => {
    // let test = api.columnFilterApi.getAllColumnFilterForColumn('notional');
    /// console.log(test);
    api.internalApi.setMainMenuItems([]);
  });
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['QuickSearch', 'Export', 'Layout', 'AdvancedSearch'],
    MinimisedHomeToolbarButtonStyle: {
      Variant: 'text',
      Tone: 'success',
    },
  },
  SystemFilter: {
    SystemFilters: [],
  },
  SystemStatus: {
    // ShowAlert: false,
    DefaultStatusMessage: 'This is default message and its quite long',
    DefaultStatusType: 'Warning',
    StatusMessage: 'overriding with this',
    StatusType: 'Error',
  },

  Layout: {
    Layouts: [
      {
        ColumnSorts: [],
        Columns: ['tradeId', 'notional', 'counterparty', 'country'],
        Name: 'fixing a bug',
        // GroupedColumns: ['currency'],
        GroupedColumns: [],
      },
    ],
    CurrentLayout: 'fixing a bug',
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
