import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
//import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../App_Scripts/index.scss';
//import '../../../../App_Scripts/themes/dark.scss';
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
import { ApplicationDataEntry } from '../../../../App_Scripts/PredefinedConfig/ApplicationState';

/*
Basic demo that just tests that we can create an agGrid and an Adaptable Blotter working together
No JSON or anything complicated
Nor do we create the ag-Grid
*/

var adaptableblotter: IAdaptableBlotter;

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 100;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  //gridOptions.rowSelection = true;
  // console.log(tradeData);
  const adaptableBlotterOptions: AdaptableBlotterOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    blotterId: 'Application Entries Demo',

    vendorGrid: gridOptions,
    predefinedConfig: demoConfig,
  };

  adaptableBlotterOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };

  adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);

  adaptableblotter.api.eventApi.on(
    'ApplicationToolbarButtonClicked',
    applicationToolbarButtonClickedEventArgs => {
      console.log('fetching');
      console.log(adaptableblotter.api.applicationApi.getApplicationDataEntries());
      console.log('adding');
      let kvp: ApplicationDataEntry = {
        Key: 'team',
        Value: 'liverpool',
      };
      adaptableblotter.api.applicationApi.addApplicationDataEntry(kvp);
      console.log(adaptableblotter.api.applicationApi.getApplicationDataEntries());

      console.log('editing');
      let kvpToEdit = adaptableblotter.api.applicationApi.getApplicationDataEntryByKey('Name');
      if (kvpToEdit) {
        let newKVP: ApplicationDataEntry = {
          Key: kvpToEdit.Key,
          Value: 'Danielle',
        };
        adaptableblotter.api.applicationApi.editApplicationDataEntry(newKVP);
        console.log(adaptableblotter.api.applicationApi.getApplicationDataEntries());
      }

      console.log('deleting');
      let newkvps = adaptableblotter.api.applicationApi.getApplicationDataEntries();
      let kvpToDelete = newkvps[1];
      if (kvpToDelete) {
        adaptableblotter.api.applicationApi.deleteApplicationDataEntry(kvpToDelete);
        console.log(adaptableblotter.api.applicationApi.getApplicationDataEntries());
      }

      console.log('getting');
      let newkvpsget = adaptableblotter.api.applicationApi.getApplicationDataEntriesByValue(33);
      console.log(newkvpsget);
    }
  );

  // global.adaptableblotter = adaptableblotter;
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Theme', 'Export', 'Layout', 'Application'],
  },
  Application: {
    ApplicationToolbarButtons: [
      {
        Name: 'testing',
        Caption: 'Test Entries',
      },
    ],
    ApplicationDataEntries: [
      {
        Key: 'Name',
        Value: 'John Smith',
      },
      {
        Key: 'Employee Number',
        Value: 20283728,
      },
      {
        Key: 'Joined Date',
        Value: new Date(2017, 13, 7),
      },
      {
        Key: 'Super User',
        Value: false,
      },
    ],
  },
  Entitlements: {
    FunctionEntitlements: [
      {
        FunctionName: 'CellValidation',
        AccessLevel: 'ReadOnly',
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
