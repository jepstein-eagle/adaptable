import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import { GridOptions } from '@ag-grid-community/all-modules';
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

async function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 100;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Basic Demo',

    vendorGrid: {
      ...gridOptions,
      rowModelType: 'serverSide',
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
  adaptableOptions.filterOptions = {
    clearFiltersOnStartUp: true,
  };
  adaptableOptions.searchOptions = {
    clearSearchesOnStartUp: true,
  };

  api = await Adaptable.init(adaptableOptions);

  const TOTAL_COUNT = 100;
  // create ServerSideDatasource with a reference to your server
  class ServerSideDatasource {
    getRows(params: any) {
      console.log(params);

      let rows = examplesHelper.getTradesRange(
        params.request.startRow,
        params.request.endRow - params.request.startRow
      );
      if (params.request.sortInfo) {
        // rows.sort
      }
      var lastRow = TOTAL_COUNT <= params.endRow ? TOTAL_COUNT : -1;

      console.log(rows);
      params.successCallback(rows, lastRow);
    }
  }

  // register Server-side Datasource with the grid

  var datasource = new ServerSideDatasource();

  api.eventApi.on('AdaptableReady', (info: AdaptableReadyInfo) => {
    info.vendorGrid.api.setServerSideDatasource(datasource);
    // to see which is the pinned row then do...
    //  let pinnedRowNode: RowNode = gridOptions.api!.getPinnedTopRow(0);
  });

  api.eventApi.on('SearchChanged', (searchChangedArgs: SearchChangedEventArgs) => {
    console.log('search changed');
    console.log(searchChangedArgs.data[0].id);
  });
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['QuickSearch', 'Layout', 'SystemStatus'],
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
    DefaultStatusType: 'Success',
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
        Name: 'design-time layout',
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
