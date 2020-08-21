import React, { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';

import { GridOptions, RowNode } from '@ag-grid-community/all-modules';
import Adaptable from '../../../../src/agGrid';
import { AdaptableOptions, PredefinedConfig, AdaptableReadyInfo } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';

async function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(50000);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  gridOptions.rowGroupPanelShow = 'always';

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'demo user',
    adaptableId: 'layout demo',
    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: demoConfig,
    userFunctions: [
      {
        name: 'countryComparer',
        type: 'CustomSortComparerFunction',
        handler(valueA: any, valueB: any, nodeA?: any, nodeB?: any) {
          if (valueA === 'United Kingdom') {
            return -1;
          }
          if (valueB === 'United Kingdom') {
            return 1;
          }

          if (valueA < valueB) {
            return -1;
          } else if (valueA > valueB) {
            return 1;
          } else {
            return 0;
          }
        },
      },
    ],
    layoutOptions: {
      includeVendorStateInLayouts: true,
      autoSaveLayouts: true,
      //  autoSizeColumnsInLayout: true,
      autoSizeColumnsInPivotLayout: true,
    },
  };

  const adaptableApi = await Adaptable.init(adaptableOptions);

  adaptableApi.eventApi.on('AdaptableReady', (info: AdaptableReadyInfo) => {
    let grid: GridOptions = info.vendorGrid as GridOptions;
    //  let renderedNodes: RowNode[] = grid.api.
    //  console.log(renderedNodes);

    setTimeout(() => {
      //    adaptableApi.gridApi.expandAllRowGroups();
    }, 2000);
    setTimeout(() => {
      // adaptableApi.gridApi.expandRowGroupsForValues(['France', 'Japan', 'Italy']);
    }, 7000);
  });
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Layout'],
    IsInline: true,
    Revision: 455,
  },
  CustomSort: {
    CustomSorts: [
      {
        ColumnId: 'country',
        CustomSortComparerFunction: 'countryComparer',
      },
      {
        ColumnId: 'currency',
        SortedValues: ['EUR', 'CHF', 'ZAR', 'CAD'],
      },
    ],
  },
  Layout: {
    CurrentLayout: 'Sorting Layout',
    Layouts: [
      {
        RowGroupedColumns: ['currency'],
        Columns: ['tradeId', 'currency', 'counterparty', 'bid', 'ask', 'notional', 'country'],
        Name: 'Basic Group Layout',
      },
      {
        Name: 'Simple Layout',
        Columns: ['country', 'currency', 'tradeId', 'notional', 'counterparty'],
      },
      {
        Name: 'Sorting Layout',
        ColumnSorts: [
          // {
          //   Column: 'counterparty',
          //   SortOrder: 'Desc',
          // },
          {
            Column: 'currency',
            SortOrder: 'Asc',
          },
        ],
        Columns: ['country', 'currency', 'tradeId', 'notional', 'counterparty'],
        //  GroupedColumns: ['currency'],
      },
      {
        // ColumnSorts: [
        //   {
        //     Column: 'currency',
        //     SortOrder: 'Desc',
        //   },
        // ],
        //  GroupedColumns: ['currency', 'country'],
        RowGroupedColumns: ['currency'],
        Columns: ['tradeId', 'currency', 'counterparty', 'bid', 'ask', 'notional', 'country'],
        Name: 'Grouping Layout',
      },
      {
        Columns: ['bid', 'ask'],
        Name: 'Pivoted Layout',
        RowGroupedColumns: ['currency'],

        PivotColumns: ['status', 'stars'],
        AggregationColumns: { bid: true, ask: true },
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
