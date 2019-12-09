import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';
import './index.css';

import { GridOptions } from 'ag-grid-community';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import {
  AdaptableBlotterOptions,
  PredefinedConfig,
  BlotterApi,
} from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { TickingDataHelper } from '../../TickingDataHelper';

var blotterApi: BlotterApi;

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 15;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const tickingDataHelper = new TickingDataHelper();

  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  // console.log(tradeData);
  const adaptableBlotterOptions: AdaptableBlotterOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    blotterId: 'Updated Rows Demo',

    vendorGrid: gridOptions,
    predefinedConfig: demoConfig,
  };

  adaptableBlotterOptions.filterOptions = {
    autoApplyFilter: false,
  };

  blotterApi = AdaptableBlotter.init(adaptableBlotterOptions);

  tickingDataHelper.startTickingDataagGridTradesUpdateData(
    gridOptions,
    blotterApi,
    3000,
    tradeCount
  );

  blotterApi.eventApi.on('ApplicationToolbarButtonClicked', () => {
    blotterApi.updatedRowApi.deleteAllUpdatedRowInfo();
  });
}

let demoConfig: PredefinedConfig = {
  /*
  UpdatedRow: {
    EnableUpdatedRow: true,
    JumpToRow: true,
    UpColor: '#32CD32', // lime green
    DownColor: '#FFA500', // orange
    NeutralColor: '#FFFF00', // yellow
    MaxUpdatedRowsInStore: 2,
  },
  */
};

export default () => {
  useEffect(() => {
    if (!process.browser) {
      return;
    }

    InitAdaptableBlotter();
  }, []);

  return null;
};
