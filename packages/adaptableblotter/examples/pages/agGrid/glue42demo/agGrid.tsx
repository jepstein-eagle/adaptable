import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';
import './index.css';

import { GridOptions } from 'ag-grid-community';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import { AdaptableBlotterOptions, PredefinedConfig } from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';

import glue42Desktop from '@glue42/desktop';
import glue42office from '@glue42/office';

/*
Basic demo that just tests that we can create an agGrid and an Adaptable Blotter working together
No JSON or anything complicated
Nor do we create the ag-Grid
*/

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
  adaptableBlotterOptions.vendorGrid.onCellValueChanged = function(event: {
    colDef: { field: any };
    newValue: any;
  }) {
    console.log(`onCellValueChanged: ${event.colDef.field} = ${event.newValue}`);
  };
  adaptableBlotterOptions.vendorGrid.onRowValueChanged = function(event: { data: any }) {
    var data = event.data;
    console.log(`onRowValueChanged: (${data.make}, ${data.model}, ${data.price})`);
  };
  adaptableBlotterOptions.filterOptions = {
    autoApplyFilter: false,
  };
  const adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);
}

let demoConfig: PredefinedConfig = {
  Partner: {
    Glue42: {
      Glue: glue42Desktop, // this is the glue object

      Glue4Office: glue42office, // this is the Glue4Office object

      Glue42Config: {
        initialization: {
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
        excelExport: {
          timeoutMs: 3000,
        },
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
