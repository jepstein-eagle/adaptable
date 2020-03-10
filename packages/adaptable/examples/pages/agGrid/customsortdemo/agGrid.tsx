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
import { ApplicationDataEntry } from '../../../../src/PredefinedConfig/ApplicationState';

var api: AdaptableApi;

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 500;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Custom Sort Demo',
    //  plugins: [finance()],
    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: demoConfig,
    userFunctions: {
      customSortFunctions: {
        customCountrySorter: (valueA: any, valueB: any, nodeA?: any, nodeB?: any) => {
          if (valueA === 'United Kingdom') {
            return -1;
          }
          if (valueB === 'United Kingdom') {
            return 1;
          }
          return nodeA.data.notional > nodeB.data.notional ? 1 : -1;
        },
      },
    },
  };

  api = Adaptable.init(adaptableOptions);

  api.eventApi.on('AdaptableReady', () => {
    let entries: ApplicationDataEntry[] = api.applicationApi.getApplicationDataEntries();
    let existingEntry = entries.find(e => e.Key == 'ClearedCache');
    if (existingEntry) {
      console.log('nothing to do as we have an entry');
      console.log(existingEntry);
    } else {
      console.log('no entry so need to create one');
      let applicationDataEntry: ApplicationDataEntry = {
        Key: 'ClearedCache',
        Value: new Date(),
      };
      api.applicationApi.addApplicationDataEntry(applicationDataEntry);
    }
  });
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Layout', 'Export', 'CellSummary'],
  },
  Calendar: {
    CurrentCalendar: 'United Kingdom',
  },
  CustomSort: {
    CustomSorts: [
      {
        ColumnId: 'country',
        CustomSortComparerFunction: 'customCountrySorter',
      },
      {
        ColumnId: 'counterparty',
        SortedValues: ['Citi', 'Nat West'],
      },
      {
        ColumnId: 'status',
        SortedValues: ['Pending', 'Completed', 'Rejected'],
        /*
        CustomSortComparerFunction: (valueA: any, valueB: any, nodeA: any, nodeB: any) => {
          var requiredOrder = ['Pending', 'Completed', 'Rejected'];
            return requiredOrder.indexOf(valueA) - requiredOrder.indexOf(valueB);
        },
        */
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
