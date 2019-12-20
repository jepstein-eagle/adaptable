import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';
import './index.css';

import { GridOptions } from 'ag-grid-community';
import {
  AdaptableBlotterOptions,
  PredefinedConfig,
  BlotterApi,
} from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import AdaptableBlotter from '../../../../agGrid';
import { TickingDataHelper } from '../../TickingDataHelper';

var api: BlotterApi;

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 500;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  const tickingDataHelper = new TickingDataHelper();
  const useTickingData: boolean = false;

  const adaptableBlotterOptions: AdaptableBlotterOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    blotterId: 'Chart Demo',

    vendorGrid: gridOptions,
    predefinedConfig: demoConfig,
  };

  adaptableBlotterOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };

  api = AdaptableBlotter.init(adaptableBlotterOptions);
  if (useTickingData) {
    tickingDataHelper.testTickingDataagGrid(gridOptions, api, 200, tradeCount);
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
    if (!process.browser) {
      return;
    }

    InitAdaptableBlotter();
  }, []);

  return null;
};
