import React, { useEffect } from 'react';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-blue.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import Adaptable from '../../../../src/agGrid';
import '../../../../src/index.scss';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';
import '../../../../src/themes/dark.scss';
import { GridOptions } from '@ag-grid-community/all-modules';
import { AdaptableOptions, PredefinedConfig } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';

/*
Demo that hopefully will demonstrate how to create a dark theme
Needs other things to work but it should be possible to stipulate a Current Theme and then that will make it all work?
*/

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(10);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Theme Demo',
    userInterfaceOptions: {
      showAdaptableToolPanel: true,
    },
    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: demoConfig,
  };
  const adaptableApi = Adaptable.init(adaptableOptions);
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    Tabs: [
      {
        Name: 'Demo',
        Toolbars: ['Theme', 'Export', 'Layout', 'CellSummary'],
      },
    ],
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
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableDemo();
  }, []);

  return null;
};
