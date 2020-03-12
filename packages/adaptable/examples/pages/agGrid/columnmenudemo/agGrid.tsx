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
  MenuInfo,
  AdaptableMenuItem,
} from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';
import Adaptable from '../../../../agGrid';

var adaptableApi: AdaptableApi;

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 100;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Column Menu Demo',

    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: demoConfig,
    userFunctions: [
      {
        type: 'ColumnMenuItemClickedFunction',
        name: 'minimizeDashboard',
        handler() {
          adaptableApi.dashboardApi.minimise();
        },
      },
      {
        type: 'ColumnMenuItemClickedFunction',
        name: 'setError',
        handler() {
          adaptableApi.systemStatusApi.setErrorSystemStatus('System Down');
        },
      },
      {
        type: 'ColumnMenuItemClickedFunction',
        name: 'setWarning',
        handler() {
          adaptableApi.systemStatusApi.setWarningSystemStatus('System Slow');
        },
      },
      {
        type: 'ColumnMenuItemClickedFunction',
        name: 'setSuccess',
        handler() {
          adaptableApi.systemStatusApi.setSuccessSystemStatus('System Fine');
        },
      },
      {
        type: 'ColumnMenuItemClickedFunction',
        name: 'setInfo',
        handler() {
          adaptableApi.systemStatusApi.setInfoSystemStatus('Demos working fine');
        },
      },
      {
        type: 'ColumnMenuItemShowPredicate',
        name: 'isSortable',
        handler(menuInfo) {
          return menuInfo.Column.Sortable;
        },
      },
    ],
  };
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
    ColumnMenuItems: [
      {
        Label: 'Mimise Dashboard',
        UserMenuItemClickedFunction: 'minimizeDashboard',
      },
      {
        Label: 'Set System Status',
        SubMenuItems: [
          {
            Label: 'Set Error',
            UserMenuItemShowPredicate: 'isSortable',
            UserMenuItemClickedFunction: 'setError',
          },
          {
            Label: 'Set Warning',
            UserMenuItemShowPredicate: 'isSortable',
            UserMenuItemClickedFunction: 'setWarning',
          },
          {
            Label: 'Set Success',
            UserMenuItemShowPredicate: 'isSortable',
            UserMenuItemClickedFunction: 'setSuccess',
          },
          {
            Label: 'Set Info',
            UserMenuItemShowPredicate: 'isSortable',
            UserMenuItemClickedFunction: 'setInfo',
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
