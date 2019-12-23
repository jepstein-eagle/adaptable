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

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(100);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableBlotterOptions: AdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsTrade(
    gridOptions,
    'glue42-demo'
  );

  adaptableBlotterOptions.predefinedConfig = demoConfig;
  adaptableBlotterOptions.auditOptions = {
    auditTickingDataChanges: {
      auditToConsole: true,
    },
  };

  adaptableBlotterOptions.generalOptions = {
    showAdaptableToolPanel: true,
  };

  const blotterApi = AdaptableBlotter.init(adaptableBlotterOptions);
}

let demoConfig: PredefinedConfig = {
  Partner: {
    Glue42: {
      RunLiveData: false,
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
            username: 'jonny', // should get from .env file
            password: 'demopassword', // put in .env file
          },
        },
        excelExport: {
          timeoutMs: 10000,
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
