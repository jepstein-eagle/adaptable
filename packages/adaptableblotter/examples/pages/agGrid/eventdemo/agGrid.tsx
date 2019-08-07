import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import '../../../../App_Scripts/index.scss';
import {
  IAdaptableBlotter,
  AdaptableBlotterOptions,
  AlertFiredEventArgs,
  ColumnStateChangedEventArgs,
  SearchChangedEventArgs,
} from '../../../../App_Scripts/types';
import { GridOptions } from 'ag-grid-community';
import { ExamplesHelper } from '../../ExamplesHelper';
import {
  ActionColumnClickedEventArgs,
  SelectionChangedEventArgs,
} from '../../../../App_Scripts/Api/Events/BlotterEvents';

var adaptableblotter: IAdaptableBlotter;

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(500);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableBlotterOptions: AdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsTrade(
    gridOptions,
    'state listen demo'
  );

  adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);

  adaptableblotter.api.eventApi
    .onColumnStateChanged()
    .Subscribe((sender, columnChangedArgs) => listenToColumnStateChange(columnChangedArgs));
  adaptableblotter.api.eventApi
    .onAlertFired()
    .Subscribe((sender, alertFiredArgs) => listenToAlertFired(alertFiredArgs));
  adaptableblotter.api.eventApi
    .onSearchChanged()
    .Subscribe((sender, searchChangedArgs) => listenToSearchChange(searchChangedArgs));
  adaptableblotter.api.eventApi
    .onActionColumnClicked()
    .Subscribe((sender, actionColumnEventArgs) =>
      listenToActionColumnClicked(actionColumnEventArgs)
    );
  adaptableblotter.api.eventApi
    .onSelectionChanged()
    .Subscribe((sender, selectionChangedEventArgs) =>
      listenToSelectionChanged(selectionChangedEventArgs)
    );
  examplesHelper.autoSizeDefaultLayoutColumns(adaptableblotter, gridOptions);
}

function listenToColumnStateChange(columnChangedArgs: ColumnStateChangedEventArgs) {
  console.log('column event received');
  console.log(columnChangedArgs.currentLayout);
}

function listenToSearchChange(searchChangedArgs: SearchChangedEventArgs) {
  console.log('search changed event received');
  console.log(searchChangedArgs.data[0].id);
}

function listenToAlertFired(alertFiredArgs: AlertFiredEventArgs) {
  console.log('alert fired event received');
  console.log(alertFiredArgs.alert);
}

function listenToActionColumnClicked(actionColumnEventArgs: ActionColumnClickedEventArgs) {
  console.log('alert fired event received');
  console.log(actionColumnEventArgs);
}
function listenToSelectionChanged(selectionChangedEventArgs: SelectionChangedEventArgs) {
  console.log('selection changed event received');
  console.log(selectionChangedEventArgs);
}

export default () => {
  useEffect(() => {
    if (!process.browser) {
      return;
    }

    InitAdaptableBlotter();
  }, []);

  return null;
};
