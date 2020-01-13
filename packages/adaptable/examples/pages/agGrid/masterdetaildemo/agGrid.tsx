import React, { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';

import '../../../../src/index.scss';

import '../../../../src/themes/dark.scss';

import { GridOptions } from '@ag-grid-community/all-modules';
import { LicenseManager } from 'ag-grid-enterprise';
import Adaptable from '../../../../src/agGrid';
import { AdaptableOptions } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';

/*
Demo for checking alerts work
*/

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const gridOptions: GridOptions = examplesHelper.getMasterGridOptionsFTSE(200);
  // gridOptions.rowSelection = 'multiple';
  const adaptableOptions: AdaptableOptions = examplesHelper.createAdaptableOptionsFtse(
    gridOptions,
    'master detail demo'
  );

  const adaptableApi = Adaptable.init(adaptableOptions);
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
