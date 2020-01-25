import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import { GridOptions, RowNode } from '@ag-grid-community/all-modules';
import {
  AdaptableOptions,
  PredefinedConfig,
  AdaptableApi,
  SearchChangedEventArgs,
} from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';

import Adaptable from '../../../../agGrid';
import { AdaptableReadyInfo } from '../../../../src/Api/Events/AdaptableReady';

var api: AdaptableApi;

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 500;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  gridOptions.groupIncludeFooter = true;
  gridOptions.groupIncludeTotalFooter = true;
  gridOptions.suppressAggFuncInHeader = true;
  const runReadyFunction: boolean = true;

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Basic Demo',

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
      let tradeRow = tradeData[5];
      gridOptions.api!.setPinnedTopRowData([tradeRow]);

      // to see which is the pinned row then do...
      let pinnedRowNode: RowNode = gridOptions.api!.getPinnedTopRow(0);
      console.log('in readys');
      // var pinnedData = event.api.getPinnedTopRow(0);

      //   setTimeout(() => {
      //     pinnedRowNode.updateData({
      //       tradeId: '33333',
      //       notional: Math.floor(Math.random() * 1000),
      //     });
      //   }, 2000);
    });
  }

  api.eventApi.on('SearchChanged', (searchChangedArgs: SearchChangedEventArgs) => {
    //  console.log('search changed');
    //  console.log(searchChangedArgs.data[0].id);
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
  SystemStatus: {
    // ShowAlert: false,
    DefaultStatusMessage: 'This is default message and its quite long',
    DefaultStatusType: 'Warning',
    StatusMessage: 'overriding with this',
    StatusType: 'Error',
  },

  ConditionalStyle: {
    ConditionalStyles: [
      {
        ConditionalStyleScope: 'Column', // 'DataType',
        ColumnId: 'moodysRating',
        // DataType: 'Number',
        Style: {
          BackColor: '#32cd32',
        },
        Expression: {
          FilterExpressions: [{ ColumnId: 'notional', Filters: ['Positive', 'Negative'] }],
        },
      },
    ],
  },

  Layout: {
    Layouts: [
      {
        ColumnSorts: [],
        Columns: ['moodysRating', 'tradeId', 'notional', 'counterparty', 'country'],
        Name: 'fixing a bug',
        // GroupedColumns: ['currency'],
        GroupedColumns: [],
      },
    ],
    //   CurrentLayout: 'fixing a bug',
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
