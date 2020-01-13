import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import { GridOptions } from 'ag-grid-community';
import Adaptable from '../../../../src/agGrid';
import { AdaptableOptions, PredefinedConfig } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';

import glue42Desktop from '@glue42/desktop';
import glue42office from '@glue42/office';
import { TickingDataHelper } from '../../TickingDataHelper';

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 30;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  const tickingDataHelper = new TickingDataHelper();
  const useTickingData: boolean = true;

  const adaptableOptions: AdaptableOptions = examplesHelper.createAdaptableOptionsTrade(
    gridOptions,
    'glue42-demo'
  );

  adaptableOptions.predefinedConfig = demoConfig;
  adaptableOptions.auditOptions = {
    auditTickingDataUpdates: {
      auditToConsole: true,
    },
  };

  adaptableOptions.generalOptions = {
    showAdaptableToolPanel: true,
  };

  const adaptableApi = Adaptable.init(adaptableOptions);

  if (useTickingData) {
    tickingDataHelper.useTickingDataagGrid(gridOptions, adaptableApi, 1000, tradeCount);
  }
}

let demoConfig: PredefinedConfig = {
  Partner: {
    Glue42: {
      RunLiveData: true,
      Glue: glue42Desktop, // this is the glue object
      Glue4Office: glue42office, // this is the Glue4Office object
      Glue42Config: {
        initialization: {
          application: 'AdaptableBlotterDemo', // need to change?
          gateway: {
            protocolVersion: 3,
            ws: 'ws://localhost:8385',
          },
          auth: {
            username: 'jonny', // should get from .env file
            password: 'demopassword', // put in .env file
          },
        },
        excelExport: {
          timeoutMs: 30000,
        },
      },
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
};

export default () => {
  useEffect(() => {
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableDemo()();
  }, []);

  return null;
};
