import React, { useEffect } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-blue.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import Adaptable from '../../../../App_Scripts/agGrid';
import '../../../../App_Scripts/index.scss';
//import '../../../../App_Scripts/themes/light.scss';
import '../../../../App_Scripts/themes/dark.scss';
import { GridOptions } from 'ag-grid-community';
import { AdaptableOptions, PredefinedConfig } from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';

/*
Demo that hopefully will demonstrate how to create a dark themed blotter
Needs other things to work but it should be possible to stipulate a Current Theme and then that will make it all work?
*/

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(10);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  const adaptableOptions: AdaptableOptions = examplesHelper.createAdaptableOptionsTrade(
    gridOptions,
    'theme demo'
  );
  adaptableOptions.predefinedConfig = demoConfig;
  const adaptableApi = Adaptable.init(adaptableOptions);
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Theme', 'Export', 'Layout', 'CellSummary'],
  },
  Theme: {
    CurrentTheme: 'dark',
    UserThemes: [
      {
        Name: 'BlueTheme',
        Description: 'Blue theme',
        VendorGridClassName: 'ag-theme-blue',
      },
    ],
  },
};

export default () => {
  useEffect(() => {
    if (!process.browser) {
      return;
    }

    InitAdaptableBlotter();
  }, []);

  return null;
};
