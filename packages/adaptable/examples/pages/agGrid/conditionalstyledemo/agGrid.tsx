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

import Adaptable from '../../../../agGrid';
import { AdaptableReadyInfo } from '../../../../src/Api/Events/AdaptableReady';

var api: AdaptableApi;

async function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 20;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    // adaptableId: 'Condstyledemof Dafdfdsfdfdfdsfd Afdsfdsfdsfdsfdst Retertr etretretretre',
    adaptableId: 'Cond Style Demo',
    // adaptableId: 'ConditionalStyledemo',
    // adaptableId: 'ConditionalStyle',

    vendorGrid: {
      ...gridOptions,
      modules: [RangeSelectionModule, MenuModule, SideBarModule, RowGroupingModule],
    },
    predefinedConfig: demoConfig,
  };

  adaptableOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };
  adaptableOptions.userInterfaceOptions = {};

  api = await Adaptable.init(adaptableOptions);
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleButtons: ['ConditionalStyle'],
  },
  Query: {
    SharedQueries: [
      {
        Uuid: '123-456-789',
        Name: 'US Banks',
        Expression: '[counterparty] IN("BAML", "Citi", "JP Morgan", "Goldman Sachs")',
      },
    ],
  },

  ConditionalStyle: {
    ConditionalStyles: [
      {
        Scope: {
          All: true,
        },
        Style: {
          BackColor: '#ffffe0',
        },
        SharedQueryId: '123-456-789',
        ExcludeGroupedRows: false,
      },
      {
        Scope: {
          All: true,
        },
        Style: {
          ForeColor: '#008000',
        },
        Expression: '[changeOnYear] > 0',
      },
      {
        Scope: {
          All: true,
        },
        Style: {
          ForeColor: '#ff0000',
        },
        Expression: '[changeOnYear] < 0',
      },
      {
        Scope: {
          All: true,
        },
        Style: {
          BackColor: 'green',
          FontStyle: 'Italic',
          ForeColor: '#000000',
        },
        Expression: '[notional] > 1400',
      },
    ],
  },

  Layout: {
    //  CurrentLayout: 'Grouping Layout',
    Layouts: [
      {
        RowGroupedColumns: ['country'],
        Columns: ['notional', 'country', 'currency', 'tradeId', 'counterparty'],
        Name: 'Grouping Layout',
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
