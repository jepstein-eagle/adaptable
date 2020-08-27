import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';

import Adaptable from '../../../../src/agGrid';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';

import {
  AdaptableOptions,
  AlertFiredEventArgs,
  ColumnStateChangedEventArgs,
  SearchChangedEventArgs,
  PredefinedConfig,
  AdaptableApi,
  ToolbarButtonClickedEventArgs,
  ThemeChangedEventArgs,
  ActionColumnClickedEventArgs,
  SelectionChangedEventArgs,
  ToolbarVisibilityChangedEventArgs,
} from '../../../../src/types';
import { GridOptions } from '@ag-grid-community/all-modules';
import { ExamplesHelper } from '../../ExamplesHelper';

import ReactDOM from 'react-dom';
import { AlertFiredInfo } from '../../../../src/Api/Events/AlertFired';
import { AdaptableAlert } from '../../../../src/Utilities/Interface/IMessage';
import { ActionColumnClickedInfo } from '../../../../src/Api/Events/ActionColumnClicked';

var adaptableApi: AdaptableApi;

/*
This example runs all the events we fire.
It tests both the 'old' event syntax and the new one with an option to switch between them.
Goign forward, new events wil ONLY use the new syntax.
*/

async function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(500);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = examplesHelper.createAdaptableOptionsTrade(
    gridOptions,
    'event handling demo'
  );
  adaptableOptions.searchOptions = {
    serverSearchOption: 'AllSearchandSort',
  };
  adaptableOptions.predefinedConfig = demoConfig;
  adaptableApi = await Adaptable.init(adaptableOptions);

  // new way
  adaptableApi.eventApi.on('ThemeChanged', (themeChangedEventArgs: ThemeChangedEventArgs) => {
    listenToThemeChanged(themeChangedEventArgs);
  });
  adaptableApi.eventApi.on(
    'ColumnStateChanged',
    (columnStateChangedEventArgs: ColumnStateChangedEventArgs) => {
      listenToColumnStateChange(columnStateChangedEventArgs);
    }
  );
  adaptableApi.eventApi.on('AlertFired', (alertFiredArgs: AlertFiredEventArgs) => {
    listenToAlertFired(alertFiredArgs);
  });
  adaptableApi.eventApi.on('SearchChanged', (searchChangedArgs: SearchChangedEventArgs) => {
    listenToSearchChange(searchChangedArgs);
  });
  adaptableApi.eventApi.on(
    'ActionColumnClicked',
    (actionColumnEventArgs: ActionColumnClickedEventArgs) => {
      listenToActionColumnClicked(actionColumnEventArgs);
    }
  );
  adaptableApi.eventApi.on(
    'SelectionChanged',
    (selectionChangedEventArgs: SelectionChangedEventArgs) => {
      listenToSelectionChanged(selectionChangedEventArgs);
    }
  );

  adaptableApi.eventApi.on(
    'ToolbarButtonClicked',
    (toolbarButtonClickedEventArgs: ToolbarButtonClickedEventArgs) => {
      console.log(' Toolbar Button Clicked');
      console.log('name: ' + toolbarButtonClickedEventArgs.data[0].id.toolbarButton.Name);
      console.log('caption: ' + toolbarButtonClickedEventArgs.data[0].id.toolbarButton.Caption);
    }
  );

  adaptableApi.eventApi.on(
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
          adaptableApi.dashboardApi.getCustomToolbarContentsDiv('Demo')
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

function listenToActionColumnClicked(args: ActionColumnClickedEventArgs) {
  const actionColumnClickedInfo: ActionColumnClickedInfo = args.data[0].id;
  const rowData: any = actionColumnClickedInfo.rowData;
  adaptableApi.gridApi.deleteGridData([rowData]);
  console.log('action fired event received');
  console.log(args);
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
    AvailableToolbars: ['Theme', 'Export', 'Layout', 'Query', 'SmartEdit'],
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
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableDemo();
  }, []);

  return null;
};
