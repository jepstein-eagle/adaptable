import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';
import './index.css';

import { GridOptions } from 'ag-grid-community';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import { AdaptableBlotterOptions, PredefinedConfig } from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(100000);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableBlotterOptions: AdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsTrade(
    gridOptions,
    `calculated column demo`
  );
  adaptableBlotterOptions.predefinedConfig = demoConfig;
  adaptableBlotterOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };

  const blotterApi = AdaptableBlotter.init(adaptableBlotterOptions);
}

let demoConfig: PredefinedConfig = {
  CalculatedColumn: {
    CalculatedColumns: [
      {
        ColumnExpression: 'Col("notional") * 2',
        ColumnId: 'Dob Notional',
      },
    ],
  },
  Layout: {
    CurrentLayout: 'with calc cols',
    Layouts: [
      {
        Columns: ['tradeId', 'country', 'notional', 'Dob Notional'],
        GroupedColumns: ['currency'],
        ColumnSorts: [],
        Name: 'with calc cols',
      },
    ],
  },
  ConditionalStyle: {
    ConditionalStyles: [
      {
        Style: {
          BackColor: '#0000ff',
          ForeColor: undefined,
          FontWeight: 'Normal',
          FontStyle: 'Normal',
          FontSize: undefined,
          ClassName: '',
        },
        ConditionalStyleScope: 'Row',
        Expression: {
          ColumnValueExpressions: [
            {
              ColumnId: 'country',
              ColumnDisplayValues: ['France', 'China'],
              ColumnRawValues: ['France', 'China'],
            },
          ],
        },
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
