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

async function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 100;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Dashboard None Demo',
    userInterfaceOptions: {
      showAdaptableToolPanel: true,
    },
    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: {
      Dashboard: {
        CustomToolbars: [
          {
            Name: 'CustomToolbar',
            Title: 'Custom Toolbar',
          },
        ],
        ShowFunctionsDropdown: true,
        Tabs: [
          {
            Name: 'Search',
            Toolbars: ['QuickSearch', 'DataSource', 'Query', 'CustomToolbar'], //shouldnt see last one cos of entitlements
          },
          {
            Name: 'Edit',
            Toolbars: ['BulkUpdate', 'SmartEdit'],
          },
          {
            Name: 'Grid',
            Toolbars: ['Layout', 'CellSummary', 'SystemStatus'],
          },
        ],
      },

      Entitlements: {
        FunctionEntitlements: [
          {
            FunctionName: 'Dashboard',
            AccessLevel: 'Hidden',
          },
        ],
      },
    },
  };

  api = await Adaptable.init(adaptableOptions);
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
