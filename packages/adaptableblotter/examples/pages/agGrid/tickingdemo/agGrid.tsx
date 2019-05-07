import React, { useEffect } from 'react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import AdaptableBlotter from '../../../../App_Scripts/agGrid'
import '../../../../App_Scripts/base.css'
import '../../../../App_Scripts/themes/light.css'
import { DataGenerator } from '../../../../Harness/DataGenerator'
import { GridOptions } from 'ag-grid-community';
import { IAdaptableBlotterOptions } from '../../../../App_Scripts/types';


/*
Has pseudo ticking data together with some JSON that sets flashing
*/

function InitAdaptableBlotter() {
  const dataGen = new DataGenerator();

  const gridOptions: GridOptions = dataGen.getGridOptionsTrade(500);

  // turn on mimicing ticking data
  dataGen.startTickingDataagGrid(gridOptions);

  const adaptableBlotterOptions: IAdaptableBlotterOptions = dataGen.createAdaptableBlotterOptionsTrade(gridOptions, 'ticking demo');
  adaptableBlotterOptions.predefinedConfig = flashingJson;
  const adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);

  setTimeout(() => {
    if (adaptableblotter.adaptableBlotterStore.TheStore.getState().Layout.CurrentLayout === 'Ab_Default_Layout') {
      gridOptions.columnApi.autoSizeAllColumns();
    }
  });
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
        "UpColor": "#008000",
        "DownColor": "#FF0000"
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