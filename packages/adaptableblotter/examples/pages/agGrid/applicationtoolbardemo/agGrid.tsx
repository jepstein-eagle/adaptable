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

  adaptableblotter.on('ToolbarVisible', toolbar => {
    if (toolbar === 'Application') {
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

      ReactDOM.render(
        toolbarContents,
        adaptableblotter.api.applicationApi.getApplicationToolbarContentsDiv()
      );
    }
  });
  //adaptableblotter._on()

  adaptableblotter.on('ApplicationToolbarButtonClicked', button => {
    alert('name: ' + button.Name);
    alert('caption: ' + button.Caption);
  });

  adaptableblotter.on('ToolbarHidden', toolbar => {
    console.log(
      'hiding toolbar',
      toolbar,
      document.querySelector('.ab-ApplicationToolbar__contents')
    );
  });
}

function onNewTradeClicked() {
  alert('lets create a trade');
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Theme', 'Export', 'Layout', 'Application'],
  },
  Application: {
    ApplicationToolbarButtons: [
      {
        Name: 'btnNewTrade',
        Caption: 'New Trade',
      },
      {
        Name: 'btnRefreshGrid',
        Caption: 'Refresh Grid',
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
