import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';

import Adaptable from '../../../../src/agGrid';

import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';

import { AdaptableOptions } from '../../../../src/types';
import { GridOptions } from '@ag-grid-community/all-modules';
import { ExamplesHelper } from '../../ExamplesHelper';

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const gridOptions: GridOptions = examplesHelper.getGridOptionsFTSE(50);
  const adaptableOptions: AdaptableOptions = examplesHelper.createAdaptableOptionsFtse(
    gridOptions,
    'ftse demo'
  );
  const api = Adaptable.init(adaptableOptions);
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
