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
import ReactDOM from 'react-dom';
import { TickingDataHelper } from '../../TickingDataHelper';

var adaptableblotter: IAdaptableBlotter;

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(250);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  const tickingDataHelper = new TickingDataHelper();

  const adaptableBlotterOptions: AdaptableBlotterOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    blotterId: 'System Status Demo',

    vendorGrid: gridOptions,
    predefinedConfig: demoConfig,
  };

  adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);

  adaptableblotter.api.eventApi.on('BlotterReady', () => {
    tickingDataHelper.startTickingDatSystemStatus(adaptableblotter.api);
  });

  adaptableblotter.api.eventApi.on(
    'ApplicationToolbarButtonClicked',
    applicationToolbarButtonClickedEventArgs => {
      switch (applicationToolbarButtonClickedEventArgs.data[0].id.applicationToolbarButton.Name) {
        case 'info':
          adaptableblotter.api.systemStatusApi.setInfoSystemStatus('No issues');
          break;
        case 'success':
          adaptableblotter.api.systemStatusApi.setSuccessSystemStatus('All working fine');
          break;
        case 'warning':
          adaptableblotter.api.systemStatusApi.setWarningSystemStatus('Problems with server');
          break;
        case 'error':
          adaptableblotter.api.systemStatusApi.setErrorSystemStatus('The server is down!');
          break;
        case 'clear':
          adaptableblotter.api.systemStatusApi.clearSystemStatus();
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
        Caption: 'Info',
      },
      {
        Name: 'success',
        Caption: 'Success',
      },
      {
        Name: 'warning',
        Caption: 'Warning',
      },
      {
        Name: 'error',
        Caption: 'Error',
      },
      {
        Name: 'clear',
        Caption: 'Clear',
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
