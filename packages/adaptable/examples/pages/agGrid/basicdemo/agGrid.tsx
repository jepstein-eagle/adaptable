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
    autoSizeColumnsInLayout: true,
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

  api.eventApi.on('AdaptableReady', (info: AdaptableReadyInfo) => {
    // to see which is the pinned row then do...
    //  let pinnedRowNode: RowNode = gridOptions.api!.getPinnedTopRow(0);
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

  Layout: {
    Layouts: [
      {
        ColumnSorts: [],
        Columns: ['moodysRating', 'tradeId', 'notional', 'counterparty', 'country'],
        Name: 'design-time layout',
        // GroupedColumns: ['currency'],
        GroupedColumns: [],
      },
    ],
    //   CurrentLayout: 'fixing a bug',
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
