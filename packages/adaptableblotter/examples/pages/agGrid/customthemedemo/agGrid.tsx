import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../App_Scripts/base.scss';

import '../../../../App_Scripts/themes/light.scss';
import '../../../../App_Scripts/themes/dark.scss';

import './index.css';

import { GridOptions } from 'ag-grid-community';
import { LicenseManager } from 'ag-grid-enterprise';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import { AdaptableBlotterOptions, PredefinedConfig } from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';

/*
Basic demo that just tests that we can create an agGrid and an Adaptable Blotter working together
No JSON or anything complicated
Nor do we create the ag-Grid
*/

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

  adaptableblotter.api.systemStatusApi.setSuccessSystemStatus('ouch');
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Theme'],
  },
  Theme: {
    SystemThemes: ['dark'],
    //  SystemThemes: ['light'],
    //  SystemThemes: [],
    UserThemes: [
      {
        Name: 'custom-theme',
        Description: 'A Custom theme',
      },
      {
        Name: 'liverpool',
        Description: 'Euro Champs',
      },
    ],
    CurrentTheme: 'liverpool',
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
