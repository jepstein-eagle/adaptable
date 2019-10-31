import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';
import './index.css';

import { GridOptions } from 'ag-grid-community';
import { LicenseManager } from 'ag-grid-enterprise';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import {
  AdaptableBlotterOptions,
  PredefinedConfig,
  IAdaptableBlotter,
} from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { TickingDataHelper } from '../../TickingDataHelper';

LicenseManager.setLicenseKey(process.env.ENTERPRISE_LICENSE!);
var adaptableblotter: IAdaptableBlotter;

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(30);
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

  adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);

  examplesHelper.autoSizeDefaultLayoutColumns(adaptableblotter, gridOptions);

  tickingDataHelper.startTickingDataagGridThroughRowData(adaptableblotter, tradeData, 5000);

  //  adaptableblotter.api.systemStatusApi.setSuccessSystemStatus('ouch');
  // global.adaptableblotter = adaptableblotter;
}

let demoConfig: PredefinedConfig = {
  UpdatedRow: {
    EnableUpdatedRow: true,
    JumpToRow: true,
    UpColor: '#32CD32', // lime green
    DownColor: '#FFA500', // orange
    NeutralColor: '#FFFF00', // yellow
  },
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
