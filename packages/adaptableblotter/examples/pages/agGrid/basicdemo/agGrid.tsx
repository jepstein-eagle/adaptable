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

/*
Basic demo that just tests that we can create an agGrid and an Adaptable Blotter working together
No JSON or anything complicated
Nor do we create the ag-Grid
*/

LicenseManager.setLicenseKey(process.env.ENTERPRISE_LICENSE!);
function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(500);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  // console.log(tradeData);
  const adaptableBlotterOptions: AdaptableBlotterOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo Usersssssss',
    blotterId: 'No Config Demo111!',

    vendorGrid: gridOptions,
    predefinedConfig: demoConfig,
  };

  adaptableBlotterOptions.vendorGrid.onCellValueChanged = function() {
    //   console.log(`onCellValueChanged: ${event.colDef.field} = ${event.newValue}`);
    // adaptableblotter.api.columnChooserApi.showColumnChooserPopup();
  };
  adaptableBlotterOptions.vendorGrid.onRowValueChanged = function(event) {
    //  console.log(`onRowValueChanged: (${data.make}, ${data.model}, ${data.price})`);
  };
  adaptableBlotterOptions.filterOptions = {
    autoApplyFilter: false,
  };

  const adaptableblotter: IAdaptableBlotter = new AdaptableBlotter(adaptableBlotterOptions);

  //gridOptions.api!.ensureIndexVisible(200);
  // adaptableblotter.api.userFilterApi.showUserFilterPopup();

  examplesHelper.autoSizeDefaultLayoutColumns(adaptableblotter, gridOptions);

  //  adaptableblotter.api.systemStatusApi.setSuccessSystemStatus('ouch');
  global.adaptableblotter = adaptableblotter;

  adaptableblotter.on('toolbar-show', toolbar => {
    console.log('showing toolbar', toolbar);
    if (toolbar === 'Application') {
      ReactDOM.render(
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <button>xxx</button>
          <button>yyy</button>
          <button className="ab-SimpleButton">zzz</button>
        </div>,
        document.querySelector('.ab-ApplicationToolbar__contents')
      );
    }
  });

  adaptableblotter.on('toolbar-hide', toolbar => {
    console.log(
      'hiding toolbar',
      toolbar,
      document.querySelector('.ab-ApplicationToolbar__contents')
    );
  });
}

let demoConfig: PredefinedConfig = {
  PartnerConfig: {
    glue42Config: 'Hello ',
  },
  Layout: {
    CurrentLayout: 'test',
    Layouts: [
      {
        Columns: ['tradeId', 'country', 'notional', 'stars', 'currency', 'ask', 'bid'],
        ColumnSorts: [{ Column: 'country', SortOrder: 'Ascending' }],
        Name: 'test',
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
