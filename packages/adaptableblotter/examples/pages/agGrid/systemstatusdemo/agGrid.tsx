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
          blotterApi.systemStatusApi.setWarningSystemStatus(
            'Problems with server',
            'It should be back up again in 1 hour'
          );
          break;
        case 'error':
          blotterApi.systemStatusApi.setErrorSystemStatus(
            'The server is down.  Yikes!',
            'Please make sure you dont make any changes.'
          );
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
    DefaultStatusMessage: 'Server is running fine.',
    DefaultStatusType: 'Info',
    StatusMessage: 'Please check you have sent End of Day report.',
    StatusType: 'Warning',
  },

  Application: {
    ApplicationToolbarButtons: [
      {
        Name: 'info',
        Caption: 'Set Info',
        ButtonStyle: {
          Variant: 'text',
          Tone: 'info',
        },
      },
      {
        Name: 'success',
        Caption: 'Set Success',
        ButtonStyle: {
          Variant: 'text',
          Tone: 'success',
        },
      },
      {
        Name: 'warning',
        Caption: 'Set Warning',
        ButtonStyle: {
          Variant: 'text',
          Tone: 'warning',
        },
      },
      {
        Name: 'error',
        Caption: 'Set Error',
        ButtonStyle: {
          Variant: 'text',
          Tone: 'error',
        },
      },
      {
        Name: 'clear',
        Caption: 'Clear',
        ButtonStyle: {
          Variant: 'raised',
        },
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
