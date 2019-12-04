import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';
import './index.css';

import { GridOptions } from 'ag-grid-community';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import { AdaptableBlotterOptions, PredefinedConfig } from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';

import ipushpull from 'ipushpull-js';

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 500;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableBlotterOptions: AdaptableBlotterOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    blotterId: 'iPushPull Demo',

    vendorGrid: gridOptions,
    predefinedConfig: demoConfig,
  };

  adaptableBlotterOptions.generalOptions = {
    showAdaptableBlotterToolPanel: true,
  };

  adaptableBlotterOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };

  console.log(process.env);
  // alert(process.env.IPUSHPULL_API_KEY);
  // alert(process.env.IPUSHPULL_API_KEY);
  new AdaptableBlotter(adaptableBlotterOptions);
}

ipushpull.config.set({
  api_url: 'https://www.ipushpull.com/api/1.0',
  ws_url: 'https://www.ipushpull.com',
  web_url: 'https://www.ipushpull.com',
  docs_url: 'https://docs.ipushpull.com',
  storage_prefix: 'ipp_local',
  api_key: process.env.IPUSHPULL_API_KEY as string,
  api_secret: process.env.IPUSHPULL_API_SECRET as string,
  transport: 'polling',
  hsts: false, // strict cors policy
});

let demoConfig: PredefinedConfig = {
  Partner: {
    iPushPull: {
      iPushPullConfig: ipushpull,
      // Username: process.env.IPUSHPULL_USERNAME as string,
      // Password: process.env.IPUSHPULL_PASSWORD as string,
    },
  },

  Dashboard: {
    VisibleToolbars: ['QuickSearch', 'Export', 'Layout'],
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
