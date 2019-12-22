import React, { useEffect } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import '../../../../App_Scripts/index.scss';
import { GridOptions } from 'ag-grid-community';
import { AdaptableBlotterOptions } from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();

  // first blotter
  const tradeData1: any = examplesHelper.getTrades(500);
  const gridOptions1: GridOptions = examplesHelper.getGridOptionsTrade(tradeData1);
  const adaptableBlotterOptions1: AdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsTrade(
    gridOptions1,
    'grid1'
  );
  adaptableBlotterOptions1.containerOptions = {
    adaptableBlotterContainer: 'adaptableBlotter1',
    vendorContainer: 'grid1',
  };
  const api1 = AdaptableBlotter.init(adaptableBlotterOptions1);

  // second blotter
  const tradeData2: any = examplesHelper.getTrades(500);
  const gridOptions2: GridOptions = examplesHelper.getGridOptionsTrade(tradeData2);
  const adaptableBlotterOptions2: AdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsTrade(
    gridOptions2, //
    'grid2'
  );
  adaptableBlotterOptions2.containerOptions = {
    adaptableBlotterContainer: 'adaptableBlotter2',
    vendorContainer: 'grid2',
  };
  const api2 = AdaptableBlotter.init(adaptableBlotterOptions2);
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
