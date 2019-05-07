import React, { useEffect } from 'react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Grid } from 'ag-grid-community/dist/lib/grid'
import AdaptableBlotter from '../../../../App_Scripts/agGrid'
import '../../../../App_Scripts/base.css'
import '../../../../App_Scripts/themes/light.css'
import { DataGenerator } from '../../../../Harness/DataGenerator'
import { GridOptions } from 'ag-grid-community';

/*
Basic demo that just tests that we can create an agGrid and an Adaptable Blotter working together
No JSON or anything complicated
Note: we DO create the grid ourselves
*/

function InitAdaptableBlotter() {
  const dataGen = new DataGenerator();

  const gridOptions: GridOptions = {
    columnDefs: dataGen.getTradeSchema(),
    rowData: dataGen.getTrades(300),
    enableRangeSelection: true,
    floatingFilter: true,
    suppressColumnVirtualisation: false,
    suppressMenuHide: true,
    sideBar: undefined,
    columnTypes: {
      abColDefNumber: {},
      abColDefString: {},
      abColDefBoolean: {},
      abColDefDate: {},
      abColDefObject: {},
    },
  };

  const gridcontainer: HTMLElement = document.getElementById('grid') as HTMLElement;
  gridcontainer.innerHTML = '';
  // creating ag-Grid ourselves
  const grid = new Grid(gridcontainer, gridOptions);

  // Create an Adaptable Blotter passing in the ag-Grid Options as the VendorGrid property
  const adaptableBlotterOptions = {
    vendorGrid: gridOptions,
    primaryKey: 'tradeId', 
    userName: 'demo user', 
    blotterId: 'basic demo',
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