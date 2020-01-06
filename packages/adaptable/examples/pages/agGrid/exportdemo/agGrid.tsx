import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import { GridOptions } from 'ag-grid-community';
import {
  AdaptableOptions,
  PredefinedConfig,
  AdaptableApi,
  SearchChangedEventArgs,
} from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import Adaptable from '../../../../agGrid';

var api: AdaptableApi;

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 5000;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Export Demo',
    vendorGrid: gridOptions,
    predefinedConfig: demoConfig,
  };

  adaptableOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };

  api = Adaptable.init(adaptableOptions);
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Layout', 'Export', 'SystemStatus'],
  },
  Export: {
    RawValueColumns: ['bid', 'tradeDate'],
  },
  Layout: {
    Layouts: [
      {
        ColumnSorts: [],
        Columns: [
          'tradeId',
          'notional',
          'bid',
          'bloombergBid',
          'tradeDate',
          'settlementDate',
          'ask',
          'counterparty',
          'country',
        ],
        Name: 'export layout',
        // GroupedColumns: ['currency'],
        GroupedColumns: [],
      },
    ],
    CurrentLayout: 'export layout',
  },
};

export default () => {
  useEffect(() => {
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableDemo();
  }, []);

  return null;
};
