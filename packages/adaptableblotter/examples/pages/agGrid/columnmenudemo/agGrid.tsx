import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';

import { GridOptions } from 'ag-grid-community';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import {
  AdaptableBlotterOptions,
  PredefinedConfig,
  BlotterApi,
} from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import {
  AdaptableBlotterMenuItem,
  ContextMenuInfo,
} from '../../../../App_Scripts/PredefinedConfig/Common/Menu';

var blotterApi: BlotterApi;
function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(100);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  //gridOptions.getContextMenuItems = getContextMenuItems;

  //gridOptions.singleClickEdit = true;
  const adaptableBlotterOptions: AdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsTrade(
    gridOptions,
    'column menu demo'
  );
  adaptableBlotterOptions.predefinedConfig = demoConfig;
  adaptableBlotterOptions.generalOptions = {
    showAdaptableBlotterToolPanel: true,
  };

  blotterApi = AdaptableBlotter.init(adaptableBlotterOptions);
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
        Label: 'Column Menu 1',
        UserMenuItemClickedFunction: (contextMenuInfo: ContextMenuInfo) => {
          console.log(contextMenuInfo.column.FriendlyName);
        },
        Icon:
          '<img border="0" width="15" height="10" src="https://flags.fmcdn.net/data/flags/mini/gb.png"/>',
      },
      {
        Label: 'Column Menu 2',
      },
      {
        Label: 'Column Menu 3',
        SubMenuItems: [
          {
            Label: 'Column Sub Menu 1',
          },
          {
            Label: 'Column Sub Menu 2',
          },
        ],
      },
    ],

    ContextMenuItems: [
      {
        Label: 'Mimise Dashboard',
        UserMenuItemClickedFunction: () => {
          blotterApi.dashboardApi.Minimise();
        },
      },
      {
        Label: 'Set System Status',
        SubMenuItems: [
          {
            Label: 'Set Error',
            UserMenuItemClickedFunction: () => {
              blotterApi.systemStatusApi.setErrorSystemStatus('System Down');
            },
          },
          {
            Label: 'Set Warning',
            UserMenuItemClickedFunction: () => {
              blotterApi.systemStatusApi.setWarningSystemStatus('System Slow');
            },
          },
          {
            Label: 'Set Success',
            UserMenuItemClickedFunction: () => {
              blotterApi.systemStatusApi.setSuccessSystemStatus('System Fine');
            },
          },
          {
            Label: 'Set Info',
            UserMenuItemClickedFunction: () => {
              blotterApi.systemStatusApi.setInfoSystemStatus('Demos working fine');
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
