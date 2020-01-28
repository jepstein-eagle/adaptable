import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import { GridOptions } from '@ag-grid-community/all-modules';
import { AdaptableOptions, PredefinedConfig, AdaptableApi } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import Adaptable from '../../../../agGrid';
import { AdaptableColumn } from '../../../../src/PredefinedConfig/Common/AdaptableColumn';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';
import { TickingDataHelper } from '../../TickingDataHelper';

var adaptableApi: AdaptableApi;

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 100000;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const tickingDataHelper = new TickingDataHelper();
  const useTickingData: boolean = true;

  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  gridOptions.statusBar = {
    statusPanels: [
      { statusPanel: 'agTotalRowCountComponent', align: 'left' },
      { statusPanel: 'agFilteredRowCountComponent' },
      // { statusPanel: 'agSelectedRowCountComponent' },
      //  { statusPanel: 'agAggregationComponent' },
    ],
  };
  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Quick Search Demo',
    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: demoConfig,
  };

  adaptableOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };
  adaptableOptions.filterOptions = {
    filterActionOnExternalDataChange: {
      RunFilter: 'Throttle',
      ThrottleDelay: 5000,
    },
  };

  adaptableApi = Adaptable.init(adaptableOptions);

  adaptableApi.eventApi.on('AdaptableReady', ({ vendorGrid: gridOptions }) => {
    if (useTickingData) {
      tickingDataHelper.useTickingDataagGrid(gridOptions, adaptableApi, 1000, 50);
    }
  });

  adaptableOptions.searchOptions = {
    excludeColumnFromQuickSearch: (column: AdaptableColumn) => {
      if (column.ColumnId === 'country' || column.ReadOnly) {
        return true;
      }
      return false;
    },
  };
}

let demoConfig: PredefinedConfig = {};

export default () => {
  useEffect(() => {
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableDemo();
  }, []);

  return null;
};
