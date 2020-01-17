import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';

import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import { GridOptions } from '@ag-grid-community/all-modules';
import Adaptable from '../../../../src/agGrid';
import { AdaptableOptions, PredefinedConfig } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import ReactDOM from 'react-dom';
import { ToolbarVisibilityChangedInfo } from '../../../../src/Api/Events/ToolbarVisibilityChanged';
import {
  ToolbarButtonClickedEventData,
  ToolbarButtonClickedInfo,
} from '../../../../src/Api/Events/ToolbarButtonClicked';
import { ToolbarButton } from '../../../../src/PredefinedConfig/Common/ToolbarButton';

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(250);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Custom Toolbars Demo',
    vendorGrid: gridOptions,
    predefinedConfig: demoConfig,
  };

  const api = Adaptable.init(adaptableOptions);

  api.eventApi.on('ToolbarVisibilityChanged', toolbarVisibilityChangedEventArgs => {
    let toolbarVisibilityChangedInfo: ToolbarVisibilityChangedInfo =
      toolbarVisibilityChangedEventArgs.data[0].id;
    if (toolbarVisibilityChangedInfo.visibility === 'Visible') {
      if (toolbarVisibilityChangedInfo.toolbar === 'Toolbar1') {
        let toolbarContents: any = (
          <div style={{ display: 'flex' }}>
            <button
              className="ab-SimpleButton ab-SimpleButton--variant-outlined"
              onClick={onNewTradeClicked}
              style={{ marginRight: '3px' }}
            >
              Rendered Button
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
    }
  });

  function onNewTradeClicked() {
    alert('Hello Nat West');
  }

  api.eventApi.on('ToolbarButtonClicked', toolbarButtonClickedEventArgs => {
    let eventInfo: ToolbarButtonClickedInfo = toolbarButtonClickedEventArgs.data[0].id;
    let toolbarButton = eventInfo.toolbarButton;

    if (toolbarButton.Name == 'btnSetButton') {
      let btnSet1: ToolbarButton = {
        Name: 'set1',
        Caption: 'Set 1',
      };
      let btnSet2: ToolbarButton = {
        Name: 'set2',
        Caption: 'Set 2',
      };
      api.dashboardApi.setCustomToolbarButtons('Toolbar1', [btnSet1, btnSet2]);
    }

    if (toolbarButton.Name == 'btnAddButton') {
      let btnAdd1: ToolbarButton = {
        Name: 'add1',
        Caption: 'Add 1',
      };
      let btnAdd2: ToolbarButton = {
        Name: 'add2',
        Caption: 'Add 2',
      };
      api.dashboardApi.addCustomToolbarButtons('Toolbar1', [btnAdd1, btnAdd2]);
    }

    if (toolbarButton.Name == 'btnClearButton') {
      api.dashboardApi.clearCustomToolbarButtons('Toolbar1');
    }
  });
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Toolbar1', 'Toolbar2', 'Toolbar3', 'Toolbar4'],
    VisibleButtons: ['BulkUpdate', 'CellValidation', 'ConditionalStyle', 'PercentBar'],
    // make this not persistable
    CustomToolbars: [
      {
        Name: 'Toolbar1',
        Title: 'First Toolbar',
        Glyph: 'advanced-search',
        ToolbarButtons: [
          {
            Name: 'btnToolbar1',
            Caption: 'First Toolbar btn',
            ButtonStyle: {
              Variant: 'text',
              Tone: 'success',
            },
          },
          {
            Name: 'btnToolbar2',
            Caption: 'Second Toolbar btn',
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
            Name: 'btnSetButton',
            Caption: 'Set Buttons',
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
            Name: 'btnAddButton',
            Caption: 'Add Buttons',
            ButtonStyle: {
              Variant: 'raised',
              Tone: 'neutral',
            },
          },
        ],
      },
      {
        Name: 'Toolbar4',
        Title: 'Fourth Toolbar',
        Glyph: 'export',
        ToolbarButtons: [
          {
            Name: 'btnClearButton',
            Caption: 'Clear Buttons',
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
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableDemo();
  }, []);

  return null;
};
