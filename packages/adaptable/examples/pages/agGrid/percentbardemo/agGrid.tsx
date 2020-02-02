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
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';
import Adaptable from '../../../../agGrid';
import { AdaptableReadyInfo } from '../../../../src/Api/Events/AdaptableReady';

var api: AdaptableApi;

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 100;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Percent Bar Demo',

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

  api.eventApi.on('AdaptableReady', (info: AdaptableReadyInfo) => {
    // to see which is the pinned row then do...
    //  let pinnedRowNode: RowNode = gridOptions.api!.getPinnedTopRow(0);
  });
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Layout', 'Export', 'SystemStatus'],
    MinimisedHomeToolbarButtonStyle: {
      Variant: 'text',
      Tone: 'success',
    }, //
  },
  ToolPanel: {
    VisibleToolPanels: ['Export', 'Layout', 'SystemStatus', 'ColumnFilter'],
  },

  PercentBar: {
    PercentBars: [
      {
        ColumnId: 'notional',
        PositiveValue: 100,
        //  MinValue: 0,
        PositiveColor: '#FFCCE5',
        ShowValue: true,
      },
      {
        ColumnId: 'changeOnYear',
        NegativeValue: -200,
        PositiveValue: 200,
        PositiveColor: '#3333FF',
        NegativeColor: '#FFFF33',
        ShowValue: true,
      },
    ],
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
