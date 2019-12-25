import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';

import {
  AdaptableBlotterOptions,
  AlertFiredEventArgs,
  ColumnStateChangedEventArgs,
  SearchChangedEventArgs,
  PredefinedConfig,
  BlotterApi,
  ToolbarButtonClickedEventArgs,
  ThemeChangedEventArgs,
  ActionColumnClickedEventArgs,
  SelectionChangedEventArgs,
  ToolbarVisibilityChangedEventArgs,
} from '../../../../App_Scripts/types';
import { GridOptions } from 'ag-grid-community';
import { ExamplesHelper } from '../../ExamplesHelper';

import ReactDOM from 'react-dom';
import { AlertFiredInfo } from '../../../../App_Scripts/Api/Events/AlertFired';
import { AdaptableAlert } from '../../../../App_Scripts/Utilities/Interface/IMessage';

var blotterApi: BlotterApi;

/*
This example runs all the events we fire.
It tests both the 'old' event syntax and the new one with an option to switch between them.
Goign forward, new events wil ONLY use the new syntax.
*/

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(500);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableBlotterOptions: AdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsTrade(
    gridOptions,
    'event handling demo'
  );
  adaptableBlotterOptions.generalOptions = {
    serverSearchOption: 'AllSearchandSort',
  };
  adaptableBlotterOptions.predefinedConfig = demoConfig;
  blotterApi = AdaptableBlotter.init(adaptableBlotterOptions);

  // new way
  blotterApi.eventApi.on('ThemeChanged', (themeChangedEventArgs: ThemeChangedEventArgs) => {
    listenToThemeChanged(themeChangedEventArgs);
  });
  blotterApi.eventApi.on(
    'ColumnStateChanged',
    (columnStateChangedEventArgs: ColumnStateChangedEventArgs) => {
      listenToColumnStateChange(columnStateChangedEventArgs);
    }
  );
  blotterApi.eventApi.on('AlertFired', (alertFiredArgs: AlertFiredEventArgs) => {
    listenToAlertFired(alertFiredArgs);
  });
  blotterApi.eventApi.on('SearchChanged', (searchChangedArgs: SearchChangedEventArgs) => {
    listenToSearchChange(searchChangedArgs);
  });
  blotterApi.eventApi.on(
    'ActionColumnClicked',
    (actionColumnEventArgs: ActionColumnClickedEventArgs) => {
      listenToActionColumnClicked(actionColumnEventArgs);
    }
  );
  blotterApi.eventApi.on(
    'SelectionChanged',
    (selectionChangedEventArgs: SelectionChangedEventArgs) => {
      listenToSelectionChanged(selectionChangedEventArgs);
    }
  );

  blotterApi.eventApi.on(
    'ToolbarButtonClicked',
    (toolbarButtonClickedEventArgs: ToolbarButtonClickedEventArgs) => {
      console.log(' Toolbar Button Clicked');
      console.log('name: ' + toolbarButtonClickedEventArgs.data[0].id.toolbarButton.Name);
      console.log('caption: ' + toolbarButtonClickedEventArgs.data[0].id.toolbarButton.Caption);
    }
  );

  blotterApi.eventApi.on(
    'ToolbarVisibilityChanged',
    (toolbarVisibilityChangedEventArgs: ToolbarVisibilityChangedEventArgs) => {
      if (
        toolbarVisibilityChangedEventArgs.data[0].id.toolbar === 'Demo' &&
        toolbarVisibilityChangedEventArgs.data[0].id.visibility == 'Visible'
      ) {
        let toolbarContents: any = (
          <div style={{ display: 'flex' }}>
            <button onClick={onTestRenderClicked} style={{ marginRight: '3px' }}>
              Render Test
            </button>
          </div>
        );

        ReactDOM.render(
          toolbarContents,
          blotterApi.dashboardApi.getCustomToolbarContentsDiv('Demo')
        );
      }
    }
  );
}

function onTestRenderClicked() {
  alert('Ive been clicked');
}

function listenToColumnStateChange(columnChangedArgs: ColumnStateChangedEventArgs) {
  console.log('column state changed received');
  console.log(columnChangedArgs.data[0].id.currentLayout);
}

function listenToSearchChange(searchChangedArgs: SearchChangedEventArgs) {
  console.log('search changed event received');
  console.log(searchChangedArgs.data[0].id);
}

function listenToAlertFired(alertFiredArgs: AlertFiredEventArgs) {
  const alertFiredInfo: AlertFiredInfo = alertFiredArgs.data[0].id;
  const triggeredAlert: AdaptableAlert = alertFiredInfo.alert;
  console.log('alert fired event received');
  console.log(alertFiredArgs.data[0].id.alert);
}

function listenToActionColumnClicked(actionColumnEventArgs: ActionColumnClickedEventArgs) {
  console.log('action fired event received');
  console.log(actionColumnEventArgs);
}
function listenToSelectionChanged(selectionChangedEventArgs: SelectionChangedEventArgs) {
  console.log('selection changed event received');
  console.log(selectionChangedEventArgs);
}
function listenToThemeChanged(themeChangedEventArgs: ThemeChangedEventArgs) {
  console.log('theme changed event received');
  console.log(themeChangedEventArgs);
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Theme', 'Export', 'Layout', 'Demo'],
    AvailableToolbars: ['Theme', 'Export', 'Layout', 'AdvancedSearch', 'SmartEdit'],
    CustomToolbars: [
      {
        Name: 'Demo',
        Title: 'Demo',
        ToolbarButtons: [
          {
            Name: 'btnTestEvent',
            Caption: 'State Test',
            ButtonStyle: {
              Variant: 'text',
              Tone: 'info',
            },
          },
        ],
      },
    ],
  },

  ActionColumn: {
    ActionColumns: [
      {
        ColumnId: 'Minus',
        ButtonText: '-',
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
