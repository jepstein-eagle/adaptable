import React, { useEffect } from 'react';

import Adaptable from '../../../../src/agGrid';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';

import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';

import { GridOptions } from '@ag-grid-community/all-modules';
import { AdaptableOptions, PredefinedConfig } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { TickingDataHelper } from '../../TickingDataHelper';

/*
Has pseudo ticking data together with some JSON that sets flashing in 3 columns
This uses the agGrid updateRowData method which does NOT call cell value changed
*/

async function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tickingDataHelper = new TickingDataHelper();
  const tradeCount: number = 25;
  const tradeData: any = examplesHelper.getTrades(tradeCount);

  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = examplesHelper.createAdaptableOptionsTrade(
    gridOptions,
    'ticking demo node help'
  );
  adaptableOptions.predefinedConfig = json;
  const adaptableApi = await Adaptable.init(adaptableOptions);

  // turn on mimicing ticking data
  tickingDataHelper.useTickingDataagGrid(adaptableOptions.vendorGrid, tradeData, 2000, tradeCount);
}

let json: PredefinedConfig = {
  FlashingCell: {
    FlashingCells: [
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
        FlashingCellDuration: 1000,
        UpColor: 'Blue',
        DownColor: 'Yellow',
      },
    ],
  },
  Alert: {
    AlertDefinitions: [
      {
        ColumnId: 'notional',
        MessageType: 'Info',
        Range: {
          Operator: 'AnyChange',
        },
        AlertProperties: {
          ShowPopup: false,
        },
      },
    ],
    AlertDisplayDiv: '',
    MaxAlertsInStore: 50,
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
