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
import {
  TOOLBAR_VISIBLE_EVENT,
  TOOLBAR_HIDDEN_EVENT,
  APPLICATION_BUTTON_CLICKED_EVENT,
} from '../../../../App_Scripts/Utilities/Constants/GeneralConstants';

LicenseManager.setLicenseKey(process.env.ENTERPRISE_LICENSE!);
var adaptableblotter: IAdaptableBlotter;

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

  adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);

  examplesHelper.autoSizeDefaultLayoutColumns(adaptableblotter, gridOptions); // global.adaptableblotter = adaptableblotter;

  adaptableblotter.on(TOOLBAR_VISIBLE_EVENT, toolbar => {
    if (toolbar === 'Application') {
      let toolbarContents: any = (
        <div style={{ display: 'flex' }}>
          <button
            className="ab-SimpleButton ab-SimpleButton--variant-outlined"
            onClick={myFunction}
            style={{ marginRight: '3px' }}
          >
            Content Button
          </button>
          <select className="ab-Dropdown " style={{ marginRight: '3px' }}>
            <option>content drop</option>
            <option>second</option>
            <option>third</option>
          </select>
        </div>
      );

      ReactDOM.render(
        toolbarContents,
        adaptableblotter.api.applicationApi.getApplicationToolbarContentsDiv()
      );
    }
  });

  adaptableblotter.on(APPLICATION_BUTTON_CLICKED_EVENT, button => {
    alert('the button clicked was: ' + button);
  });

  adaptableblotter.on(TOOLBAR_HIDDEN_EVENT, toolbar => {
    console.log(
      'hiding toolbar',
      toolbar,
      document.querySelector('.ab-ApplicationToolbar__contents')
    );
  });
}

function myFunction() {
  alert('You clicked the Rendered button');
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Theme', 'Export', 'Layout', 'Application'],
  },
  Application: {
    ApplicationToolbarButtons: [
      {
        ButtonText: 'Button 1',
      },
      {
        ButtonText: 'Button 2',
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
