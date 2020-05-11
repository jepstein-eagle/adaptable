import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';

import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import { GridOptions } from '@ag-grid-community/all-modules';
import { LicenseManager } from 'ag-grid-enterprise';
import Adaptable from '../../../../src/agGrid';
import { AdaptableOptions, PredefinedConfig, IAdaptable } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(500);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  // console.log(tradeData);
  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo theming demo',
    adaptableId: 'Theming demo',
    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
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
