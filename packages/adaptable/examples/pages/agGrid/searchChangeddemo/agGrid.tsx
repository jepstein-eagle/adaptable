import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-blue.css';
import Adaptable from '../../../../src/agGrid';
import '../../../../src/index.scss';

import {
  IAdaptable,
  AdaptableOptions,
  SearchChangedEventArgs,
  AdaptableApi,
  PredefinedConfig,
  MenuInfo,
} from '../../../../src/types';
import { GridOptions } from '@ag-grid-community/all-modules';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';
import { ColumnSort } from '../../../../src/PredefinedConfig/Common/ColumnSort';

var api: AdaptableApi;

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 100;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Search Changed Demo',

    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: demoConfig,
    userFunctions: [
      {
        type: 'NamedFilterPredicate',
        name: 'usdTrades',
        handler(_record, _columnId, cellValue) {
          return cellValue === 'USD';
        },
      },
      {
        type: 'NamedFilterPredicate',
        name: 'high',
        handler(_record, _columnId, cellValue) {
          let currency: string = _record.data.currency;
          if (currency === 'USD') {
            return cellValue > 1000;
          } else if (currency === 'EUR') {
            return cellValue > 30;
          } else {
            return cellValue > 10;
          }
        },
      },
      {
        type: 'NamedFilterPredicate',
        name: 'bizYear',
        handler(_record, _columnId, cellValue) {
          let dateToTest = cellValue as Date;
          let startBusinesssYear = new Date('2019-04-05');
          return dateToTest > startBusinesssYear;
        },
      },
    ],
  };

  api = Adaptable.init(adaptableOptions);

  (globalThis as any).api = api;

  api.eventApi.on('SearchChanged', (searchChangedArgs: SearchChangedEventArgs) => {
    console.log('search changed');
    console.log(searchChangedArgs.data[0].id);
    console.log(searchChangedArgs.data[0].id.adaptableApi);
  });
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['QuickSearch', 'Layout', 'SystemStatus'],
  },

  NamedFilter: {
    NamedFilters: [
      {
        Name: '$ Trades',
        Scope: {
          ColumnIds: ['currency'],
        },
        FilterPredicate: 'usdTrades',
      },
      {
        Name: 'High',
        Scope: {
          DataType: 'Number',
        },
        FilterPredicate: 'high',
      },
      {
        Name: 'Biz Year',
        Scope: {
          DataType: 'Date',
        },
        FilterPredicate: 'bizYear',
      },
    ],
  },

  UserFilter: {
    UserFilters: [
      {
        Name: 'Europe',
        ColumnId: 'country',
        Expression: {
          ColumnValueExpressions: [
            {
              ColumnDisplayValues: ['France', 'Germany', 'Italy'],
              ColumnId: 'country',
            },
          ],
        },
      },
      {
        Name: 'Small Notionals',
        ColumnId: 'notional',
        Expression: {
          RangeExpressions: [
            {
              ColumnId: 'notional',
              Ranges: [
                {
                  Operand1: '1200',
                  Operand1Type: 'Value',
                  Operator: 'LessThan',
                },
              ],
            },
          ],
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
