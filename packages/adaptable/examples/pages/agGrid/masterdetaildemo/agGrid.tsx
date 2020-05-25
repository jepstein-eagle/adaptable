import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';

import '../../../../src/index.scss';

import '../../../../src/themes/dark.scss';

import { GridOptions } from '@ag-grid-community/all-modules';
import { AdaptableOptions } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import Adaptable from '../../../../agGrid';
import { DetailCellRenderer } from '../../../../src/agGrid/DetailCellRenderer';

/*
Demo for checking alerts work
*/

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const gridOptions: GridOptions = examplesHelper.getMasterGridOptionsFTSE(200);

  const adaptableOptions: AdaptableOptions = examplesHelper.createAdaptableOptionsFtse(
    gridOptions,
    'master detail demo'
  );

  adaptableOptions.detailOptions = {
    primaryKey: 'volume',
    predefinedConfig: {},
  };

  // TODO move to plugin
  if (adaptableOptions.detailOptions) {
    adaptableOptions.vendorGrid.detailCellRenderer = 'adaptableDetailCellRenderer';
    adaptableOptions.vendorGrid.components = adaptableOptions.vendorGrid.components || {};
    adaptableOptions.vendorGrid.components.adaptableDetailCellRenderer = DetailCellRenderer;
  }

  Adaptable.init(adaptableOptions);
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
