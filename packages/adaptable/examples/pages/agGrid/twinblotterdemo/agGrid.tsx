import React, { useEffect } from 'react';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import Adaptable from '../../../../src/agGrid';
import '../../../../src/index.scss';
import { GridOptions } from '@ag-grid-community/all-modules';
import { AdaptableOptions } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();

  // first grid
  const tradeData1: any = examplesHelper.getTrades(500);
  const gridOptions1: GridOptions = examplesHelper.getGridOptionsTrade(tradeData1);
  const adaptableOptions1: AdaptableOptions = examplesHelper.createAdaptableOptionsTrade(
    gridOptions1,
    'grid1'
  );
  adaptableOptions1.containerOptions = {
    adaptableContainer: 'adaptable1',
    vendorContainer: 'grid1',
  };
  const api1 = Adaptable.init(adaptableOptions1);

  // second grid
  const tradeData2: any = examplesHelper.getTrades(500);
  const gridOptions2: GridOptions = examplesHelper.getGridOptionsTrade(tradeData2);
  const adaptableOptions2: AdaptableOptions = examplesHelper.createAdaptableOptionsTrade(
    gridOptions2, //
    'grid2'
  );
  adaptableOptions2.containerOptions = {
    adaptableContainer: 'adaptable2',
    vendorContainer: 'grid2',
  };
  const api2 = Adaptable.init(adaptableOptions2);
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
