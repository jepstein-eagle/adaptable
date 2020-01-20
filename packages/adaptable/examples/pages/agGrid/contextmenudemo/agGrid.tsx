import { useEffect } from 'react';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';

import { GridOptions } from '@ag-grid-community/all-modules';
import Adaptable from '../../../../App_Scripts/agGrid';
import { AdaptableOptions, PredefinedConfig, AdaptableApi } from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AdaptableMenuItem, MenuInfo } from '../../../../App_Scripts/PredefinedConfig/Common/Menu';
import { ColumnSort } from '../../../../App_Scripts/PredefinedConfig/Common/ColumnSort';

var adaptableApi: AdaptableApi;
function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(100);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  //gridOptions.getContextMenuItems = getContextMenuItems;

  //gridOptions.singleClickEdit = true;
  const adaptableOptions: AdaptableOptions = examplesHelper.createAdaptableOptionsTrade(
    gridOptions,
    'context menu demo'
  );
  adaptableOptions.predefinedConfig = demoConfig;
  adaptableOptions.userInterfaceOptions = {
    showAdaptableToolPanel: true,
    //showAdaptableContextMenu: true,
    //showAdaptableContextMenu: false,

    showAdaptableContextMenu: (menuItem: AdaptableMenuItem) => {
      if (menuItem.FunctionName === 'ColumnChooser' || menuItem.FunctionName === 'SmartEdit') {
        return false;
      }
      return true;
    },
  };

  adaptableApi = Adaptable.init(adaptableOptions);
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Layout', 'SystemStatus'],
  },
  SystemStatus: {
    ShowAlert: false,
  },
  UserInterface: {
    // the hardcoded way
    /*
    ContextMenuItems: [
      {
        Label: 'Mimise Dashboard',
        UserMenuItemClickedFunction: () => {
          adaptableApi.dashboardApi.minimise();
        },
      },
      {
        Label: 'Set System Status',
        SubMenuItems: [
          {
            Label: 'Set Error',
            UserMenuItemClickedFunction: () => {
              adaptableApi.systemStatusApi.setErrorSystemStatus('System Down');
            },
          },
          {
            Label: 'Set Warning',
            UserMenuItemClickedFunction: () => {
              adaptableApi.systemStatusApi.setWarningSystemStatus('System Slow');
            },
          },
          {
            Label: 'Set Success',
            UserMenuItemClickedFunction: () => {
              adaptableApi.systemStatusApi.setSuccessSystemStatus('System Fine');
            },
          },
          {
            Label: 'Set Info',
            UserMenuItemClickedFunction: () => {
              adaptableApi.systemStatusApi.setInfoSystemStatus('Demos working fine');
            },
          },
        ],
      },
    ],
*/

    // the function way
    ContextMenuItems: (menuinfo: MenuInfo) => {
      return menuinfo.Column.Sortable
        ? [
            {
              Label: 'Sort Column',
              Icon:
                '<img width="15" height="15" src="https://img.icons8.com/ios-glyphs/30/000000/sort.png">',
              UserMenuItemClickedFunction: () => {
                let customSort: ColumnSort = {
                  Column: menuinfo.Column.ColumnId,
                  SortOrder: 'Ascending',
                };
                adaptableApi.gridApi.sortAdaptable([customSort]);
              },
            },
          ]
        : [];
    },
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
