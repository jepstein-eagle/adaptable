import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';
import './index.css';

import { GridOptions } from 'ag-grid-community';
import { LicenseManager } from 'ag-grid-enterprise';
import Adaptable from '../../../../App_Scripts/agGrid';
import { AdaptableOptions, PredefinedConfig, IAdaptable } from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(500);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  // console.log(tradeData);
  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo theming demo',
    adaptableId: 'Theming demo',
    vendorGrid: gridOptions,
    predefinedConfig: demoConfig,
  };

  adaptableOptions.vendorGrid.onCellValueChanged = function() {
    //   console.log(`onCellValueChanged: ${event.colDef.field} = ${event.newValue}`);
  };
  adaptableOptions.vendorGrid.onRowValueChanged = function(event) {
    //  console.log(`onRowValueChanged: (${data.make}, ${data.model}, ${data.price})`);
  };
  adaptableOptions.filterOptions = {
    autoApplyFilter: false,
  };

  const adaptableApi = Adaptable.init(adaptableOptions);
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
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableDemo();
  }, []);

  return null;
};
