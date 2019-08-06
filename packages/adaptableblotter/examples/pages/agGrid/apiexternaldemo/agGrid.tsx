import React, { useEffect } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import '../../../../App_Scripts/index.scss';

import { GridOptions } from 'ag-grid-community';
import { IAdaptableBlotter, AdaptableBlotterOptions } from '../../../../App_Scripts/types';

import { ExamplesHelper } from '../../ExamplesHelper';
/*
Demo that shows how we can use the api 'externally' via textboxes and buttons
*/

var adaptableblotter: IAdaptableBlotter;

//  NOTE:  this is not currently being able to be called by index.tsx
export function runQuickSearchViaAPI() {
  const element: any = document.getElementById('txtQuickSearchText');
  adaptableblotter.api.quickSearchApi.applyQuickSearch(element.value);
  // adaptableblotter.api.themeApi.setLightTheme();
}

export function clearQuickSearchViaAPI() {
  const element: any = document.getElementById('txtQuickSearchText');
  element.value = '';
  adaptableblotter.api.quickSearchApi.clearQuickSearch();
  // adaptableblotter.api.themeApi.setDarkTheme();
}

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(500);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  const adaptableBlotterOptions: AdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsTrade(
    gridOptions,
    'api external demo'
  );
  adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);
  examplesHelper.autoSizeDefaultLayoutColumns(adaptableblotter, gridOptions);
}

export default () => {
  useEffect(() => {
    if (!process.browser) {
      return;
    }

    InitAdaptableBlotter();
  }, []);

  return (
    <div>
      <br />
      &nbsp;
      <label>Quick Search (from client application via Adaptable Blotter API): </label>
      &nbsp;
      <input type="text" id="txtQuickSearchText" />
      <button
        style={{ marginLeft: '5px', marginRight: '5px' }}
        onClick={() => runQuickSearchViaAPI()}
      >
        Run
      </button>
      <button onClick={() => clearQuickSearchViaAPI()}>Clear</button>
    </div>
  );
};
