import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-blue.css';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import '../../../../App_Scripts/index.scss';
import {
  IAdaptableBlotter,
  AdaptableBlotterOptions,
  PredefinedConfig,
} from '../../../../App_Scripts/types';
import { GridOptions } from 'ag-grid-community';
import { ExamplesHelper } from '../../ExamplesHelper';

var adaptableblotter: IAdaptableBlotter;

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(500);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  // creating blotter options here so we can add audit
  const adaptableBlotterOptions: AdaptableBlotterOptions = {
    vendorGrid: gridOptions,
    primaryKey: 'tradeId',
    userName: 'demo user',
    blotterId: 'advanced search demo',
  };
  adaptableBlotterOptions.predefinedConfig = demoConfig;

  adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);

  examplesHelper.autoSizeDefaultLayoutColumns(adaptableblotter, gridOptions);
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['AdvancedSearch'],
  },

  AdvancedSearch: {
    AdvancedSearches: [
      {
        Expression: {
          ColumnValueExpressions: [
            {
              ColumnDisplayValues: ['Goldman Sachs', 'JP Morgan'],
              ColumnId: 'counterparty',
              ColumnRawValues: ['Goldman Sachs', 'JP Morgan'],
            },
          ],
        },
        Name: 'hello',
      },
    ],
    CurrentAdvancedSearch: 'hello',
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
