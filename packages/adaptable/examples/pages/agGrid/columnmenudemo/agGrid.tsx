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
import { AdaptableMenuItem, MenuInfo } from '../../../../App_Scripts/PredefinedConfig/Common/Menu';
import { CustomSort } from '../../../../App_Scripts/PredefinedConfig/CustomSortState';
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
    'column menu demo'
  );
  adaptableOptions.predefinedConfig = demoConfig;
  adaptableOptions.userInterfaceOptions = {
    // showAdaptableColumnMenu: true,
    // showAdaptableColumnMenu: false,

    showAdaptableColumnMenu: (menuItem: AdaptableMenuItem, menuInfo: MenuInfo) => {
      if (
        menuInfo.column.ColumnId === 'counterparty' &&
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
    ColumnMenuItems: (menuinfo: MenuInfo) => {
      return menuinfo.column.Sortable
        ? [
            {
              Label: 'Sort Column',
              Icon:
                '<img width="15" height="15" src="https://img.icons8.com/ios-glyphs/30/000000/sort.png">',
              UserMenuItemClickedFunction: () => {
                let customSort: ColumnSort = {
                  Column: menuinfo.column.ColumnId,
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
