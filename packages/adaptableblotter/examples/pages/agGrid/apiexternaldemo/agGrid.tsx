import React, { useEffect } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Adaptable from '../../../../App_Scripts/agGrid';
import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';
import './index.css';
import { GridOptions } from 'ag-grid-community';
import {
  IAdaptable,
  AdaptableOptions,
  PredefinedConfig,
  AdaptableApi,
} from '../../../../App_Scripts/types';

import { ExamplesHelper } from '../../ExamplesHelper';
/*
Demo that shows how we can use the api 'externally' via textboxes and buttons
*/

var adaptableApi: AdaptableApi;

//  NOTE:  this is not currently being able to be called by index.tsx
export function runQuickSearchViaAPI() {
  const element: any = document.getElementById('txtQuickSearchText');
  adaptableApi.quickSearchApi.applyQuickSearch(element.value);
}

export function clearQuickSearchViaAPI() {
  const element: any = document.getElementById('txtQuickSearchText');
  element.value = '';
  adaptableApi.quickSearchApi.clearQuickSearch();
}

export function setDarkTheme() {
  adaptableApi.themeApi.loadDarkTheme();
}
export function setLightTheme() {
  adaptableApi.themeApi.loadLightTheme();
}
export function setCustomTheme() {
  adaptableApi.themeApi.loadTheme('custom-theme');
}

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(500);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  const adaptableOptions: AdaptableOptions = examplesHelper.createAdaptableOptionsTrade(
    gridOptions,
    'api external demo'
  );
  adaptableOptions.predefinedConfig = demoConfig;
  adaptableApi = Adaptable.init(adaptableOptions);
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Theme'],
  },
  Theme: {
    UserThemes: [
      {
        Name: 'custom-theme',
        Description: 'A Custom theme',
      },
    ],
    CurrentTheme: 'light',
  },
};

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
      <button onClick={() => setDarkTheme()}>Set Dark Theme</button>
      <button onClick={() => setLightTheme()}>Set Light Theme</button>
      <button onClick={() => setCustomTheme()}>Set Custom Theme</button>
    </div>
  );
};
