import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import { GridOptions } from 'ag-grid-community';
import Adaptable from '../../../../src/agGrid';
import { AdaptableOptions, PredefinedConfig, AdaptableApi } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import ipushpull from 'ipushpull-js';

import { TickingDataHelper } from '../../TickingDataHelper';
import {
  LiveReportUpdatedEventArgs,
  LiveReportUpdatedInfo,
} from '../../../../src/Api/Events/LiveReportUpdated';

ipushpull.config.set({
  api_secret: '',
  api_key: '',
  api_url: 'https://www.ipushpull.com/api/1.0',
  ws_url: 'https://www.ipushpull.com',
  web_url: 'https://www.ipushpull.com',
  docs_url: 'https://docs.ipushpull.com',
  storage_prefix: 'ipp_local',
  transport: 'polling',
  hsts: false, // strict cors policy
});

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 25;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  const tickingDataHelper = new TickingDataHelper();
  const useTickingData: boolean = false;

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'iPushPull Demo',
    vendorGrid: gridOptions,
    predefinedConfig: demoConfig,
  };

  adaptableOptions.userInterfaceOptions = {
    showAdaptableToolPanel: true,
  };

  adaptableOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };

  const adaptableApi: AdaptableApi = Adaptable.init(adaptableOptions);

  console.log(process.env.IPUSHPULL_API_KEY, 'IPUSHPULL_API_KEY');

  if (useTickingData) {
    tickingDataHelper.useTickingDataagGrid(gridOptions, adaptableApi, 1000, tradeCount);
  }

  adaptableApi.eventApi.on(
    'LiveReportUpdated',
    (pushPullUpdatedEventArgs: LiveReportUpdatedEventArgs) => {
      let eventData: LiveReportUpdatedInfo = pushPullUpdatedEventArgs.data[0].id;
      console.log('got an event');
      console.log(eventData);
    }
  );
}

let demoConfig: PredefinedConfig = {
  IPushPull: {
    iPushPullInstance: ipushpull,
    Username: process.env.IPUSHPULL_USERNAME,
    Password: process.env.IPUSHPULL_PASSWORD,
    ThrottleTime: 5000,
    //   AutoLogin: true,
  },

  FlashingCell: {
    FlashingCells: [
      {
        IsLive: true,
        ColumnId: 'notional',
        FlashingCellDuration: 500,
        UpColor: '#008000',
        DownColor: '#FF0000',
      },
      {
        IsLive: true,
        ColumnId: 'ask',
        FlashingCellDuration: 500,
        UpColor: '#008000',
        DownColor: '#FF0000',
      },
      {
        IsLive: true,
        ColumnId: 'bid',
        FlashingCellDuration: 500,
        UpColor: '#008000',
        DownColor: '#FF0000',
      },
      {
        IsLive: true,
        ColumnId: 'price',
        FlashingCellDuration: 500,
        UpColor: 'Blue',
        DownColor: 'Yellow',
      },
    ],
  },

  Dashboard: {
    VisibleToolbars: ['QuickSearch', 'Export', 'Layout', 'Alert', 'IPushPull'],
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
