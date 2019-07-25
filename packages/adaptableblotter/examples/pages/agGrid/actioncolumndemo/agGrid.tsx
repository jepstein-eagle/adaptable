import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import '../../../../App_Scripts/base.scss';
import '../../../../App_Scripts/themes/light.scss';

import {
  IAdaptableBlotter,
  AdaptableBlotterOptions,
  PredefinedConfig,
} from '../../../../App_Scripts/types';
import { GridOptions } from 'ag-grid-community';
import { ExamplesHelper } from '../../ExamplesHelper';
import { ActionColumnEventArgs } from '../../../../App_Scripts/Api/Events/BlotterEvents';
import { GridCell } from '../../../../App_Scripts/Utilities/Interface/SelectedCell/GridCell';

var adaptableblotter: IAdaptableBlotter;

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();

  const tradeData: any = examplesHelper.getTrades(3);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  // creating blotter options here so we can add audit
  const adaptableBlotterOptions: AdaptableBlotterOptions = {
    vendorGrid: gridOptions,
    primaryKey: 'tradeId',
    userName: 'demo user',
    blotterId: 'action column demo',
    licenceKey: examplesHelper.getEnterpriseLicenceKey(),
  };
  adaptableBlotterOptions.predefinedConfig = demoConfig;
  (adaptableBlotterOptions.advancedOptions = {
    userFunctions: {
      actionColumnFunctions: [
        {
          name: 'BundleColumn',
          func: (_record, _cellValue) => {
            alert('hello world');
            return 'hello';
          },
        },
      ],
    },
  }),
    // userFunctions

    (adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions));

  examplesHelper.autoSizeDefaultLayoutColumns(adaptableblotter, gridOptions);

  adaptableblotter.api.eventApi
    .onActionColumnClicked()
    .Subscribe((sender, actionColumnEventArgs) => onActionColumnClicked(actionColumnEventArgs));
}

function onActionColumnClicked(actionColumnEventArgs: ActionColumnEventArgs) {
  console.log('alert fired event received');
  console.log(actionColumnEventArgs);

  let rowData = actionColumnEventArgs.rowData;
  let newNotional = rowData.notional * 2;
  adaptableblotter.api.gridApi.setValue(rowData.tradeId, 'notional', newNotional);
}

let demoConfig: PredefinedConfig = {
  ActionColumn: {
    ActionColumns: [
      {
        ColumnId: 'Action',
        ButtonText: 'Click',
        //  RenderFunctionName: 'BundleColumn',
      },
      {
        ColumnId: 'Plus',
        ButtonText: '+',
      },
      {
        ColumnId: 'Minus',
        ButtonText: '-',
      },
    ],
  },
  Layout: {
    Layouts: [
      {
        ColumnSorts: [],
        Columns: ['tradeId', 'Triple Notional', 'notional', 'counterparty', 'Action'],
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
