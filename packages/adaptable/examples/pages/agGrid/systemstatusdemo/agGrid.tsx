import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';

import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import { GridOptions } from '@ag-grid-community/all-modules';
import Adaptable from '../../../../src/agGrid';
import { AdaptableOptions, PredefinedConfig, AdaptableApi } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(250);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'System Status Demo',
    vendorGrid: gridOptions,
    predefinedConfig: demoConfig,
  };

  const adaptableApi: AdaptableApi = Adaptable.init(adaptableOptions);

  adaptableApi.eventApi.on('ToolbarButtonClicked', toolbarButtonClickedEventArgs => {
    switch (toolbarButtonClickedEventArgs.data[0].id.toolbarButton.Name) {
      case 'info':
        adaptableApi.systemStatusApi.setInfoSystemStatus('No issues');
        break;
      case 'success':
        adaptableApi.systemStatusApi.setSuccessSystemStatus('All working fine');
        break;
      case 'warning':
        adaptableApi.systemStatusApi.setWarningSystemStatus(
          'Problems with server',
          'It should be back up again in 1 hour'
        );
        break;
      case 'error':
        adaptableApi.systemStatusApi.setErrorSystemStatus(
          'The server is down.  Yikes!',
          'Please make sure you dont make any changes.'
        );
        break;
      case 'clear':
        adaptableApi.systemStatusApi.clearSystemStatus();
        break;
    }
  });
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Demo', 'SystemStatus'],
    CustomToolbars: [
      {
        Name: 'Demo',
        Title: 'Demo',
        ToolbarButtons: [
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
    ],
  },
  SystemStatus: {
    ShowAlert: false,
    DefaultStatusMessage: 'Server is running fine.',
    DefaultStatusType: 'Info',
    StatusMessage: 'Please check you have sent End of Day report.',
    StatusType: 'Warning',
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
