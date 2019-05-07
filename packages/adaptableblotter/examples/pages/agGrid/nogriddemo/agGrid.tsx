import React, { useEffect } from 'react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import AdaptableBlotter from '../../../../App_Scripts/agGrid'
import '../../../../App_Scripts/base.css'
import '../../../../App_Scripts/themes/light.css'
import { DataGenerator } from '../../../../Harness/DataGenerator'
import { GridOptions } from 'ag-grid-community';

/*
Similar to the Basic demo that just tests that we can create an agGrid and an Adaptable Blotter working together
No JSON or anything complicated
Note: we DON'T create the grid ourselves - and instead its done in the Blotter code
*/

function InitAdaptableBlotter() {
  const dataGen = new DataGenerator();

  const gridOptions: GridOptions = dataGen.getGridOptionsTrade(500);

  // Create an Adaptable Blotter passing in the ag-Grid Options as the VendorGrid property
  const adaptableBlotterOptions = {
    vendorGrid: gridOptions, 
    primaryKey: 'tradeId', 
    userName: 'demo user',
    blotterId: 'no grid demo', 
    licenceKey: dataGen.getLicenceKey(),
  };
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