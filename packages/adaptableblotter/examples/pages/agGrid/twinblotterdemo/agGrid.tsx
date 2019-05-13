import React, { useEffect } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import '../../../../App_Scripts/base.scss';
import '../../../../App_Scripts/themes/light.scss';
import { GridOptions } from 'ag-grid-community';
import { IAdaptableBlotterOptions, IAdaptableBlotter } from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { IStateChangedEventArgs } from '../../../../App_Scripts/Utilities/Interface/StateChanged/IStateChangedEventArgs';
import { StateChangedTrigger } from '../../../../App_Scripts/Utilities/Enums';
import {
  QuickSearchState,
  AdvancedSearchState,
} from '../../../../App_Scripts/Redux/ActionsReducers/Interface/IState';

var adaptableblotter1: IAdaptableBlotter;
var adaptableblotter2: IAdaptableBlotter;

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();

  // first blotter
  const gridOptions1: GridOptions = examplesHelper.getGridOptionsTrade(500);
  const adaptableBlotterOptions1: IAdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsTrade(
    gridOptions1,
    'grid1'
  );
  adaptableBlotterOptions1.containerOptions = {
    adaptableBlotterContainer: 'adaptableBlotter1',
    vendorContainer: 'grid1',
  };
  adaptableblotter1 = new AdaptableBlotter(adaptableBlotterOptions1);
  examplesHelper.autoSizeDefaultLayoutColumns(adaptableblotter1, gridOptions1);

  // second blotter
  const gridOptions2: GridOptions = examplesHelper.getGridOptionsTrade(500);
  const adaptableBlotterOptions2: IAdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsTrade(
    gridOptions2, //
    'grid2'
  );
  adaptableBlotterOptions2.containerOptions = {
    adaptableBlotterContainer: 'adaptableBlotter2',
    vendorContainer: 'grid2',
  };
  adaptableblotter2 = new AdaptableBlotter(adaptableBlotterOptions2);
  examplesHelper.autoSizeDefaultLayoutColumns(adaptableblotter2, gridOptions2);

  // adaptableblotter2.syncWithBlotter(adaptableblotter1);

  //  adaptableblotter1.api.eventApi
  //    .onStateChanged()
  //    .Subscribe((sender, stateChangedArgs) => listenToStateChangeBlotter1(stateChangedArgs));

  //   adaptableblotter2.api.eventApi
  //   .onStateChanged()
  //    .Subscribe((sender, stateChangedArgs) => listenToStateChangeBlotter2(stateChangedArgs));
}

function listenToStateChangeBlotter1(stateChangedArgs: IStateChangedEventArgs) {
  let stateChangedInfo = stateChangedArgs.data[0].id;

  if (stateChangedInfo.stateChangedTrigger == StateChangedTrigger.QuickSearch) {
    let quickSearchState: QuickSearchState = stateChangedInfo.userState as QuickSearchState;
    adaptableblotter2.api.quickSearchApi.setQuickSearchState(quickSearchState);
  }
  if (stateChangedInfo.stateChangedTrigger == StateChangedTrigger.AdvancedSearch) {
    let advancedSearhState: AdvancedSearchState = stateChangedInfo.userState as AdvancedSearchState;
    adaptableblotter2.api.advancedSearchApi.setAdvancedSearchState(advancedSearhState);
  }
}
function listenToStateChangeBlotter2(stateChangedArgs: IStateChangedEventArgs) {
  let stateChangedInfo = stateChangedArgs.data[0].id;

  if (stateChangedInfo.stateChangedTrigger == StateChangedTrigger.QuickSearch) {
    let quickSearchState: QuickSearchState = stateChangedInfo.userState as QuickSearchState;
    adaptableblotter1.api.quickSearchApi.setQuickSearchState(quickSearchState);
  }
  if (stateChangedInfo.stateChangedTrigger == StateChangedTrigger.AdvancedSearch) {
    let advancedSearhState: AdvancedSearchState = stateChangedInfo.userState as AdvancedSearchState;
    adaptableblotter1.api.advancedSearchApi.setAdvancedSearchState(advancedSearhState);
  }
}

let blotter1Json = {};
let blotter2Json = {};

export default () => {
  useEffect(() => {
    if (!process.browser) {
      return;
    }

    InitAdaptableBlotter();
  }, []);

  return null;
};
