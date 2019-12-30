import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import 'ag-grid-community/dist/styles/ag-theme-blue.css';

import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';

import './index.css';

import { GridOptions } from 'ag-grid-community';
import { LicenseManager } from 'ag-grid-enterprise';
import Adaptable from '../../../../App_Scripts/agGrid';
import {
  AdaptableOptions,
  PredefinedConfig,
  ThemeChangedEventArgs,
  IAdaptable,
  AdaptableApi,
} from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { RowStyle } from '../../../../App_Scripts/PredefinedConfig/UserInterfaceState';
var adaptableApi: AdaptableApi;

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(5000);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = examplesHelper.createAdaptableOptionsTrade(
    gridOptions,
    'custom theme demo'
  );

  adaptableOptions.predefinedConfig = demoConfig;
  adaptableApi = Adaptable.init(adaptableOptions);

  adaptableApi.eventApi.on('ThemeChanged', (themeChangedEventArgs: ThemeChangedEventArgs) => {
    listenToThemeChanged(themeChangedEventArgs);
  });
}

function listenToThemeChanged(args: ThemeChangedEventArgs) {
  if (args.data[0].id.themeName === 'wimbledon-theme') {
    let rowStyles: RowStyle[] = [];
    let evenStyle: RowStyle = {
      Style: {
        ForeColor: 'white',
        BackColor: '#462376',
        FontWeight: 'Bold',
      },
      RowType: 'Even',
    };
    let oddStyle: RowStyle = {
      Style: {
        ForeColor: 'white',
        BackColor: '#0e6537',
        FontStyle: 'Italic',
      },
      RowType: 'Odd',
    };
    rowStyles.push(evenStyle);
    rowStyles.push(oddStyle);
    adaptableApi.userInterfaceApi.setRowStyles(rowStyles);
  } else {
    adaptableApi.userInterfaceApi.clearRowStyles();
  }
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Theme'],
  },
  Theme: {
    // if all 3 are commented out then we see both light theme and dark theme
    //  SystemThemes: ['dark'], // just dark
    //  SystemThemes: ['light'],  // just light
    //  SystemThemes: [],  // no themes;
    UserThemes: [
      {
        Name: 'wimbledon-theme',
        Description: 'Wimbledon',
      },
      {
        Name: 'BlueTheme',
        Description: 'Blue theme',
        VendorGridClassName: 'ag-theme-blue',
      },
    ],
    CurrentTheme: 'wimbledon-theme',
  },
};

export default () => {
  useEffect(() => {
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableDemo();
  }, []);

  return null;
};
