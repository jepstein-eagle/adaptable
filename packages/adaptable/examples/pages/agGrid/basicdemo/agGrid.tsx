import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import { GridOptions } from '@ag-grid-community/all-modules';
import {
  AdaptableOptions,
  PredefinedConfig,
  AdaptableApi,
  SearchChangedEventArgs,
  MenuInfo,
} from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';
import Adaptable from '../../../../agGrid';
import { AdaptableReadyInfo } from '../../../../src/Api/Events/AdaptableReady';
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
    adaptableId: 'Basic Demo',

    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: demoConfig,
  };

  adaptableOptions.layoutOptions = {
    //   autoSizeColumnsInLayout: true,
  };
  adaptableOptions.userInterfaceOptions = {
    showAdaptableToolPanel: true,
  };
  adaptableOptions.filterOptions = {
    clearFiltersOnStartUp: true,
  };
  adaptableOptions.searchOptions = {
    clearSearchesOnStartUp: true,
  };

  api = Adaptable.init(adaptableOptions);

  (globalThis as any).api = api;

  api.eventApi.on('AdaptableReady', (info: AdaptableReadyInfo) => {
    setTimeout(() => {
      let firstNode: any = api.gridApi.getFirstRowNode();
      api.gridApi.selectNode(firstNode);
      let pkNode: any = api.gridApi.getRowNodeForPrimaryKey(21);
      api.gridApi.selectNode(pkNode);
    }, 500);
  });

  api.eventApi.on('SearchChanged', (searchChangedArgs: SearchChangedEventArgs) => {
    //  console.log('search changed');
    //  console.log(searchChangedArgs.data[0].id);
  });
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['QuickSearch', 'Layout', 'SystemStatus'],
    MinimisedHomeToolbarButtonStyle: {
      Variant: 'text',
      Tone: 'success',
    }, //
  },

  Layout: {
    // CurrentLayout: 'Layout Two',
    Layouts: [
      {
        Columns: ['country', 'currency'],
        Name: 'Layout One',
      },
      {
        Columns: ['lastUpdated', 'tradeId'],
        Name: 'Layout Three',
      },
      {
        Columns: [
          'lastUpdated',
          'bid',
          'ask',
          'notional',
          'tradeId',
          'currency',
          'counterparty',
          'country',
        ],
        Name: 'Layout Two',
      },
    ],
  },

  Entitlements: {
    DefaultAccessLevel: 'Full',
    FunctionEntitlements: [
      {
        FunctionName: 'ColumnCategory',
        AccessLevel: 'Hidden',
      },
      {
        FunctionName: 'ColumnChooser',
        AccessLevel: 'Full',
      },
      {
        FunctionName: 'Export',
        AccessLevel: 'Hidden',
      },
      {
        FunctionName: 'Layout',
        AccessLevel: 'Full',
      },
      {
        FunctionName: 'CustomSort',
        AccessLevel: 'Hidden',
      },
    ],
  },
  Shortcut: {
    Shortcuts: [
      {
        ColumnType: 'Number',
        IsDynamic: false,
        ShortcutKey: 'K',
        ShortcutOperation: 'Multiply',
        ShortcutResult: '1000',
      },
      {
        ColumnType: 'Date',
        IsDynamic: true,
        ShortcutKey: 'N',
        ShortcutOperation: 'Replace',
        ShortcutResult: 'Next Work Day',
      },
    ],
  },
  PercentBar: {
    PercentBars: [
      {
        ColumnId: 'notional',
        PositiveValue: 1496,
        PositiveColor: '#006400',
        ShowValue: false,
        ShowToolTip: true,
      },
    ],
  },
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
  UserInterface: {
    ColumnMenuItems: (menuinfo: MenuInfo) => {
      console.log('in the function');
      console.log(menuinfo);
      return [];
    },
    ContextMenuItems: (menuinfo: MenuInfo) => {
      //  console.log('in the function');
      //   console.log(menuinfo);
      return [
        {
          Label: 'Sort Column',
          Icon:
            '<img width="15" height="15" src="https://img.icons8.com/ios-glyphs/30/000000/sort.png">',
          UserMenuItemClickedFunction: () => {
            let customSort: ColumnSort = {
              Column: menuinfo.Column.ColumnId,
              SortOrder: 'Ascending',
            };
            //      adaptableApi.gridApi.sortAdaptable([customSort]);
          },
        },
      ];
    },
  },
  ToolPanel: {
    VisibleToolPanels: ['Export', 'Layout', 'SystemStatus', 'ColumnFilter'],
  },

  SystemStatus: {
    // ShowAlert: false,
    DefaultStatusMessage: 'This is default message and its quite long',
    DefaultStatusType: 'Success',
    StatusMessage: 'overriding with this',
    StatusType: 'Error',
  },

  ConditionalStyle: {
    ConditionalStyles: [
      {
        ConditionalStyleScope: 'Column', // 'DataType',
        ColumnId: 'moodysRating',
        // DataType: 'Number',
        Style: {
          BackColor: '#32cd32',
        },
        Expression: {
          FilterExpressions: [{ ColumnId: 'notional', Filters: ['Positive', 'Negative'] }],
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
