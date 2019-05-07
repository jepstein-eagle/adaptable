import React, { useEffect } from 'react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import AdaptableBlotter from '../../../../App_Scripts/agGrid'
import '../../../../App_Scripts/base.css'
import '../../../../App_Scripts/themes/light.css'
import { DataGenerator } from '../../../../Harness/DataGenerator'
import { GridOptions, Grid } from 'ag-grid-community';
import { IAdaptableBlotterOptions } from '../../../../App_Scripts/types';

/*
Similar to the Basic demo that just tests that we can create an agGrid and an Adaptable Blotter working together
No JSON or anything complicated
Note: we DO create the grid ourselves - and instead its done in the Blotter code
*/

function InitAdaptableBlotter() {
  const dataGen = new DataGenerator();

  const gridOptions: GridOptions = dataGen.getGridOptionsTrade(500);

  // creating ag-Grid ourselves
  const gridcontainer: HTMLElement = document.getElementById('grid') as HTMLElement;
  gridcontainer.innerHTML = '';
  const grid = new Grid(gridcontainer, gridOptions);

  const adaptableBlotterOptions: IAdaptableBlotterOptions = dataGen.createAdaptableBlotterOptionsTrade(gridOptions, 'instantiate demo');
  const adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);

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