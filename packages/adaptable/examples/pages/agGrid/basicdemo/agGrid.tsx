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
  AdaptableApi,
  AdaptableReadyInfo,
  SearchChangedEventArgs,
} from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';
import Adaptable from '../../../../agGrid';
import { TickingDataHelper } from '../../TickingDataHelper';
import { Layout } from '../../../../src/PredefinedConfig/LayoutState';
var api: AdaptableApi;

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tickingDataHelper = new TickingDataHelper();
  const tradeCount: number = 100;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Basic Demo New',
    userInterfaceOptions: {
      showAdaptableToolPanel: true,
    },
    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: {
      Dashboard: {
        Tabs: [
          {
            Name: 'General',
            Toolbars: ['SmartEdit', 'CellSummary', 'Layout'],
          },
        ],
        VisibleButtons: ['CellSummary', 'ColumnChooser'],
        ShowFunctionsDropdown: true,
        //  HomeToolbarTitle: 'Hello world',
        ShowQuickSearchInHeader: true,
        IsInline: true, // making it false in Redux so we dont forget but true here for testing purposes
      },
      SystemStatus: {
        Revision: 13,
        DefaultStatusMessage: 'System Running Fine',
        DefaultStatusType: 'Error',
      },
      AdvancedSearch: {
        Revision: 4,
        AdvancedSearches: [],
      },
      QuickSearch: {
        Revision: 11,
        QuickSearchText: 'b',
      },
      Entitlements: {
        Revision: 3,
        DefaultAccessLevel: 'Full',
        FunctionEntitlements: [
          {
            FunctionName: 'Layout',
            AccessLevel: 'Full',
          },
          {
            FunctionName: 'Dashboard',
            AccessLevel: 'Full',
          },
        ],
      },
    },
  };

  api = Adaptable.init(adaptableOptions);

  // tickingDataHelper.useTickingDataagGrid(adaptableOptions.vendorGrid, api, 200, tradeCount);

  api.eventApi.on('AdaptableReady', (info: AdaptableReadyInfo) => {
    let newLayout: Layout = {
      Name: 'test',
      Columns: ['bid', 'currency', 'counterparty'],
      GroupedColumns: ['country'],
    };
    info.adaptableApi.layoutApi.createAndSetLayout(newLayout);
    // info.adaptableApi.layoutApi.setLayout(newLayout.Name);

    /*
    setTimeout(() => {
      api.dashboardApi.floatDashboard();
    }, 2000);
    setTimeout(() => {
      api.dashboardApi.unFloatDashboard();
    }, 4000);
    setTimeout(() => {
      api.dashboardApi.collapseDashboard();
    }, 6000);
    setTimeout(() => {
      api.dashboardApi.unCollapseDashboard();
    }, 8000); */
    //  info.adaptableApi.flashingCellApi.showFlashingCellPopup();
  });

  api.eventApi.on('SearchChanged', (searchChangedArgs: SearchChangedEventArgs) => {
    //  console.log('search changed');
    //  console.log(searchChangedArgs.data[0].id);
  });
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
