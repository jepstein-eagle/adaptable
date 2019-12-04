import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import '../../../../App_Scripts/index.scss';

import {
  IAdaptableBlotter,
  AdaptableBlotterOptions,
  PredefinedConfig,
} from '../../../../App_Scripts/types';
import { GridOptions } from 'ag-grid-community';
import { ExamplesHelper } from '../../ExamplesHelper';
import { ActionColumnClickedEventArgs } from '../../../../App_Scripts/Api/Events/BlotterEvents';

var adaptableblotter: IAdaptableBlotter;

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();

  const tradeData: any = examplesHelper.getTrades(300);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  // creating blotter options here so we can add audit
  const adaptableBlotterOptions: AdaptableBlotterOptions = {
    vendorGrid: gridOptions,
    primaryKey: 'tradeId',
    userName: 'demo user',
    blotterId: 'action column demo',
  };
  adaptableBlotterOptions.predefinedConfig = demoConfig;
  adaptableBlotterOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };

  // userFunctions

  adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);
  let runNewEvents: boolean = true;

  if (runNewEvents) {
    adaptableblotter.api.eventApi.on(
      'ActionColumnClicked',
      (actionColumnEventArgs: ActionColumnClickedEventArgs) => {
        listenToActionColumnClicked(actionColumnEventArgs);
      }
    );
  } else {
    adaptableblotter.api.eventApi
      .onActionColumnClicked()
      .Subscribe((sender, actionColumnEventArgs) =>
        listenToActionColumnClicked(actionColumnEventArgs)
      );
  }
}

function listenToActionColumnClicked(actionColumnEventArgs: ActionColumnClickedEventArgs) {
  console.log('alert fired event received');
  console.log(actionColumnEventArgs.data[0].id.actionColumn.FriendlyName);

  let rowData = actionColumnEventArgs.data[0].id.rowData;
  let multiplier: number = rowData.notional > 100 ? 2 : 3;
  let newNotional = rowData.notional * multiplier;
  adaptableblotter.api.gridApi.setCellValue(rowData.tradeId, 'notional', newNotional);
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Theme', 'Layout'],
  },
  ActionColumn: {
    ActionColumns: [
      {
        ColumnId: 'Action',
        ButtonText: 'Click',
        ShouldRenderPredicate: params => {
          return params.rowData.counterparty != 'BNP';
        },
        RenderFunction: params => {
          let data: number = params.rowData.notional;
          return data > 50
            ? '<button class="doublebutton">Double</button>'
            : '<button class="treblebutton">Treble</button>';
        },
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
    if (!process.browser) {
      return;
    }

    InitAdaptableBlotter();
  }, []);

  return null;
};
