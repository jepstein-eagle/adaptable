import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';

import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import { GridOptions } from '@ag-grid-community/all-modules';
import Adaptable from '../../../../src/agGrid';
import { AdaptableOptions, PredefinedConfig, AdaptableApi } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { TickingDataHelper } from '../../TickingDataHelper';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';

var adaptableApi: AdaptableApi;

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 15;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const tickingDataHelper = new TickingDataHelper();

  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  // console.log(tradeData);
  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Updated Rows Demo',
    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },

    predefinedConfig: demoConfig,
  };

  adaptableOptions.filterOptions = {
    autoApplyFilter: false,
  };

  adaptableApi = Adaptable.init(adaptableOptions);

  tickingDataHelper.useTickingDataagGrid(gridOptions, adaptableApi, 3000, tradeCount);

  adaptableApi.eventApi.on('ToolbarButtonClicked', () => {
    adaptableApi.updatedRowApi.deleteAllUpdatedRowInfo();
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
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableDemo();
  }, []);

  return null;
};
