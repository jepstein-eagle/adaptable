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
    blotterId: 'Custom Toolbars Demo',

    vendorGrid: gridOptions,
    predefinedConfig: demoConfig,
  };

  const api = AdaptableBlotter.init(adaptableBlotterOptions);

  api.eventApi.on('ToolbarVisibilityChanged', toolbarVisibilityChangedEventArgs => {
    if (toolbarVisibilityChangedEventArgs.data[0].id.toolbar === 'Toolbar1') {
      let toolbarContents: any = (
        <div style={{ display: 'flex' }}>
          <button
            className="ab-SimpleButton ab-SimpleButton--variant-outlined"
            onClick={onNewTradeClicked}
            style={{ marginRight: '3px' }}
          >
            Create New Trade
          </button>
        </div>
      );

      let contentsDiv = api.dashboardApi.getCustomToolbarContentsDiv('Toolbar1');
      if (contentsDiv) {
        ReactDOM.render(toolbarContents, contentsDiv);
      } else {
        console.log('Couldnt find div to render custom content');
      }
    }

    if (toolbarVisibilityChangedEventArgs.data[0].id.toolbar === 'Toolbar2') {
      let toolbarContents: any = (
        <div style={{ display: 'flex' }}>
          <select className="ab-Dropdown" style={{ marginRight: '3px' }}>
            <option>Book 1</option>
            <option>Book 2</option>
            <option>Book 3</option>
          </select>
        </div>
      );

      let contentsDiv = api.dashboardApi.getCustomToolbarContentsDiv('Toolbar2');
      if (contentsDiv) {
        ReactDOM.render(toolbarContents, contentsDiv);
      } else {
        console.log('Couldnt find div to render custom content');
      }
    }
  });

  function onNewTradeClicked() {
    alert('Hello Nat West');
  }

  api.eventApi.on('ToolbarButtonClicked', toolbarButtonClickedEventArgs => {
    alert('name: ' + toolbarButtonClickedEventArgs.data[0].id.toolbarButton.Name);
    alert('caption: ' + toolbarButtonClickedEventArgs.data[0].id.toolbarButton.Caption);
  });
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Toolbar1', 'Layout', 'Toolbar2', 'Export'],
    VisibleButtons: ['BulkUpdate', 'CellValidation', 'ConditionalStyle', 'PercentBar'],
    CustomToolbars: [
      {
        Name: 'Toolbar1',
        Title: 'First Toolbar',
        Glyph: 'advanced-search',
        ToolbarButtons: [
          {
            Name: 'btnSuccess',
            Caption: 'Congrats',
            ButtonStyle: {
              Variant: 'text',
              Tone: 'success',
            },
          },
          {
            Name: 'btnToolbar1',
            Caption: 'Refresh Grid',
            ButtonStyle: {
              Variant: 'raised',
              Tone: 'accent',
            },
          },
        ],
      },
      {
        Name: 'Toolbar2',
        Title: 'Second Toolbar',
        ToolbarButtons: [
          {
            Name: 'btnWarning',
            Caption: 'Be Careful',
            ButtonStyle: {
              Variant: 'text',
              Tone: 'error',
            },
          },
        ],
      },
      {
        Name: 'Toolbar3',
        Title: 'Third Toolbar',
        Glyph: 'export',
        ToolbarButtons: [
          {
            Name: 'btnToolbar3',
            Caption: 'Send Message',
            ButtonStyle: {
              Variant: 'raised',
              Tone: 'neutral',
            },
          },
        ],
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
