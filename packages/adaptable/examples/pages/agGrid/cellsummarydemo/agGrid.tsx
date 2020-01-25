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
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SideBarModule } from '@ag-grid-enterprise/side-bar';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';

import Adaptable from '../../../../agGrid';
import { AdaptableReadyInfo } from '../../../../src/Api/Events/AdaptableReady';
import { SelectedCellInfo } from '../../../../src/Utilities/Interface/Selection/SelectedCellInfo';
import { AdaptableColumn } from '../../../../src/PredefinedConfig/Common/AdaptableColumn';
import { DataType } from '../../../../src/PredefinedConfig/Common/Enums';
import { GridCell } from '../../../../src/Utilities/Interface/Selection/GridCell';

var api: AdaptableApi;

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 100;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Cell Summary Demo',
    //  plugins: [finance()],
    vendorGrid: {
      ...gridOptions,
      modules: [AllEnterpriseModules],
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
    // to set a pinned row (in this case the 5th row in our data source)
    //  let gridOptions: GridOptions = info.vendorGrid as GridOptions;
    //  let tradeRow = tradeData[5];
    //  gridOptions.api!.setPinnedTopRowData([tradeRow]);
    // to see which is the pinned row then do...
    //  let pinnedRowNode: RowNode = gridOptions.api!.getPinnedTopRow(0);
  });

  api.eventApi.on('SearchChanged', (searchChangedArgs: SearchChangedEventArgs) => {
    //  console.log('search changed');
    //  console.log(searchChangedArgs.data[0].id);
  });
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Layout', 'Export', 'CellSummary'],
    MinimisedHomeToolbarButtonStyle: {
      Variant: 'text',
      Tone: 'success',
    }, //
  },
  ToolPanel: {
    VisibleToolPanels: ['Export', 'Layout', 'CellSummary', 'ColumnFilter'],
  },
  CellSummary: {
    CellSummaryOperationDefinitions: [
      {
        OperationName: 'Oldest',
        OperationFunction: (operationParam: {
          selectedCellInfo: SelectedCellInfo;
          allValues: any[];
          numericColumns: string[];
          numericValues: number[];
          distinctCount: number;
        }) => {
          let dateValues: Date[] = [];
          operationParam.selectedCellInfo.Columns.filter(c => c.DataType === DataType.Date).forEach(
            dc => {
              let gridCells = operationParam.selectedCellInfo.GridCells.filter(
                gc => gc.columnId == dc.ColumnId
              ).map(gc => gc.rawValue);
              dateValues.push(...gridCells);
            }
          );
          if (dateValues.length > 0) {
            return dateValues
              .sort((a, b) => {
                return a.getTime() - b.getTime();
              })[0]
              .toLocaleDateString();
          }
        },
      },
    ],
    //   SummaryOperation: 'Min',
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
