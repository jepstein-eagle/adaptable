import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import { GridOptions } from '@ag-grid-community/all-modules';
import Adaptable from '../../../../src/agGrid';
import {
  AdaptableOptions,
  PredefinedConfig,
  AdaptableApi,
  FunctionAppliedDetails,
} from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';
import { AuditLogEntry } from '../../../../src/Utilities/Interface/AuditLogEntry';

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(1000);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Calc Col Demo',

    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: demoConfig,

    layoutOptions: {
      autoSizeColumnsInLayout: true,
    },
    auditOptions: {
      auditFunctionEvents: {
        auditAsEvent: true,
      },
    },
  };

  const adaptableApi: AdaptableApi = Adaptable.init(adaptableOptions);

  adaptableApi.auditEventApi.on('AuditFunctionApplied', auditLogEventArgs => {
    let auditLogEntry: AuditLogEntry = auditLogEventArgs.data[0].id;
    let funcDetails: FunctionAppliedDetails | undefined = auditLogEntry.function_applied_details;
    if (funcDetails && funcDetails.name == 'CalculatedColumn') {
      // will fire for each of Add, Edit and Delete and will have the relevant Calc Column as the argument
      console.log(funcDetails);
    }
  });
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleButtons: ['CalculatedColumn'],
  },
  CalculatedColumn: {
    CalculatedColumns: [
      {
        ColumnExpression: 'Col("notional") * 2',
        ColumnId: 'Dob Notional',
      },
      {
        ColumnExpression:
          'Col("notional") > 1300 ? "High" : Col("notional") > 1100 ? "Medium": "Low"',
        ColumnId: 'Comment',
        CalculatedColumnSettings: {
          Groupable: false,
          Sortable: false,
        },
      },
    ],
  },
  Layout: {
    CurrentLayout: 'with calc cols',
    Layouts: [
      {
        Columns: ['tradeId', 'country', 'notional', 'Dob Notional', 'currency'],
        //   GroupedColumns: ['currency'],
        ColumnSorts: [],
        Name: 'with calc cols',
      },
    ],
  },
  FormatColumn: {
    FormatColumns: [
      {
        ColumnId: 'Dob Notional',
        DisplayFormat: {
          Formatter: 'NumberFormatter',
          Options: {
            Parentheses: true,
            IntegerDigits: 5,
            IntegerSeparator: '',
          },
        },
        CellAlignment: 'Center',
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
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableDemo();
  }, []);

  return null;
};
