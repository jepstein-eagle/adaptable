import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
//import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../App_Scripts/index.scss';
//import '../../../../App_Scripts/themes/dark.scss';
import './index.css';

import { GridOptions } from 'ag-grid-community';
import { LicenseManager } from 'ag-grid-enterprise';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import {
  AdaptableBlotterOptions,
  PredefinedConfig,
  IAdaptableBlotter,
  ThemeChangedEventArgs,
} from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import ReactDOM from 'react-dom';
import { TickingDataHelper } from '../../TickingDataHelper';
import {
  TOOLBAR_VISIBLE_EVENT,
  TOOLBAR_HIDDEN_EVENT,
  DASHBOARD_BUTTON_CLICKED_EVENT,
} from '../../../../App_Scripts/Utilities/Constants/GeneralConstants';

/*
Basic demo that just tests that we can create an agGrid and an Adaptable Blotter working together
No JSON or anything complicated
Nor do we create the ag-Grid
*/

LicenseManager.setLicenseKey(process.env.ENTERPRISE_LICENSE!);
var adaptableblotter: IAdaptableBlotter;

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tickingDataHelper = new TickingDataHelper();
  const tradeData: any = examplesHelper.getTrades(25);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  // console.log(tradeData);
  const adaptableBlotterOptions: AdaptableBlotterOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo Usersssssss',
    blotterId: 'With Some Spaces',

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

  adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);

  adaptableblotter.api.eventApi
    .onThemeChanged()
    .Subscribe((sender, themeChangedEventArgs) => listenToThemeChanged(themeChangedEventArgs));

  //gridOptions.api!.ensureIndexVisible(200);
  // adaptableblotter.api.userFilterApi.showUserFilterPopup();

  examplesHelper.autoSizeDefaultLayoutColumns(adaptableblotter, gridOptions);

  //  adaptableblotter.api.systemStatusApi.setSuccessSystemStatus('ouch');
  global.adaptableblotter = adaptableblotter;

  function listenToThemeChanged(args: ThemeChangedEventArgs) {
    console.log('column event received');
    //alert(args.themeName);
  }

  adaptableblotter.on(TOOLBAR_VISIBLE_EVENT, toolbar => {
    if (toolbar === 'Application') {
      let toolbarContents: any = (
        <div style={{ display: 'flex' }}>
          <button
            className="ab-SimpleButton ab-SimpleButton--variant-outlined"
            onClick={myFunction}
          >
            Rendered
          </button>
        </div>
      );
      adaptableblotter.api.applicationApi.RenderToolbar(toolbarContents);
    }
  });

  adaptableblotter.on(DASHBOARD_BUTTON_CLICKED_EVENT, button => {
    alert('the button clicked was: ' + button);
  });

  adaptableblotter.on(TOOLBAR_HIDDEN_EVENT, toolbar => {
    console.log(
      'hiding toolbar',
      toolbar,
      document.querySelector('.ab-ApplicationToolbar__contents')
    );
  });
}

function myFunction() {
  alert('You clicked the Rendered button');
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Theme', 'Export', 'Layout', 'Application'],
  },
  QuickSearch: {
    QuickSearchText: 'jonny',
  },
  Application: {
    ApplicationToolbarButtons: [
      {
        ButtonText: 'Hello',
        // OnClick: () => {},
      },
      {
        ButtonText: 'Goodbye',
      },
    ],
  },
  Entitlements: {
    FunctionEntitlements: [
      {
        FunctionName: 'StateManagement',
        AccessLevel: 'ReadOnly',
      },
    ],
  },
  FlashingCell: {
    DefaultUpColor: '#462376',
    DefautDownColor: '#07456d',
  },
  /*
  Layout: {
    //  CurrentLayout: 'test',
    Layouts: [
      {
        Columns: ['tradeId', 'country', 'notional', 'stars', 'currency', 'ask', 'bid'],
        ColumnSorts: [{ Column: 'country', SortOrder: 'Ascending' }],
        Name: 'test',
      },
    ],
  },
  */
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
