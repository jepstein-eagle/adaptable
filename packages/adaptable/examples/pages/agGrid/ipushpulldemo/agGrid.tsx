import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import { GridOptions } from '@ag-grid-community/all-modules';
import Adaptable from '../../../../src/agGrid';
import { AdaptableOptions, PredefinedConfig, AdaptableApi } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';

import { MenuModule } from '@ag-grid-enterprise/menu';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { TickingDataHelper } from '../../TickingDataHelper';
import {
  LiveDataChangedEventArgs,
  LiveDataChangedInfo,
} from '../../../../src/Api/Events/LiveDataChanged';
import { IPushPullReport } from '../../../../src/PredefinedConfig/IPushPullState';
import ipp from '../../../../../plugins/ipushpull/src';

import { IIPPConfig } from 'ipushpull-js/dist/Config';

const pushpullConfig: IIPPConfig = {
  api_url: 'https://www.ipushpull.com/api/1.0',
  ws_url: 'https://www.ipushpull.com',
  web_url: 'https://www.ipushpull.com',
  docs_url: 'https://docs.ipushpull.com',
  storage_prefix: 'ipp_local',
  api_key: '',
  api_secret: '',
  transport: 'polling',
  hsts: false, // strict cors policy
};

async function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 30;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  const tickingDataHelper = new TickingDataHelper();
  const useTickingData: boolean = true;

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'ipushpull Demo',
    plugins: [
      ipp({
        username: 'jonny.wolfson@adaptabletools.com',
        password: 'traders',
        ippConfig: pushpullConfig,
      }),
    ],
    vendorGrid: {
      ...gridOptions,
      modules: [MenuModule, RangeSelectionModule],
    },
    predefinedConfig: demoConfig,
  };

  const adaptableApi: AdaptableApi = await Adaptable.init(adaptableOptions);

  const ippApi = adaptableApi.pluginsApi.getPluginApi('ipushpull');

  // ippApi.
  console.log(ippApi);

  console.log(process.env.IPUSHPULL_API_KEY, 'IPUSHPULL_API_KEY');

  adaptableApi.eventApi.on('AdaptableReady', ({ vendorGrid: gridOptions }) => {
    if (useTickingData) {
      tickingDataHelper.useTickingDataagGrid(
        adaptableOptions.vendorGrid,
        adaptableApi,
        1000,
        tradeCount
      );
    }
  });

  adaptableApi.eventApi.on('LiveDataChanged', (eventArgs: LiveDataChangedEventArgs) => {
    let eventData: LiveDataChangedInfo = eventArgs.data[0].id;
    if (eventData.ReportDestination == 'ipushpull') {
      if (eventData.LiveDataTrigger === 'LiveDataStarted') {
        const iPushPullReport: IPushPullReport = eventData.LiveReport;
        // do somthing wih the report...
      }
    }
  });
}

let demoConfig: PredefinedConfig = {
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
