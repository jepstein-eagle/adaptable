import { useEffect } from 'react';

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
  const tradeData: any = examplesHelper.getTrades(100);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  //gridOptions.singleClickEdit = true;
  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Named Filters Demo',
    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: demoConfig,
    userFunctions: [
      {
        type: 'NamedFilter.FilterPredicate',
        name: 'usdTrades',
        handler(_record, _columnId, cellValue) {
          return cellValue === 'USD';
        },
      },
      {
        type: 'NamedFilter.FilterPredicate',
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
        type: 'NamedFilter.FilterPredicate',
        name: 'bizYear',
        handler(_record, _columnId, cellValue) {
          let dateToTest = cellValue as Date;
          let startBusinesssYear = new Date('2019-04-05');
          return dateToTest > startBusinesssYear;
        },
      },
    ],
  };

  const adaptableApi = Adaptable.init(adaptableOptions);
}

let demoConfig: PredefinedConfig = {
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

  ColumnFilter: {
    ColumnFilters: [
      {
        ColumnId: 'currency',
        Filter: {
          FilterExpressions: [
            {
              Filters: ['$ Trades'],
              ColumnId: 'currency',
            },
          ],
        },
      },
    ],
  },

  ColumnCategory: {
    ColumnCategories: [
      {
        ColumnCategoryId: 'MyCategory',
        ColumnIds: ['currency', 'country'],
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
