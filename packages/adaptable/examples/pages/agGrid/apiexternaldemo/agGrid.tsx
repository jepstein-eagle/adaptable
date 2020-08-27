import React, { useEffect } from 'react';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import Adaptable from '../../../../src/agGrid';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';
import { GridOptions } from '@ag-grid-community/all-modules';
import {
  IAdaptable,
  AdaptableOptions,
  PredefinedConfig,
  AdaptableApi,
} from '../../../../src/types';

import { ExamplesHelper } from '../../ExamplesHelper';
/*
Demo that shows how we can use the api 'externally' via textboxes and buttons
*/

var adaptableApi: AdaptableApi;

//  NOTE:  this is not currently being able to be called by index.tsx
export function runQuickSearchViaApi() {
  const element: any = document.getElementById('txtQuickSearchText');
  adaptableApi.quickSearchApi.applyQuickSearch(element.value);
}

export function clearQuickSearchViaApi() {
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

async function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(500);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  const adaptableOptions: AdaptableOptions = examplesHelper.createAdaptableOptionsTrade(
    gridOptions,
    'api external demo'
  );
  adaptableOptions.predefinedConfig = demoConfig;
  adaptableApi = await Adaptable.init(adaptableOptions);
}

let demoConfig: PredefinedConfig = {
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
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableDemo();
  }, []);

  return (
    <div>
      <br />
      &nbsp;
      <label>Quick Search (from client application via Adaptable Api): </label>
      &nbsp;
      <input type="text" id="txtQuickSearchText" />
      <button
        style={{ marginLeft: '5px', marginRight: '5px' }}
        onClick={() => runQuickSearchViaApi()}
      >
        Run
      </button>
      <button onClick={() => clearQuickSearchViaApi()}>Clear</button>
      <button onClick={() => setDarkTheme()}>Set Dark Theme</button>
      <button onClick={() => setLightTheme()}>Set Light Theme</button>
      <button onClick={() => setCustomTheme()}>Set Custom Theme</button>
    </div>
  );
};
