import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import '../../../../App_Scripts/base.scss';
import '../../../../App_Scripts/themes/light.scss';
import {
  IAdaptableBlotter,
  AdaptableBlotterOptions,
  AlertFiredEventArgs,
  ColumnStateChangedEventArgs,
  SearchChangedEventArgs,
} from '../../../../App_Scripts/types';
import { GridOptions } from 'ag-grid-community';
import { ExamplesHelper } from '../../ExamplesHelper';

var adaptableblotter: IAdaptableBlotter;

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();

  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(500);

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

export default () => {
  useEffect(() => {
    if (!process.browser) {
      return;
    }

    InitAdaptableBlotter();
  }, []);

  return null;
};
