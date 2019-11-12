import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../App_Scripts/index.scss';
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
  const tradeData: any = examplesHelper.getTrades(300);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTradeWithSparkline(tradeData);

  const adaptableBlotterOptions: AdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsTrade(
    gridOptions,
    `sparklines` // ${Date.now()}`
  );

  adaptableBlotterOptions.predefinedConfig = demoConfig;

  const adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);

  //  adaptableblotter.api.systemStatusApi.setSuccessSystemStatus('ouch');
  global.adaptableblotter = adaptableblotter;
}

let demoConfig: PredefinedConfig = {
  SparklineColumn: {
    SparklineColumns: [
      {
        ColumnId: 'history',
        SparklineType: 'Line',
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
