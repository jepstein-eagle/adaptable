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
    showAdaptableBlotterContextMenu: item => {
      if (typeof item != 'string' && item.name === 'Show Column Chooser') {
        return false;
      }
      return true;
    },
  };

  adaptableBlotterOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };

  api = AdaptableBlotter.init(adaptableBlotterOptions);
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Layout', 'AdvancedSearch'],
    MinimisedHomeToolbarButtonStyle: {
      Variant: 'text',
      Tone: 'success',
    }, //
  },
  ToolPanel: {
    VisibleToolPanels: ['Export', 'Layout', 'ColumnFilter'],
  },
  // SystemFilter: {
  //   SystemFilters: ['Positive', 'Today', 'Blanks'],
  // },
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
