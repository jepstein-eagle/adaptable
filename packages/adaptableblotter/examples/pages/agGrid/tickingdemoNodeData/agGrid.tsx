import React, { useEffect } from 'react';

import AdaptableBlotter from '../../../../App_Scripts/agGrid';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';

import { GridOptions } from 'ag-grid-community';
import { AdaptableBlotterOptions, PredefinedConfig } from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { TickingDataHelper } from '../../TickingDataHelper';

/*
Has pseudo ticking data together with some JSON that sets flashing in 3 columns
This uses the agGrid updateRowData method which does NOT call cell value changed
*/

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tickingDataHelper = new TickingDataHelper();
  const tradeData: any = examplesHelper.getTrades(25);

  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableBlotterOptions: AdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsTrade(
    gridOptions,
    'ticking demo node help'
  );
  adaptableBlotterOptions.predefinedConfig = json;
  const adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);
  examplesHelper.autoSizeDefaultLayoutColumns(adaptableblotter, gridOptions);

  // turn on mimicing ticking data
  tickingDataHelper.startTickingDataagGridRowNodeSetData(gridOptions, tradeData);
}

let json: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Alert'],
  },
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
        Expression: undefined,
        MessageType: 'Info',
        Range: {
          Operand1: '',
          Operand1Type: 'Value',
          Operand2: '',
          Operand2Type: 'Value',
          Operator: 'AnyChange',
        },
        ShowAsPopup: false,
      },
    ],
    AlertPopupDiv: '',
    MaxAlertsInStore: 50,
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
