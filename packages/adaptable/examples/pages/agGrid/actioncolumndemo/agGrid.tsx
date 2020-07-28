import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';
import Adaptable from '../../../../src/agGrid';
import '../../../../src/index.scss';

import {
  AdaptableOptions,
  PredefinedConfig,
  ActionColumnClickedEventArgs,
  AdaptableApi,
} from '../../../../src/types';
import { GridOptions } from '@ag-grid-community/all-modules';
import { ExamplesHelper } from '../../ExamplesHelper';

var adaptableApi: AdaptableApi;

async function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();

  const tradeData: any = examplesHelper.getTrades(300);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Action Column Demo',
    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: demoConfig,
    auditOptions: {
      alertShowAsPopup: true,
      auditFunctionEvents: {
        //  auditAsEvent: true,
        auditToConsole: true,
      },
    },
    userFunctions: [
      {
        type: 'ActionColumnRenderFunction',
        name: 'action',
        handler(params) {
          let data: number = params.rowData.notional;
          return data > 50
            ? '<button class="doublebutton">Double</button>'
            : '<button class="treblebutton">Treble</button>';
        },
      },
      {
        type: 'ActionColumnShouldRenderPredicate',
        name: 'action',
        handler(params) {
          return params.rowData.counterparty != 'BAML';
        },
      },
    ],
  };

  adaptableOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };

  adaptableApi = await Adaptable.init(adaptableOptions);
  adaptableApi.eventApi.on(
    'ActionColumnClicked',
    (actionColumnEventArgs: ActionColumnClickedEventArgs) => {
      listenToActionColumnClicked(actionColumnEventArgs);
    }
  );
}

function listenToActionColumnClicked(actionColumnEventArgs: ActionColumnClickedEventArgs) {
  console.log('hello');

  console.log(actionColumnEventArgs);

  console.log('alert fired event received');
  console.log(actionColumnEventArgs.data[0].id.actionColumn.FriendlyName);
  console.log(actionColumnEventArgs.data[0].id.actionColumn.ButtonText);

  let rowData = actionColumnEventArgs.data[0].id.rowData;
  let multiplier: number = rowData.notional > 100 ? 2 : 3;
  let newNotional = rowData.notional * multiplier;
  console.log('newNotional', newNotional);

  // adaptableApi.gridApi.setCellValue(rowData.tradeId, 'notional', newNotional, false);
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Theme', 'Layout'],
  },
  Entitlements: {
    FunctionEntitlements: [
      {
        FunctionName: 'ActionColumn',
        AccessLevel: 'Hidden',
      },
    ],
  },
  ActionColumn: {
    ActionColumns: [
      {
        ColumnId: 'Action',
        ButtonText: 'Click',
        ShouldRenderPredicate: 'action',
        RenderFunction: 'action',
      },
      {
        ColumnId: 'Plus',
        FriendlyName: 'Adding',
        ButtonText: '+',
      },
      {
        ColumnId: 'Minus',
        ButtonText: '-',
      },
      {
        ColumnId: 'Test1',
        ButtonText: 'Test 1',
      },
      {
        ColumnId: 'Test2',
        ButtonText: 'Test 2',
      },
      {
        ColumnId: 'Test3',
        ButtonText: 'Test 3',
      },
    ],
  },
  Layout: {
    Layouts: [
      {
        ColumnSorts: [],
        Columns: [
          'tradeId',
          'Triple Notional',
          'notional',
          'Test1',
          'Test2',
          'Test3',
          'Action',
          'Plus',
          'Minus',
        ],
        Name: 'With Button',
      },
    ],
    CurrentLayout: 'With Button',
  },
  CalculatedColumn: {
    CalculatedColumns: [
      {
        ColumnExpression: "Col('notional') * 3",
        ColumnId: 'Triple Notional',
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
