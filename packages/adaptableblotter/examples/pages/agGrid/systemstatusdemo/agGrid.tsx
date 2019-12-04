import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';
import './index.css';

import { GridOptions } from 'ag-grid-community';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import {
  AdaptableBlotterOptions,
  PredefinedConfig,
  BlotterApi,
} from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(250);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableBlotterOptions: AdaptableBlotterOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    blotterId: 'System Status Demo',

    vendorGrid: gridOptions,
    predefinedConfig: demoConfig,
  };

  const blotterApi: BlotterApi = AdaptableBlotter.init(adaptableBlotterOptions);

  blotterApi.eventApi.on('BlotterReady', () => {
    // tickingDataHelper.startTickingDatSystemStatus(blotterApi);
  });

  blotterApi.eventApi.on(
    'ApplicationToolbarButtonClicked',
    applicationToolbarButtonClickedEventArgs => {
      switch (applicationToolbarButtonClickedEventArgs.data[0].id.applicationToolbarButton.Name) {
        case 'info':
          blotterApi.systemStatusApi.setInfoSystemStatus('No issues');
          break;
        case 'success':
          blotterApi.systemStatusApi.setSuccessSystemStatus('All working fine');
          break;
        case 'warning':
          blotterApi.systemStatusApi.setWarningSystemStatus('Problems with server');
          break;
        case 'error':
          blotterApi.systemStatusApi.setErrorSystemStatus('The server is down!');
          break;
        case 'clear':
          blotterApi.systemStatusApi.clearSystemStatus();
          break;
      }
    }
  );
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Application', 'SystemStatus'],
  },

  SystemStatus: {
    ShowAlert: false,
    DefaultStatusMessage: 'This is default',
    DefaultStatusType: 'Info',
    StatusMessage: 'overriding with this',
    StatusType: 'Error',
  },

  Application: {
    ApplicationToolbarButtons: [
      {
        Name: 'info',
        Caption: 'Set Info',
        Variant: 'raised',
        Tone: 'info',
      },
      {
        Name: 'success',
        Caption: 'Set Success',
        Variant: 'raised',
        Tone: 'success',
      },
      {
        Name: 'warning',
        Caption: 'Set Warning',
        Variant: 'raised',
        Tone: 'warning',
      },
      {
        Name: 'error',
        Caption: 'Set Error',
        Variant: 'raised',
        Tone: 'error',
      },
      {
        Name: 'clear',
        Caption: 'Set Clear',
        Variant: 'raised',
        Tone: 'accent',
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
