import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';

import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';

import { GridOptions } from '@ag-grid-community/all-modules';
import { LicenseManager } from 'ag-grid-enterprise';
import Adaptable from '../../../../src/agGrid';
import { AdaptableOptions, PredefinedConfig } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(100);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  //gridOptions.singleClickEdit = true;
  const adaptableOptions: AdaptableOptions = examplesHelper.createAdaptableOptionsTrade(
    gridOptions,
    'named filters demo'
  );
  adaptableOptions.predefinedConfig = demoConfig;
  adaptableOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };

  const adaptableApi = Adaptable.init(adaptableOptions);
}

let demoConfig: PredefinedConfig = {
  NamedFilter: {
    NamedFilters: [
      {
        Name: '$ Trades',
        Scope: {
          DataType: 'Number',
          ColumnIds: ['currency'],
        },
        FilterPredicate: (_record, _columnId, cellValue) => {
          return cellValue === 'USD';
        },
      },
      {
        Name: 'High',
        Scope: {
          DataType: 'Number',
        },
        FilterPredicate: (_record, _columnId, cellValue) => {
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
        Name: 'Biz Year',
        Scope: {
          DataType: 'Date',
        },
        FilterPredicate: (_record, _columnId, cellValue) => {
          let dateToTest = cellValue as Date;
          let startBusinesssYear = new Date('2019-04-05');
          return dateToTest > startBusinesssYear;
        },
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
