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
} from '../../../../App_Scripts/types';
import { GridOptions } from 'ag-grid-community';
import { ExamplesHelper } from '../../ExamplesHelper';
import {
  ActionColumnClickedEventArgs,
  SelectionChangedEventArgs,
  ThemeChangedEventArgs,
  ApplicationToolbarButtonClickedEventArgs,
  ToolbarVisibilityChangedEventArgs,
} from '../../../../App_Scripts/Api/Events/BlotterEvents';
import ReactDOM from 'react-dom';

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

  let runNewEvents: boolean = true;

  if (!runNewEvents) {
    // old way
    blotterApi.eventApi
      .onThemeChanged()
      .Subscribe((sender, themeChangedEventArgs) => listenToThemeChanged(themeChangedEventArgs));
    blotterApi.eventApi
      .onColumnStateChanged()
      .Subscribe((sender, columnChangedArgs) => listenToColumnStateChange(columnChangedArgs));
    blotterApi.eventApi
      .onAlertFired()
      .Subscribe((sender, alertFiredArgs) => listenToAlertFired(alertFiredArgs));
    blotterApi.eventApi
      .onSearchChanged()
      .Subscribe((sender, searchChangedArgs) => listenToSearchChange(searchChangedArgs));
    blotterApi.eventApi
      .onActionColumnClicked()
      .Subscribe((sender, actionColumnEventArgs) =>
        listenToActionColumnClicked(actionColumnEventArgs)
      );
    blotterApi.eventApi
      .onSelectionChanged()
      .Subscribe((sender, selectionChangedEventArgs) =>
        listenToSelectionChanged(selectionChangedEventArgs)
      );
  } else {
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
      'ApplicationToolbarButtonClicked',
      (applicationToolbarButtonClickedEventArgs: ApplicationToolbarButtonClickedEventArgs) => {
        console.log('Application Toolbar Button Clicked');
        console.log(
          'name: ' +
            applicationToolbarButtonClickedEventArgs.data[0].id.applicationToolbarButton.Name
        );
        console.log(
          'caption: ' +
            applicationToolbarButtonClickedEventArgs.data[0].id.applicationToolbarButton.Caption
        );
      }
    );

    blotterApi.eventApi.on(
      'ToolbarVisibilityChanged',
      (toolbarVisibilityChangedEventArgs: ToolbarVisibilityChangedEventArgs) => {
        if (
          toolbarVisibilityChangedEventArgs.data[0].id.toolbar === 'Application' &&
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
            blotterApi.applicationApi.getApplicationToolbarContentsDiv()
          );
        }
      }
    );
  }
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
    VisibleToolbars: ['Theme', 'Export', 'Layout', 'Application'],
    AvailableToolbars: ['Theme', 'Export', 'Layout', 'Application', 'AdvancedSearch', 'SmartEdit'],
  },
  Application: {
    ApplicationToolbarButtons: [
      {
        Name: 'btnTestEvent',
        Caption: 'State Test',
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
