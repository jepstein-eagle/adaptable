import React, { useEffect } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Adaptable from '../../../../App_Scripts/agGrid';
import '../../../../App_Scripts/index.scss';

import { GridOptions, Grid } from 'ag-grid-community';
import { AdaptableOptions } from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(500);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  // creating ag-Grid ourselves
  const gridcontainer: HTMLElement = document.getElementById('grid') as HTMLElement;
  gridcontainer.innerHTML = '';
  const grid = new Grid(gridcontainer, gridOptions);

  const adaptableOptions: AdaptableOptions = examplesHelper.createAdaptableOptionsTrade(
    gridOptions,
    'instantiate demo'
  );
  const adaptableApi = Adaptable.init(adaptableOptions);
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
