import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../../../src/index.scss';
import '../../../../../../src/themes/dark.scss';
import './index.css';

import { GridOptions } from '@ag-grid-community/all-modules';
import {
  AdaptableOptions,
  PredefinedConfig,
  AdaptableApi,
  SearchChangedEventArgs,
} from '../../../../../../src/types';
import { ExamplesHelper } from '../../../../ExamplesHelper';
import Adaptable from '../../../../../../agGrid';
import finance from '../../../../../../../plugins/finance/src';

import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';

var api: AdaptableApi;

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 5000;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Basic Demo',

    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: demoConfig,
    plugins: [finance()],
    userFunctions: [
      {
        type: 'CellSummaryOperationFunction',
        name: 'OldestOperatioFunction',
        handler(operationParam) {
          let dateValues: Date[] = [];
          operationParam.selectedCellInfo.Columns.filter(c => c.DataType === 'Date').forEach(dc => {
            let gridCells = operationParam.selectedCellInfo.GridCells.filter(
              gc => gc.columnId == dc.ColumnId
            ).map(gc => gc.rawValue);
            dateValues.push(...gridCells);
          });
          if (dateValues.length > 0) {
            const sortedDates = dateValues.sort((a, b) => {
              return new Date(a).getTime() - new Date(b).getTime();
            });
            return new Date(sortedDates[0]).toLocaleDateString();
          }
        },
      },
    ],
  };

  adaptableOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };
  adaptableOptions.userInterfaceOptions = {
    showAdaptableToolPanel: true,
  };

  api = Adaptable.init(adaptableOptions);

  api.eventApi.on('SearchChanged', (searchChangedArgs: SearchChangedEventArgs) => {
    console.log('search changed');
    console.log(searchChangedArgs.data[0].id);
  });
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Layout', 'CellSummary', 'Export', 'SystemStatus'],
    MinimisedHomeToolbarButtonStyle: {
      Variant: 'text',
      Tone: 'success',
    }, //
  },
  CellSummary: {
    Revision: 3,
    CellSummaryOperationDefinitions: [
      {
        OperationName: 'TheOldest',
        OperationFunction: 'OldestOperatioFunction',
      },
    ],

    SummaryOperation: 'Min',
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

  Layout: {
    Layouts: [
      {
        ColumnSorts: [],
        Columns: ['tradeId', 'notional', 'counterparty', 'country'],
        Name: 'fixing a bug',
        // GroupedColumns: ['currency'],
        GroupedColumns: [],
      },
    ],
    //  CurrentLayout: 'fixing a bug',
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
