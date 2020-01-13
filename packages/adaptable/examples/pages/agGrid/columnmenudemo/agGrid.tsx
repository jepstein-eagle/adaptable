import { useEffect } from 'react';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import { GridOptions } from '@ag-grid-community/all-modules';
import Adaptable from '../../../../src/agGrid';
import { AdaptableOptions, PredefinedConfig, AdaptableApi } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AdaptableMenuItem, MenuInfo } from '../../../../src/PredefinedConfig/Common/Menu';

var adaptableApi: AdaptableApi;
function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(100);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  //gridOptions.getContextMenuItems = getContextMenuItems;

  //gridOptions.singleClickEdit = true;
  const adaptableOptions: AdaptableOptions = examplesHelper.createAdaptableOptionsTrade(
    gridOptions,
    'column menu demo'
  );
  adaptableOptions.predefinedConfig = demoConfig;
  adaptableOptions.userInterfaceOptions = {
    // showAdaptableColumnMenu: true,
    // showAdaptableColumnMenu: false,

    showAdaptableColumnMenu: (menuItem: AdaptableMenuItem, menuInfo: MenuInfo) => {
      if (
        menuInfo.Column.ColumnId === 'counterparty' &&
        (menuItem.FunctionName === 'ColumnChooser' || menuItem.FunctionName === 'PieChart')
      ) {
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
    ColumnMenuItems: [
      {
        Label: 'Mimise Dashboard',
        UserMenuItemClickedFunction: () => {
          adaptableApi.dashboardApi.Minimise();
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

/*
 // the function way
    /*
    ColumnMenuItems: (menuinfo: MenuInfo) => {
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
    */
