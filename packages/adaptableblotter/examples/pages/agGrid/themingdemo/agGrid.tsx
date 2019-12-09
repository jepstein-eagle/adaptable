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
import {
  AdaptableBlotterOptions,
  PredefinedConfig,
  IAdaptableBlotter,
} from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(500);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  // console.log(tradeData);
  const adaptableBlotterOptions: AdaptableBlotterOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo theming demo',
    blotterId: 'Theming demo',

    vendorGrid: gridOptions,
    predefinedConfig: demoConfig,
  };

  adaptableBlotterOptions.vendorGrid.onCellValueChanged = function() {
    //   console.log(`onCellValueChanged: ${event.colDef.field} = ${event.newValue}`);
  };
  adaptableBlotterOptions.vendorGrid.onRowValueChanged = function(event) {
    //  console.log(`onRowValueChanged: (${data.make}, ${data.model}, ${data.price})`);
  };
  adaptableBlotterOptions.filterOptions = {
    autoApplyFilter: false,
  };

  const blotterApi = AdaptableBlotter.init(adaptableBlotterOptions);
}

let demoConfig: PredefinedConfig = {
  Theme: {
    UserThemes: [
      {
        Name: 'Wimbledon-theme',
        Description: 'Wimbledon theme - aggrid',
      },
      {
        Name: 'Second-theme',
        Description: 'My second theme - aggrid dark',
        VendorGridClassName: 'ag-theme-balham-dark',
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
