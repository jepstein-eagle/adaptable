import React, { useEffect } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Adaptable from '../../../../App_Scripts/agGrid';
import '../../../../App_Scripts/index.scss';
import { GridOptions } from 'ag-grid-community';
import { AdaptableOptions } from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();

  // first blotter
  const tradeData1: any = examplesHelper.getTrades(500);
  const gridOptions1: GridOptions = examplesHelper.getGridOptionsTrade(tradeData1);
  const adaptableOptions1: AdaptableOptions = examplesHelper.createAdaptableOptionsTrade(
    gridOptions1,
    'grid1'
  );
  adaptableOptions1.containerOptions = {
    adaptableBlotterContainer: 'adaptableBlotter1',
    vendorContainer: 'grid1',
  };
  const api1 = Adaptable.init(adaptableOptions1);

  // second blotter
  const tradeData2: any = examplesHelper.getTrades(500);
  const gridOptions2: GridOptions = examplesHelper.getGridOptionsTrade(tradeData2);
  const adaptableOptions2: AdaptableOptions = examplesHelper.createAdaptableOptionsTrade(
    gridOptions2, //
    'grid2'
  );
  adaptableOptions2.containerOptions = {
    adaptableBlotterContainer: 'adaptableBlotter2',
    vendorContainer: 'grid2',
  };
  const api2 = Adaptable.init(adaptableOptions2);
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
