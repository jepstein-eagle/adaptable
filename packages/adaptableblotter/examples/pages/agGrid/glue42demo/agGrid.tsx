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
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableBlotterOptions: AdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsTrade(
    gridOptions,
    `glue42-demo` // ${Date.now()}`
  );

  adaptableBlotterOptions.predefinedConfig = demoConfig;
  adaptableBlotterOptions.chartOptions = {
    showModal: false,
    displayOnStartUp: true,
  };
  adaptableBlotterOptions.vendorGrid.onCellValueChanged = function(event) {
    console.log(`onCellValueChanged: ${event.colDef.field} = ${event.newValue}`);
  };
  adaptableBlotterOptions.vendorGrid.onRowValueChanged = function(event) {
    var data = event.data;
    console.log(`onRowValueChanged: (${data.make}, ${data.model}, ${data.price})`);
  };
  adaptableBlotterOptions.filterOptions = {
    autoApplyFilter: false,
  };
  const adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);
  examplesHelper.autoSizeDefaultLayoutColumns(adaptableblotter, gridOptions);

  adaptableblotter.api.systemStatusApi.setSuccessSystemStatus('ouch');
  // global.adaptableblotter = adaptableblotter;
}

let demoConfig: PredefinedConfig = {
  QuickSearch: {
    QuickSearchText: 'F*',
  },
  PartnerConfig: {
    glue42Config: {
      application: 'AdaptableBlotterDemo',
      gateway: {
        protocolVersion: 3,
        ws: 'ws://localhost:8385',
      },
      auth: {
        username: 'demouser',
        password: 'demopassword',
      },
    },
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
