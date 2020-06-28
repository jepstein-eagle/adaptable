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
import masterDetailAgGridPlugin from '../../../../../plugins/master-detail-aggrid/src';

/*
Demo for checking alerts work
*/

async function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const gridOptions: GridOptions = examplesHelper.getMasterGridOptionsFTSE(200);

  const adaptableOptions: AdaptableOptions = examplesHelper.createAdaptableOptionsFtse(
    gridOptions,
    'master detail demo'
  );

  adaptableOptions.plugins = [
    masterDetailAgGridPlugin({
      detailAdaptableOptions: {
        primaryKey: 'volume',
        predefinedConfig: {},
      },
      onDetailInit(detailApi) {
        console.log('detail instance created', detailApi);
        detailApi.eventApi.on('AdaptableReady', () => console.log('ready'));
      },
    }),
  ];

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
