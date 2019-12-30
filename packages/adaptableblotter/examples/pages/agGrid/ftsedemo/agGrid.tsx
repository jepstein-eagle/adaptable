import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import Adaptable from '../../../../App_Scripts/agGrid';

import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';

import { AdaptableOptions } from '../../../../App_Scripts/types';
import { GridOptions } from 'ag-grid-community';
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
