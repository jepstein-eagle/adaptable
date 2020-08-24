import { useEffect } from 'react';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';
import { GridOptions } from '@ag-grid-community/all-modules';
import {
  AdaptableOptions,
  AdaptableApi,
  AdaptableReadyInfo,
  SearchChangedEventArgs,
  AdaptableColumn,
} from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';
import Adaptable from '../../../../agGrid';
import { TickingDataHelper } from '../../TickingDataHelper';
var api: AdaptableApi;

async function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 5;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Basic Demo New',
    userInterfaceOptions: {
      showAdaptableToolPanel: true,
      //showUngroupColumnMenuItem: false,
    },
    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    generalOptions: {
      showMissingColumnsWarning: false,
    },
    layoutOptions: {
      autoSizeColumnsInDefaultLayout: false,
      includeExpandedRowGroups: true,
    },
    userFunctions: [
      {
        name: 'PermittedValuesForCountry',
        type: 'PermittedValuesFetchFunction',
        handler(column: AdaptableColumn) {
          return ['uk', 'israel', 'jordan', 'malawi'];
        },
      },
    ],

    predefinedConfig: {
      // this is for testing distinct values
      // we have made the function better but its stil per column and not a promise
      // so it doubles up with the server values promise we have

      UserInterface: {
        Revision: 6,
        PermittedValuesItems: [
          // for counterparty we will get a hard-coded list
          {
            Scope: {
              ColumnIds: ['counterparty'],
            },
            PermittedValues: ['first', 'second', 'third'],
          },
          // for country we will call a function
          {
            Scope: {
              ColumnIds: ['country'],
            },
            PermittedValuesFetchFunction: 'PermittedValuesForCountry',
          },
          {
            Scope: {
              DataType: 'Date',
            },
            PermittedValues: [],
          },
        ],
      },

      Layout: {
        Revision: 25,
        CurrentLayout: 'Sigal',
        CreateDefaultLayout: true,
        Layouts: [
          {
            Name: 'Sigal',
            Columns: [
              'country',
              'tradeId',
              'bid',
              'currency',
              'countryStars',
              'notional',
              'counterparty',
            ],
            //    ColumnWidthMap: {
            //      bid: 500,
            //      currency: 1000,
            //    },
            ColumnSorts: [
              {
                ColumnId: 'countryStars',
                SortOrder: 'Asc',
              },
              {
                ColumnId: 'bid',
                SortOrder: 'Asc',
              },
            ],
            //   RowGroupedColumns: ['country'],
            // ExpandedRowGroupKeys: ['Spain', 'China'],
            AggregationColumns: {
              notional: 'count',
              tradeId: 'sum',
            },
            //   EnablePivot: true,
            //    PivotColumns: ['country', 'status'],
            //    PinnedColumnsMap: {
            //     country: 'right',
            //      currency: 'left',
            //    },
          },
        ],
      },
    },
  };

  api = await Adaptable.init(adaptableOptions);

  //  tickingDataHelper.useTickingDataagGrid(adaptableOptions.vendorGrid, api, 200, tradeCount);

  setTimeout(() => {
    api.eventApi.on('AdaptableReady', () => {
      console.log('READY');
    });
  }, 10000);

  api.eventApi.on('SearchChanged', () => {
    //  console.log('search changed');
    //  console.log(searchChangedArgs.data[0].id);
  });
}

export default () => {
  useEffect(() => {
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableDemo();
  }, []);

  return null;
};
