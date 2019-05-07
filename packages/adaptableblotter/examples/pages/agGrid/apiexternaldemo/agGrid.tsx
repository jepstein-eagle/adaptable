import React, { useEffect } from 'react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import AdaptableBlotter from '../../../../App_Scripts/agGrid'
import '../../../../App_Scripts/base.css'
import '../../../../App_Scripts/themes/light.css'
import { DataGenerator } from '../../../../Harness/DataGenerator'
import { GridOptions } from 'ag-grid-community';
import { IAdaptableBlotter } from '../../../../App_Scripts/types';

/*
Demo that shows how we can use the api 'externally' via textboxes and buttons
*/


var adaptableblotter: IAdaptableBlotter;

//  NOTE:  this is not currently being able to be called by index.tsx
function runQuickSearchViaAPI() {
  const element: any = document.getElementById('txtQuickSearchText');
  adaptableblotter.api.quickSearchApi.applyQuickSearch(element.value);
}

function clearQuickSearchViaAPI() {
  const element: any = document.getElementById('txtQuickSearchText');
  element.value = '';
  adaptableblotter.api.quickSearchApi.clearQuickSearch();
}


function InitAdaptableBlotter() {
  const dataGen = new DataGenerator();

  const gridOptions: GridOptions = dataGen.getGridOptionsTrade(500);

  // Create an Adaptable Blotter passing in the ag-Grid Options as the VendorGrid property
  const adaptableBlotterOptions = {
    vendorGrid: gridOptions,
    primaryKey: 'tradeId',
    userName: 'demo user',
    blotterId: 'api external demo',
    licenceKey: dataGen.getLicenceKey(),
  };
  adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);

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