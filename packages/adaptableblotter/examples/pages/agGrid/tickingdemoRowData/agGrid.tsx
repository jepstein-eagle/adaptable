import React, { useEffect } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import '../../../../App_Scripts/index.scss';

import { GridOptions } from 'ag-grid-community';
import {
  AdaptableBlotterOptions,
  PredefinedConfig,
  IAdaptableBlotter,
} from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { TickingDataHelper } from '../../TickingDataHelper';

/*
Has pseudo ticking data together with some JSON that sets flashing in 3 columns
This uses the agGrid updateRowData method which does NOT call cell value changed
*/

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tickingDataHelper = new TickingDataHelper();
  const tradeCount: number = 30;
  const tradeData: any = examplesHelper.getTrades(tradeCount);

  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  const adaptableBlotterOptions: AdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsTrade(
    gridOptions,
    'ticking data row demo '
  );
  adaptableBlotterOptions.predefinedConfig = flashingJson;
  const adaptableblotter: IAdaptableBlotter = new AdaptableBlotter(adaptableBlotterOptions);

  // turn on mimicing ticking data
  tickingDataHelper.testTickingDataagGrid(adaptableblotter, tradeData, 5000, tradeCount);
}

let flashingJson: PredefinedConfig = {
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
