import React, { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../App_Scripts/index.scss';

import '../../../../App_Scripts/themes/dark.scss';

import { GridOptions } from 'ag-grid-community';
import { LicenseManager } from 'ag-grid-enterprise';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import { AdaptableBlotterOptions, PredefinedConfig } from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(500);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableBlotterOptions: AdaptableBlotterOptions = {
    vendorGrid: gridOptions,
    primaryKey: 'tradeId',
    userName: 'demo user',
    blotterId: 'layout demo',
    predefinedConfig: demoConfig,
    layoutOptions: {
      includeVendorStateInLayouts: true,
      autoSaveLayouts: true,
      autoSizeColumnsInLayout: true,
      autoSizeColumnsInPivotLayout: true,
    },
  };

  const adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Theme', 'Export', 'Layout'],
  },

  Layout: {
    CurrentLayout: 'Simple Layout',
    Layouts: [
      {
        Name: 'Simple Layout',
        Columns: ['country', 'currency', 'tradeId', 'notional', 'counterparty'],
      },
      {
        Name: 'Sorting Layout',
        ColumnSorts: [
          {
            Column: 'counterparty',
            SortOrder: 'Descending',
          },
          {
            Column: 'currency',
            SortOrder: 'Descending',
          },
        ],
        Columns: ['country', 'currency', 'tradeId', 'notional', 'counterparty'],
        GroupedColumns: [],
      },
      {
        ColumnSorts: [
          {
            Column: 'currency',
            SortOrder: 'Descending',
          },
        ],
        GroupedColumns: ['currency', 'country'],
        Columns: ['country', 'currency', 'tradeId', 'notional', 'counterparty'],
        Name: 'Grouping Layout',
      },
      {
        Columns: ['bid', 'ask'],
        Name: 'Pivoted Layout',
        GroupedColumns: ['currency'],
        PivotDetails: {
          PivotColumns: ['status', 'stars'],
          AggregationColumns: ['bid', 'ask'],
        },
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
