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

LicenseManager.setLicenseKey(process.env.ENTERPRISE_LICENSE!);
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

  adaptableBlotterOptions.advancedOptions = {
    userFunctions: {
      namedFilterFunctions: [
        {
          name: 'USD Currency',
          func: (_record, _columnId, cellValue) => {
            return cellValue === 'USD';
          },
        },
        {
          name: 'Big Notional',
          func: (_record, _columnId, cellValue) => {
            let currency: string = _record.data.currency;
            if (currency === 'USD') {
              return cellValue > 100;
            } else if (currency === 'EUR') {
              return cellValue > 50;
            } else {
              return cellValue > 25;
            }
          },
        },
        {
          name: 'Business Year',
          func: (_record, _columnId, cellValue) => {
            let dateToTest = cellValue as Date;
            let startBusinesssYear = new Date('2019-04-05');
            return dateToTest > startBusinesssYear;
          },
        },
      ],
    },
  };

  const adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);
  examplesHelper.autoSizeDefaultLayoutColumns(adaptableblotter, gridOptions);
  adaptableblotter.applyLightTheme();
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
        PredicateName: 'USD Currency',
      },
      {
        Name: 'High',
        Scope: {
          DataType: 'Number',
        },
        PredicateName: 'Big Notional',
      },
      {
        Name: 'Biz Year',
        Scope: {
          DataType: 'Date',
        },
        PredicateName: 'Business Year',
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
