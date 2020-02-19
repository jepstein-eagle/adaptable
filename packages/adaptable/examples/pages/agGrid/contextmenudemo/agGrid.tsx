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
  AdaptableMenuItem,
  MenuInfo,
} from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { ColumnSort } from '../../../../src/PredefinedConfig/Common/ColumnSort';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';
import Adaptable from '../../../../agGrid';
import { AdaptableReadyInfo } from '../../../../src/Api/Events/AdaptableReady';
import { UserMenuItem } from '../../../../src/PredefinedConfig/UserInterfaceState';

var adaptableApi: AdaptableApi;
function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(100);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  //gridOptions.getContextMenuItems = getContextMenuItems;

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Context Menu Demo',

    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: demoConfig,
  };
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
    ContextMenuItems: (menuinfo: MenuInfo) => {
      let menuItems: UserMenuItem[] = [];

      if (menuinfo.Column.Sortable) {
        let sortMenuItem = {
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
        };
        menuItems.push(sortMenuItem);
      }
      if (menuinfo.IsGroupedNode) {
        let groupMenuItem = {
          Label: 'Announce Grouping',

          UserMenuItemClickedFunction: () => {
            alert('this is a grouped row');
          },
        };
        menuItems.push(groupMenuItem);
      }
      return menuItems;
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
