import React, { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';

import '../../../../src/index.scss';

import '../../../../src/themes/dark.scss';

import { GridOptions } from '@ag-grid-community/all-modules';
import Adaptable from '../../../../src/agGrid';
import { AdaptableOptions, PredefinedConfig } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(500);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'demo user',
    adaptableId: 'layout demo',
    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: demoConfig,
    layoutOptions: {
      includeVendorStateInLayouts: true,
      autoSaveLayouts: true,
      autoSizeColumnsInLayout: true,
      autoSizeColumnsInPivotLayout: true,
    },
  };

  const adaptableApi = Adaptable.init(adaptableOptions);
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Layout'],
  },

  Layout: {
    CurrentLayout: 'Basic Group Layout',
    Layouts: [
      {
        GroupedColumns: ['currency'],
        Columns: ['tradeId', 'currency', 'counterparty'],
        Name: 'Basic Group Layout',
      },
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
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableDemo();
  }, []);

  return null;
};
