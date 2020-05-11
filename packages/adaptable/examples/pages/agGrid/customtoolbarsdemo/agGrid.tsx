import { useEffect } from 'react';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';
import { GridOptions } from '@ag-grid-community/all-modules';
import Adaptable from '../../../../src/agGrid';
import {
  AdaptableOptions,
  PredefinedConfig,
  DashboardButtonClickedInfo,
} from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import ReactDOM from 'react-dom';
import { ToolbarVisibilityChangedInfo } from '../../../../src/Api/Events/ToolbarVisibilityChanged';
import { ToolbarButtonClickedInfo } from '../../../../src/Api/Events/ToolbarButtonClicked';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';
import { ToolbarButton } from '../../../../src/PredefinedConfig/Common/ToolbarButton';
import { CustomToolbarConfiguredInfo } from '../../../../src/Api/Events/CustomToolbarConfigured';

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(250);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Custom Toolbars Demo',
    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: demoConfig,
  };
  const api = Adaptable.init(adaptableOptions);

  api.eventApi.on('ToolbarVisibilityChanged', toolbarVisibilityChangedEventArgs => {
    let toolbarVisibilityChangedInfo: ToolbarVisibilityChangedInfo =
      toolbarVisibilityChangedEventArgs.data[0].id;
    console.log('toolbarVisibilityChangedInfo');
    console.log(toolbarVisibilityChangedInfo);
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
    console.log(eventInfo);
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

  api.eventApi.on('DashboardButtonClicked', dashboardButtonClickedEventArgs => {
    let eventInfo: DashboardButtonClickedInfo = dashboardButtonClickedEventArgs.data[0].id;
    let dashboardButton = eventInfo.dashboardButton;
    console.log(eventInfo);
    console.log(dashboardButton.Name);
  });

  api.eventApi.on('CustomToolbarConfigured', customToolbarConfiguredEventArgs => {
    let eventInfo: CustomToolbarConfiguredInfo = customToolbarConfiguredEventArgs.data[0].id;
    let customToolbar = eventInfo.customToolbar;
    console.log(eventInfo);
    console.log(customToolbar.Name);
  });
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    Revision: 5,
    VisibleToolbars: [
      'QuickSearch',
      'Glue42',
      'Alert',
      'Toolbar1',
      'Toolbar2',
      'Toolbar3',
      'Toolbar4',
    ],
    IsInline: false,
    VisibleButtons: ['BulkUpdate', 'CellValidation', 'ConditionalStyle', 'PercentBar'],
    CustomButtons: [
      {
        Name: 'cb1',
        Caption: 'First',
        ButtonStyle: {
          Variant: 'text',
          Tone: 'success',
        },
      },
      {
        Name: 'cb2',
        Caption: 'Second',
        ButtonStyle: {
          Variant: 'raised',
          Tone: 'accent',
        },
      },
    ],
    CustomToolbars: [
      {
        Name: 'Toolbar1',
        ShowConfigureButton: true,
        //   Title: 'First Toolbar',
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
        Title: '',
        ShowConfigureButton: false,
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
        ShowConfigureButton: true,
        Title: 'Third Toolbar',
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
        ShowConfigureButton: false,
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
  Entitlements: {
    DefaultAccessLevel: 'Full',
    FunctionEntitlements: [
      {
        FunctionName: 'Dashboard',
        AccessLevel: 'Full',
      },
      {
        FunctionName: 'QuickSearch',
        AccessLevel: 'Full',
      },
      {
        FunctionName: 'BulkUpdate',
        AccessLevel: 'Full',
      },
      {
        FunctionName: 'ConditionalStyle',
        AccessLevel: 'Full',
      },
      {
        FunctionName: 'Glue42',
        AccessLevel: 'Full',
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
