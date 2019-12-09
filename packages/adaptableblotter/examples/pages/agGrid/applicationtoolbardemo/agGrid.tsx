import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';
import './index.css';

import { GridOptions } from 'ag-grid-community';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import { AdaptableBlotterOptions, PredefinedConfig } from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import ReactDOM from 'react-dom';

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(250);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableBlotterOptions: AdaptableBlotterOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    blotterId: 'Application Toolbar Demo',

    vendorGrid: gridOptions,
    predefinedConfig: demoConfig,
  };

  const api = AdaptableBlotter.init(adaptableBlotterOptions);

  // global.adaptableblotter = adaptableblotter;

  api.eventApi.on('ToolbarVisibilityChanged', toolbarVisibilityChangedEventArgs => {
    if (toolbarVisibilityChangedEventArgs.data[0].id.toolbar === 'Application') {
      let toolbarContents: any = (
        <div style={{ display: 'flex' }}>
          <button
            className="ab-SimpleButton ab-SimpleButton--variant-outlined"
            onClick={onNewTradeClicked}
            style={{ marginRight: '3px' }}
          >
            Create New Trade
          </button>
          <select className="ab-Dropdown" style={{ marginRight: '3px' }}>
            <option>Book 1</option>
            <option>Book 2</option>
            <option>Book 3</option>
          </select>
        </div>
      );

      ReactDOM.render(toolbarContents, api.applicationApi.getApplicationToolbarContentsDiv());
    }
  });

  function onNewTradeClicked() {
    // adaptableblotter.api.layoutApi.restorelayout(adaptableblotter.api.layoutApi.getCurrentLayout());
    api.systemStatusApi.setErrorSystemStatus('Hello Nat West');
  }

  //adaptableblotter._on()

  api.eventApi.on('ApplicationToolbarButtonClicked', applicationToolbarButtonClickedEventArgs => {
    alert(
      'name: ' + applicationToolbarButtonClickedEventArgs.data[0].id.applicationToolbarButton.Name
    );
    alert(
      'caption: ' +
        applicationToolbarButtonClickedEventArgs.data[0].id.applicationToolbarButton.Caption
    );
  });
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Theme', 'Export', 'Layout', 'Chart', 'Application'],
    VisibleButtons: ['BulkUpdate', 'CellValidation', 'ConditionalStyle', 'PercentBar'],
    ShowGridInfoButton: false,
    ShowToolbarsDropdown: false,
    DashboardVisibility: 'Minimised',
    MinimisedHomeToolbarButtonStyle: {
      Variant: 'raised',
      Tone: 'accent',
    },
  },
  Application: {
    ApplicationToolbarTitle: 'Better Buttons',
    ApplicationToolbarButtons: [
      {
        Name: 'btnNewTrade',
        Caption: 'New Trade',
        ButtonStyle: {
          Variant: 'text',
          Tone: 'success',
        },
      },
      {
        Name: 'btnRefreshGrid',
        Caption: 'Refresh Grid',
        ButtonStyle: {
          Variant: 'raised',
          Tone: 'accent',
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
