import { useEffect } from 'react';

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
  const tradeData: any = examplesHelper.getTrades(100);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  //gridOptions.singleClickEdit = true;
  const adaptableBlotterOptions: AdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsTrade(
    gridOptions,
    'named filters demo'
  );
  adaptableBlotterOptions.predefinedConfig = demoConfig;
  adaptableBlotterOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };

  const blotterApi = AdaptableBlotter.init(adaptableBlotterOptions);
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
    if (!process.browser) {
      return;
    }

    InitAdaptableBlotter();
  }, []);

  return null;
};
