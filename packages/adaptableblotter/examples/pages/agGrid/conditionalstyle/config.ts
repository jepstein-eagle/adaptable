import { PredefinedConfig } from '../../../../App_Scripts/types';

export default {
  Dashboard: {
    Zoom: 2,
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
        ConditionalStyleScope: 'Row',
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
