import React, { useEffect } from 'react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import AdaptableBlotter from '../../../../App_Scripts/agGrid'
import '../../../../App_Scripts/base.css'
import '../../../../App_Scripts/themes/light.css'
import { GridOptions } from 'ag-grid-community';
import { IAdaptableBlotterOptions } from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';


/*
Has pseudo ticking data together with some JSON that sets flashing in 3 columns
*/

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();

  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(500);

  // turn on mimicing ticking data
  examplesHelper.startTickingDataagGrid(gridOptions);

  const adaptableBlotterOptions: IAdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsTrade(gridOptions, 'ticking demo');
  adaptableBlotterOptions.predefinedConfig = flashingJson;
  const adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);
  examplesHelper.autoSizeDefaultLayoutColumns(adaptableblotter, gridOptions);
}

let flashingJson = {
  FlashingCell: {
    FlashingCells: [
      {
        "IsLive": true,
        "ColumnId": "ask",
        "FlashingCellDuration": 500,
        "UpColor": "#008000",
        "DownColor": "#FF0000"
      },
      {
        "IsLive": true,
        "ColumnId": "bid",
        "FlashingCellDuration": 500,
        "UpColor": "#008000",
        "DownColor": "#FF0000"
      },
      {
        "IsLive": true,
        "ColumnId": "price",
        "FlashingCellDuration": 500,
        "UpColor": "Blue",
        "DownColor": "Yellow"
      },
    ]
  }
};

export default () => {
  useEffect(() => {


    if (!process.browser) {
      return
    }


    InitAdaptableBlotter()
  }, [])

  return null
}