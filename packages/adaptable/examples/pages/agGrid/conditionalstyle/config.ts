import { PredefinedConfig } from '../../../../src/types';

export default {
  Dashboard: {
    VisibleToolbars: [],
    VisibleButtons: ['ConditionalStyle'],
  },
  DataSource: {
    DataSources: [],
    CurrentDataSource: '',
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
        StyleApplied: 'Row',
        Expression: {
          ColumnValueExpressions: [
            {
              ColumnId: 'CompanyName',
              ColumnDisplayValues: ["La maison d'Asie"],
              ColumnRawValues: ["La maison d'Asie"],
            },
          ],
        },
      },
    ],
  },
} as PredefinedConfig;
