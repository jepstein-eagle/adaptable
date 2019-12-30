import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
//import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../App_Scripts/index.scss';
//import '../../../../App_Scripts/themes/dark.scss';
import './index.css';

import { GridOptions } from 'ag-grid-community';
import Adaptable from '../../../../App_Scripts/agGrid';
import { AdaptableOptions, PredefinedConfig, AdaptableApi } from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { ApplicationDataEntry } from '../../../../App_Scripts/PredefinedConfig/ApplicationState';

var adaptableApi: AdaptableApi;

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 100;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  //gridOptions.rowSelection = true;
  // console.log(tradeData);
  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    blotterId: 'Application Entries Demo',

    vendorGrid: gridOptions,
    predefinedConfig: demoConfig,
  };

  adaptableOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };

  adaptableApi = Adaptable.init(adaptableOptions);

  adaptableApi.eventApi.on('ToolbarButtonClicked', toolbarButtonClickedEventArgs => {
    console.log('fetching');
    console.log(adaptableApi.applicationApi.getApplicationDataEntries());
    console.log('adding');
    let kvp: ApplicationDataEntry = {
      Key: 'team',
      Value: 'liverpool',
    };
    adaptableApi.applicationApi.addApplicationDataEntry(kvp);
    console.log(adaptableApi.applicationApi.getApplicationDataEntries());

    console.log('editing');
    let kvpToEdit = adaptableApi.applicationApi.getApplicationDataEntryByKey('Name');
    if (kvpToEdit) {
      let newKVP: ApplicationDataEntry = {
        Key: kvpToEdit.Key,
        Value: 'Danielle',
      };
      adaptableApi.applicationApi.editApplicationDataEntry(newKVP);
      console.log(adaptableApi.applicationApi.getApplicationDataEntries());
    }

    console.log('deleting');
    let newkvps = adaptableApi.applicationApi.getApplicationDataEntries();
    let kvpToDelete = newkvps[1];
    if (kvpToDelete) {
      adaptableApi.applicationApi.deleteApplicationDataEntry(kvpToDelete);
      console.log(adaptableApi.applicationApi.getApplicationDataEntries());
    }

    console.log('getting');
    let newkvpsget = adaptableApi.applicationApi.getApplicationDataEntriesByValue(33);
    console.log(newkvpsget);
  });
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Theme', 'Export', 'Layout'],
  },
  Application: {
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
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableBlotter();
  }, []);

  return null;
};
