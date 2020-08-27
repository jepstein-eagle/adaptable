import { PredefinedConfig } from '../../../../src/types';

export default {
  Dashboard: {
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
