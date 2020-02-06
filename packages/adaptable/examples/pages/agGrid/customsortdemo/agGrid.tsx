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
import Helper from '../../../../src/Utilities/Helpers/Helper';

var api: AdaptableApi;

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 100;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Custom Sort Demo',
    //  plugins: [finance()],
    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: demoConfig,
  };

  api = Adaptable.init(adaptableOptions);
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Layout', 'Export', 'CellSummary'],
  },
  CustomSort: {
    CustomSorts: [
      {
        ColumnId: 'country',
        CustomSortComparerFunction: (valueA: any, valueB: any, nodeA?: any, nodeB?: any) => {
          if (valueA === 'United Kingdom') {
            return -1;
          }
          if (valueB === 'United Kingdom') {
            return 1;
          }
          return nodeA.data.notional > nodeB.data.notional ? 1 : -1;
        },
      },
      {
        ColumnId: 'counterparty',
        SortedValues: ['Citi', 'Nat West'],
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
