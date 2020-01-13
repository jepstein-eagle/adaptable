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
import { TickingDataHelper } from '../../TickingDataHelper';

var api: AdaptableApi;

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 500;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  const tickingDataHelper = new TickingDataHelper();
  const useTickingData: boolean = false;

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Chart Demo',
    vendorGrid: gridOptions,
    predefinedConfig: demoConfig,
  };

  adaptableOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };

  api = Adaptable.init(adaptableOptions);
  if (useTickingData) {
    tickingDataHelper.useTickingDataagGrid(gridOptions, api, 200, tradeCount);
  }
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Export', 'Layout', 'Chart'],
  },
  ToolPanel: {
    VisibleToolPanels: ['Export', 'Layout', 'Chart'],
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
