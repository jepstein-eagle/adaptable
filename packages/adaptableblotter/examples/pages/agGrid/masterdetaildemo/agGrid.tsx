import React, { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../App_Scripts/index.scss';

import '../../../../App_Scripts/themes/dark.scss';

import { GridOptions } from 'ag-grid-community';
import { LicenseManager } from 'ag-grid-enterprise';
import Adaptable from '../../../../App_Scripts/agGrid';
import { AdaptableOptions } from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';

/*
Demo for checking alerts work
*/

function InitAdaptableBlotter() {
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
    if (!process.browser) {
      return;
    }

    InitAdaptableBlotter();
  }, []);

  return null;
};
