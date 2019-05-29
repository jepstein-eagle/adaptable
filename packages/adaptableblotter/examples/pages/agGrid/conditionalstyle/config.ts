export default {
  Dashboard: {
    Zoom: 2,
    VisibleToolbars: [],
    VisibleButtons: ['ConditionalStyle'],
    UseSingleColourForButtons: true,
    ShowSystemStatusButton: false,
  },
  ConditionalStyle: {
    ConditionalStyles: [
      {
        ColumnId: '',
        ColumnCategoryId: '',
        Style: {
          BackColor: '#0000ff',
          ForeColor: null,
          FontWeight: 'Normal',
          FontStyle: 'Normal',
          FontSize: null,
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
          FilterExpressions: [],
          RangeExpressions: [],
        },
      },
    ],
  },
};
