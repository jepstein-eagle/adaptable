import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-blue.css';
import Adaptable from '../../../../src/agGrid';
import '../../../../src/index.scss';
import {
  IAdaptable,
  AdaptableOptions,
  PredefinedConfig,
  AdaptableApi,
} from '../../../../src/types';
import { GridOptions } from '@ag-grid-community/all-modules';
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
