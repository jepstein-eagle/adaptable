import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-blue.css';
import Adaptable from '../../../../App_Scripts/agGrid';
import '../../../../App_Scripts/index.scss';
import {
  IAdaptable,
  AdaptableOptions,
  PredefinedConfig,
  AdaptableApi,
} from '../../../../App_Scripts/types';
import { GridOptions } from 'ag-grid-community';
import { ExamplesHelper } from '../../ExamplesHelper';

var adaptableApi: AdaptableApi;

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(500);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    vendorGrid: gridOptions,
    primaryKey: 'tradeId',
    userName: 'demo user',
    adaptableId: 'advanced search demo',
  };
  adaptableOptions.predefinedConfig = demoConfig;

  adaptableApi = Adaptable.init(adaptableOptions);
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
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableDemo();
  }, []);

  return null;
};
