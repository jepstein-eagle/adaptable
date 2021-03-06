import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import { GridOptions } from '@ag-grid-community/all-modules';
import { AdaptableOptions, PredefinedConfig, AdaptableApi } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';

import Adaptable from '../../../../agGrid';

var api: AdaptableApi;

async function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 20;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Column Filters Demo',

    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: demoConfig,
    userFunctions: [
      {
        id: 'US_Banks',
        type: 'FilterPredicate',
        scope: { DataTypes: ['String'] },
        name: 'US Banks',
        handler: ({ value, inputs }) => {
          return value == 'Citi' || value == 'JP Morgan';
        },
      },
      /*
      {
        type: 'FilterPredicate',
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
        type: 'FilterPredicate',
        name: 'bizYear',
        handler(_record, _columnId, cellValue) {
          let dateToTest = cellValue as Date;
          let startBusinesssYear = new Date('2019-04-05');
          return dateToTest > startBusinesssYear;
        },
      },
      */
    ],
  };

  adaptableOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };
  adaptableOptions.userInterfaceOptions = {};
  adaptableOptions.filterOptions = {
    autoApplyFilter: true,
  };

  api = await Adaptable.init(adaptableOptions);
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    Tabs: [
      {
        Name: 'Test',
        Toolbars: ['Filter'],
      },
    ],
  },
  Filter: {
    //   SystemFilters: ['GreaterThan', 'LessThan', 'Positive'], // implementation is in Adaptable
    FilterPredicates: ['US_Banks'], // implementation is in UserFunctions
    ColumnFilters: [
      {
        ColumnId: 'currency',
        Predicate: { Id: 'StartsWith', Inputs: ['e'] },
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
