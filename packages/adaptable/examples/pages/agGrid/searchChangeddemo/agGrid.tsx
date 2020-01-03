import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-blue.css';
import Adaptable from '../../../../src/agGrid';
import '../../../../src/index.scss';

import {
  IAdaptable,
  AdaptableOptions,
  SearchChangedEventArgs,
  AdaptableApi,
} from '../../../../src/types';
import { GridOptions } from 'ag-grid-community';
import { ExamplesHelper } from '../../ExamplesHelper';

var adaptableApi: AdaptableApi;

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(500);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    vendorGrid: gridOptions,
    primaryKey: 'tradeId',
    userName: 'demo user',
    adaptableId: 'audit demo',
  };

  adaptableApi = Adaptable.init(adaptableOptions);

  adaptableApi.eventApi
    .onSearchChanged()
    .Subscribe((sender, searchChangedArgs) => listenToSearchChangedEvent(searchChangedArgs));
}

function listenToSearchChangedEvent(searchChangedArgs: SearchChangedEventArgs) {
  console.log('search changed event received');
  console.log(searchChangedArgs);
}

export default () => {
  useEffect(() => {
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableDemo();
  }, []);

  return null;
};
