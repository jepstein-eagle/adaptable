import { useEffect } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';

import { GridOptions } from 'ag-grid-community';
import Adaptable from '../../../../App_Scripts/agGrid';
import { AdaptableOptions, PredefinedConfig, AdaptableApi } from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AdaptableMenuItem } from '../../../../App_Scripts/PredefinedConfig/Common/Menu';

var adaptableApi: AdaptableApi;
function InitAdaptableBlotter() {
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
    ContextMenuItems: [
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
    if (!process.browser) {
      return;
    }

    InitAdaptableBlotter();
  }, []);

  return null;
};
