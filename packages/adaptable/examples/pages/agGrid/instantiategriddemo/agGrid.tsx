import React, { useEffect } from 'react';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import Adaptable from '../../../../src/agGrid';
import '../../../../src/index.scss';

import { GridOptions, Grid } from '@ag-grid-community/all-modules';
import { AdaptableOptions } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';

async function InitAdaptableDemo() {
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
  const adaptableApi = await Adaptable.init(adaptableOptions);
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
