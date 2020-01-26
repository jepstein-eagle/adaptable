import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import {
  GridOptions,
  RowNode,
  IClientSideRowModel,
  ModelUpdatedEvent,
} from '@ag-grid-community/all-modules';
import { AdaptableOptions, PredefinedConfig, AdaptableApi } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';

import Adaptable from '../../../../agGrid';
import { AdaptableReadyInfo } from '../../../../src/Api/Events/AdaptableReady';

var api: AdaptableApi;

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 200;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  gridOptions.groupIncludeFooter = true;
  gridOptions.groupIncludeTotalFooter = true;
  gridOptions.suppressAggFuncInHeader = true;
  const runReadyFunction: boolean = true;

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Pinned Rows Demo',

    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: demoConfig,
  };

  adaptableOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };
  adaptableOptions.userInterfaceOptions = {
    showAdaptableToolPanel: true,
  };

  api = Adaptable.init(adaptableOptions);

  if (runReadyFunction) {
    api.eventApi.on('AdaptableReady', (info: AdaptableReadyInfo) => {
      // to set a pinned row (in this case the 5th row in our data source)
      let gridOptions: GridOptions = info.vendorGrid as GridOptions;

      gridOptions.onModelUpdated = (event: ModelUpdatedEvent) => {
        const pinnedData = event.api.getPinnedTopRow(0);
        const model = event.api.getModel() as IClientSideRowModel;
        const rootNode = model.getRootNode();
        if (!pinnedData) {
          event.api.setPinnedTopRowData([rootNode.aggData]);
        } else {
          pinnedData.updateData({
            tradeId: Math.floor(Math.random() * 100000),
            notional: Math.floor(Math.random() * 100),
          });
        }
      };

      setTimeout(() => {
        //    pinnedRowNode.updateData({
        //  tradeId: '33333',
        //   notional: Math.floor(Math.random() * 1000),
        //  });
      }, 5000);
    });
  }
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['CellSummary'],
  },
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
