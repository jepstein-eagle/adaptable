import React, { useEffect } from 'react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import AdaptableBlotter from '../../../../App_Scripts/agGrid'
import '../../../../App_Scripts/base.css'
import '../../../../App_Scripts/themes/light.css'
import { DataGenerator } from '../../../../Harness/DataGenerator'
import { GridOptions } from 'ag-grid-community';
import { IAdaptableBlotter, IAdaptableBlotterOptions } from '../../../../App_Scripts/types';

import { Button } from 'react-bootstrap'
/*
Demo that shows how we can use the api 'externally' via textboxes and buttons
*/


var adaptableblotter: IAdaptableBlotter;

//  NOTE:  this is not currently being able to be called by index.tsx
export function runQuickSearchViaAPI() {
  const element: any = document.getElementById('txtQuickSearchText');
  adaptableblotter.api.quickSearchApi.applyQuickSearch(element.value);
}

export function clearQuickSearchViaAPI() {
  const element: any = document.getElementById('txtQuickSearchText');
  element.value = '';
  adaptableblotter.api.quickSearchApi.clearQuickSearch();
}


function InitAdaptableBlotter() {
  const dataGen = new DataGenerator();
  const gridOptions: GridOptions = dataGen.getGridOptionsTrade(500);
  const adaptableBlotterOptions: IAdaptableBlotterOptions = dataGen.createAdaptableBlotterOptionsTrade(gridOptions, 'api external demo');
  adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);

  setTimeout(() => {
    if (adaptableblotter.adaptableBlotterStore.TheStore.getState().Layout.CurrentLayout === 'Ab_Default_Layout') {
      gridOptions.columnApi!.autoSizeAllColumns();
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

  return <div >
    <br />
    &nbsp;
     <label>Quick Search (from client application via Adaptable Blotter API): </label>
    &nbsp;
    <input type="text" id="txtQuickSearchText" />
    <Button bsSize={'xs'} style={{ marginLeft: '5px', marginRight: '5px' }} onClick={() => runQuickSearchViaAPI()}>Run</Button>
    <Button bsSize={'xs'} onClick={() => clearQuickSearchViaAPI()}>Clear</Button>
  </div>

}