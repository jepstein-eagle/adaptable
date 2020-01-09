import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import { GridOptions } from '@ag-grid-community/all-modules';
import { AdaptableOptions, PredefinedConfig, AdaptableApi } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import Adaptable from '../../../../agGrid';

var api: AdaptableApi;

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 5000;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Tool Panel Demo',

    vendorGrid: gridOptions,
    predefinedConfig: demoConfig,
  };

  adaptableOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };

  adaptableOptions.userInterfaceOptions = {
    showAdaptableToolPanel: true,
    adaptableToolPanelTitle: 'hello world',
  };

  api = Adaptable.init(adaptableOptions);
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Layout', 'AdvancedSearch'],
    HomeToolbarTitle: 'working',
    MinimisedHomeToolbarButtonStyle: {
      Variant: 'text',
      Tone: 'success',
    }, //
  },
  Entitlements: {
    FunctionEntitlements: [
      {
        FunctionName: 'AdvancedSearch',
        AccessLevel: 'Hidden',
      },
    ],
  },
  SystemStatus: {
    StatusMessage: 'Hello',
    StatusType: 'Info',
  },
  ToolPanel: {
    //   VisibleToolPanels: ['Export', 'Layout', 'ColumnFilter'],
    //ToolPanelTitle: 'Hello',
    ShowGridInfoButton: false,
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
