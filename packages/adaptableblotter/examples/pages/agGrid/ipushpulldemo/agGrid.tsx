import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';
import './index.css';

import { GridOptions } from 'ag-grid-community';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import {
  AdaptableBlotterOptions,
  PredefinedConfig,
  BlotterApi,
} from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import ipushpull from 'ipushpull-js';
import { IPageService } from 'ipushpull-js/dist/Page/Page';

import { TickingDataHelper } from '../../TickingDataHelper';
import {
  LiveReportUpdatedEventArgs,
  LiveReportUpdatedInfo,
} from '../../../../App_Scripts/Api/Events/LiveReportUpdated';

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

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 25;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  const tickingDataHelper = new TickingDataHelper();
  const useTickingData: boolean = true;

  const adaptableBlotterOptions: AdaptableBlotterOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    blotterId: 'iPushPull Demo',

    vendorGrid: gridOptions,
    predefinedConfig: demoConfig,
  };

  adaptableBlotterOptions.generalOptions = {
    showAdaptableToolPanel: true,
  };

  adaptableBlotterOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };

  const blotterAPI: BlotterApi = AdaptableBlotter.init(adaptableBlotterOptions);

  if (useTickingData) {
    tickingDataHelper.useTickingDataagGrid(gridOptions, blotterAPI, 1000, tradeCount);
  }

  blotterAPI.eventApi.on(
    'LiveReportUpdated',
    (pushPullUpdatedEventArgs: LiveReportUpdatedEventArgs) => {
      let eventData: LiveReportUpdatedInfo = pushPullUpdatedEventArgs.data[0].id;
      if (eventData.ExportDestination == 'iPushPull') {
        // do something...
      }
    }
  );
}

let demoConfig: PredefinedConfig = {
  Partner: {
    iPushPull: {
      iPushPullInstance: ipushpull,
      Username: process.env.IPUSHPULL_USERNAME,
      Password: process.env.IPUSHPULL_PASSWORD,
      ThrottleTime: 5000,
    },
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
    VisibleToolbars: ['QuickSearch', 'Export', 'Layout', 'Alert'],
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
