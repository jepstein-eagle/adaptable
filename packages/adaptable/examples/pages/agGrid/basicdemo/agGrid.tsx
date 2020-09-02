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
import { getColumnsFromExpression } from '../../../../src/parser/src';
var api: AdaptableApi;

async function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 500;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  gridOptions.sideBar = 'columns';
  const tickingDataHelper = new TickingDataHelper();

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Basic Demo New',
    userInterfaceOptions: {
      //  showAdaptableToolPanel: false,
      //showUngroupColumnMenuItem: false,
      adaptableToolPanelTitle: 'Hello',
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
    filterOptions: {
      autoApplyFilter: false,
    },
    queryOptions: {
      maxColumnValueItemsDisplayed: 100000,
    },
    userFunctions: [
      {
        name: 'country',
        type: 'CustomSortComparerFunction',
        handler(valueA: any, valueB: any, nodeA?: any, nodeB?: any) {
          if (valueA === 'United Kingdom') {
            return -1;
          }
          if (valueB === 'United Kingdom') {
            return 1;
          }
          return 0;
        },
      },
      {
        name: 'currency',
        type: 'CustomSortComparerFunction',
        handler(valueA: any, valueB: any, nodeA?: any, nodeB?: any) {
          if (valueA === 'USD') {
            return -1;
          }
          if (valueB === 'USD') {
            return 1;
          }
          return 0;
        },
      },
      {
        name: 'PermittedValuesForCountry',
        type: 'GetColumnValuesFunction',
        handler(column: AdaptableColumn) {
          return ['uk', 'israel', 'jordan', 'malawi'];
        },
      },
      {
        name: 'LookupValuesForCounterparty',
        type: 'GetColumnValuesFunction',
        handler(column: AdaptableColumn) {
          return ['BAML', 'Nomura', 'UBS'];
        },
      },
    ],

    predefinedConfig: {
      CustomSort: {
        Revision: 2,
        CustomSorts: [
          {
            ColumnId: 'country',
            CustomSortComparerFunction: 'country',
          },
          {
            ColumnId: 'currency',
            CustomSortComparerFunction: 'currency',
          },
          {
            ColumnId: 'counterparty',
            SortedValues: ['Citi', 'Nat West'],
          },
          {
            ColumnId: 'status',
            SortedValues: ['Pending', 'Completed', 'Rejected'],
          },
        ],
      },

      Filter: {
        Revision: 4,
        UserFilters: [
          {
            Name: 'hello',
            Scope: {
              ColumnIds: ['currency'],
            },
          },
        ],
      },
      FormatColumn: {
        Revision: 7,
        FormatColumns: [
          {
            Scope: {
              DataTypes: ['Number'],
            },
            DisplayFormat: {
              Formatter: 'DateFormatter',
              Options: {
                Pattern: 'yyyyMMdd',
              },
            },
          },
        ],
      },
      // this is for testing distinct values
      // we have made the function better but its stil per column and not a promise
      // so it doubles up with the server values promise we have
      /*
      ConditionalStyle: {
        Revision: 35,
        ConditionalStyles: [
          {
            Scope: {
              All: true,
            },
            Style: {
              BackColor: 'yellow',
              ForeColor: undefined,
              FontWeight: 'Bold',
              FontStyle: 'Italic',
              FontSize: undefined,
              ClassName: '',
            },
            Expression: '[currency]="GBP"',
          },

          {
            Scope: {
              //  ColumnIds: ['notional', 'country', 'bid'],
              DataTypes: ['String'],
            },
            Style: {
              BackColor: '#0000ff',
              ForeColor: '#228B22',
              FontWeight: 'Bold',
              FontStyle: 'Italic',
              FontSize: undefined,
              ClassName: '',
            },
            Expression: '[country]="Canada"',
          },
          {
            Scope: {
              ColumnIds: ['notional', 'country', 'bid'],
            },
            Style: {
              BackColor: '#0000ff',
              ForeColor: '#228B22',
              FontWeight: 'Bold',
              FontStyle: 'Italic',
              FontSize: undefined,
              ClassName: '',
            },
            Expression: '[currency]="USD"',
          },
        ],
      },
      */
      UserInterface: {
        PermittedValuesItems: [
          /*
          // testing order
          // first one for all numbers
          {
            Scope: {
              DataTypes: ['Number'],
            },
            PermittedValues: [1, 2, 3],
          },

          // then one just for notional
          {
            Scope: {
              ColumnIds: ['notional'],
            },
            PermittedValues: [4, 5, 6],
          },
          */

          // for counterparty we will get a hard-coded list
          {
            Scope: {
              ColumnIds: ['counterparty'],
            },
            PermittedValues: ['first', 'second', 'third'],
          },
          // for status we will get a hard-coded list
          {
            Scope: {
              ColumnIds: ['status'],
            },
            PermittedValues: ['pending', 'mistaken'],
          },
          // for country we will call a function
          {
            Scope: {
              ColumnIds: ['country'],
            },
            GetColumnValuesFunction: 'PermittedValuesForCountry',
          },
          {
            Scope: {
              DataTypes: ['Date'],
            },
            PermittedValues: [],
          },
        ],

        EditLookUpItems: [
          {
            Scope: {
              ColumnIds: ['country'],
            },
            LookUpValues: ['UK', 'France', 'Italy', 'Germany'],
          },
          {
            Scope: {
              ColumnIds: ['counterparty'],
            },
            GetColumnValuesFunction: 'LookupValuesForCounterparty',
          },

          {
            Scope: {
              ColumnIds: ['status'],
            },
          },
          {
            Scope: {
              ColumnIds: ['currency'],
            },
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

  //  tickingDataHelper.useTickingDataagGrid(adaptableOptions.vendorGrid, api, 1000, tradeCount);

  setTimeout(() => {
    api.eventApi.on('AdaptableReady', () => {
      console.log('READY');
    });
  }, 1000);

  api.eventApi.on('SearchChanged', (searchChangedArgs: SearchChangedEventArgs) => {
    //   console.log('search changed');
    //   console.log(searchChangedArgs.data[0].id);
  });

  console.log('cols', getColumnsFromExpression('[A] > Min([B], [C])'));
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
