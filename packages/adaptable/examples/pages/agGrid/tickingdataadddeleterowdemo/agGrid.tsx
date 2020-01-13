import React, { useEffect } from 'react';

import Adaptable from '../../../../src/agGrid';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';

import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';

import { GridOptions } from '@ag-grid-community/all-modules';
import { AdaptableOptions, PredefinedConfig } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { TickingDataHelper } from '../../TickingDataHelper';

/*
Has pseudo ticking data together with some JSON that sets flashing in 3 columns
This uses the agGrid updateRowData method which does NOT call cell value changed
*/

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tickingDataHelper = new TickingDataHelper();
  let rowCount: number = 25;
  const tradeData: any = examplesHelper.getTrades(rowCount);

  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = examplesHelper.createAdaptableOptionsTrade(
    gridOptions,
    'ticking data add delete row'
  );
  adaptableOptions.predefinedConfig = json;
  const adaptableApi = Adaptable.init(adaptableOptions);

  // turn on mimicing adding rows
  tickingDataHelper.startTickingDataagGridAddRow(adaptableApi, tradeData, rowCount);
  // turn on mimicing removing rows
  tickingDataHelper.startTickingDataagGridDeleteRow(adaptableApi, tradeData, rowCount);
}

let json: PredefinedConfig = {};

export default () => {
  useEffect(() => {
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableDemo();
  }, []);

  return null;
};
