import { useEffect } from 'react'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


import AdaptableBlotter from '../../../../App_Scripts/agGrid'

import '../../../../App_Scripts/base.css'
import '../../../../App_Scripts/themes/light.css'

import { DataGenerator } from '../../../../Harness/DataGenerator'
import { IAdaptableBlotter, IAdaptableBlotterOptions } from '../../../../App_Scripts/types';
import { GridOptions } from 'ag-grid-community';


function InitAdaptableBlotter() {
  const dataGen = new DataGenerator();
  const gridOptions: GridOptions = dataGen.getGridOptionsFTSE(50);
  const adaptableBlotterOptions: IAdaptableBlotterOptions = dataGen.createAdaptableBlotterOptionsFtse(gridOptions, 'ftse demo');
  const adaptableblotter: IAdaptableBlotter = new AdaptableBlotter(adaptableBlotterOptions);

  setTimeout(() => {
    if (adaptableblotter.adaptableBlotterStore.TheStore.getState().Layout.CurrentLayout === 'Ab_Default_Layout') {
      gridOptions.columnApi.autoSizeAllColumns();
    }
  });
}

export default () => {
  useEffect(() => {


    if (!process.browser) {
      return
    }


    InitAdaptableBlotter()
  }, [])

  return null
}