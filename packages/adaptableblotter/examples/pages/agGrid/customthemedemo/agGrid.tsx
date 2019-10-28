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
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import {
  AdaptableBlotterOptions,
  PredefinedConfig,
  ThemeChangedEventArgs,
  IAdaptableBlotter,
} from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { RowStyle } from '../../../../App_Scripts/PredefinedConfig/DesignTimeState/UserInterfaceState';

LicenseManager.setLicenseKey(process.env.ENTERPRISE_LICENSE!);
function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(5000);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableBlotterOptions: AdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsTrade(
    gridOptions,
    'custom theme demo'
  );

  adaptableBlotterOptions.predefinedConfig = demoConfig;
  const adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);
  examplesHelper.autoSizeDefaultLayoutColumns(adaptableblotter, gridOptions);

  adaptableblotter.api.eventApi
    .onThemeChanged()
    .Subscribe((sender, themeChangedEventArgs) =>
      listenToThemeChanged(sender, themeChangedEventArgs)
    );

  adaptableblotter.api.systemStatusApi.setSuccessSystemStatus('ouch');
}

function listenToThemeChanged(blotter: IAdaptableBlotter, args: ThemeChangedEventArgs) {
  if (args.themeName === 'wimbledon-theme') {
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
    blotter.api.userInterfaceApi.setRowStyles(rowStyles);
  } else {
    blotter.api.userInterfaceApi.clearRowStyles();
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
  UserInterface: {
    /*
    RowStyles: [
      {
        Style: {
          ForeColor: 'white',
          BackColor: '#462376',
          FontWeight: 'Bold',
        },
        RowType: 'Even',
      },
      {
        Style: {
          ForeColor: 'white',
          BackColor: '#0e6537',
          FontStyle: 'Italic',
        },
        RowType: 'Odd',
      },
    ],
     */
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
