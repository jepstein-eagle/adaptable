import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-blue.css';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import '../../../../App_Scripts/base.scss';
import '../../../../App_Scripts/themes/light.scss';

import {
  IAdaptableBlotter,
  AdaptableBlotterOptions,
  SearchChangedEventArgs,
} from '../../../../App_Scripts/types';
import { GridOptions } from 'ag-grid-community';
import { ExamplesHelper } from '../../ExamplesHelper';

var adaptableblotter: IAdaptableBlotter;

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();

  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(500);

  // creating blotter options here so we can add audit
  const adaptableBlotterOptions: AdaptableBlotterOptions = {
    vendorGrid: gridOptions,
    primaryKey: 'tradeId',
    userName: 'demo user',
    blotterId: 'audit demo',
    licenceKey: examplesHelper.getEnterpriseLicenceKey(),
  };

  adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);

  adaptableblotter.api.eventApi
    .onSearchedChanged()
    .Subscribe((sender, searchChangedArgs) => listenToSearchedChangedEvent(searchChangedArgs));

  examplesHelper.autoSizeDefaultLayoutColumns(adaptableblotter, gridOptions);
}

function listenToSearchedChangedEvent(searchChangedArgs: SearchChangedEventArgs) {
  console.log('searched changed event received');
  console.log(searchChangedArgs);
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
