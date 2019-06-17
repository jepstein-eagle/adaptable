import React, { useEffect } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import '../../../../App_Scripts/base.scss';
import '../../../../App_Scripts/themes/light.scss';
import { GridOptions, Grid } from 'ag-grid-community';
import { AdaptableBlotterOptions } from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';

/*
Similar to the Basic demo that just tests that we can create an agGrid and an Adaptable Blotter working together
No JSON or anything complicated
Note: we DO create the grid ourselves - and instead its done in the Blotter code
*/

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();

  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(500);

  // creating ag-Grid ourselves
  const gridcontainer: HTMLElement = document.getElementById('grid') as HTMLElement;
  gridcontainer.innerHTML = '';
  const grid = new Grid(gridcontainer, gridOptions);

  const adaptableBlotterOptions: AdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsTrade(
    gridOptions,
    'instantiate demo'
  );
  const adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);
  examplesHelper.autoSizeDefaultLayoutColumns(adaptableblotter, gridOptions);
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
