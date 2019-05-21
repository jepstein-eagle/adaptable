export default {
  Dashboard: {
    VisibleToolbars: ['SmartEdit', 'Export', 'Layout'],
    VisibleButtons: ['Dashboard', 'QuickSearch', 'ColumnChooser', 'AdvancedSearch'],
    UseSingleColourForButtons: true,
    ShowSystemStatusButton: false,
  },
  SmartEdit: {
    SmartEditValue: 10,
  },
  Export: {
    CurrentReport: 'High Freight',
    Reports: [
      {
        Name: 'High Freight',
        ReportColumnScope: 'BespokeColumns',
        ReportRowScope: 'ExpressionRows',
        ColumnIds: ['OrderId', 'Freight', 'Employee', 'PackageCost', 'InvoicedCost'],
        Expression: {
          ColumnValueExpressions: [],
          FilterExpressions: [],
          RangeExpressions: [
            {
              ColumnId: 'Freight',
              Ranges: [
                {
                  Operand1: '500',
                  Operand1Type: 'Value',
                  Operand2: '',
                  Operand2Type: 'Value',
                  Operator: 'GreaterThan',
                },
              ],
            },
          ],
        },
      },
    ],
  },
  CustomSort: {
    Customsorts: [
      {
        ColumnId: 'Employee',
        SortedValues: ['Margaret Peacock', 'Steven Buchanan', 'Janet Leverling'],
      },
    ],
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
  Layout: {
    CurrentLayout: 'Orders View',
    Layouts: [
      {
        Columns: [
          'OrderId',
          'OrderDate',
          'CustomerReference',
          'CompanyName',
          'ContactName',
          'RequiredDate',
          'InvoicedCost',
          'ChangeLastOrder',
          'OrderCost',
          'PackageCost',
          'ItemCost',
          'ItemCount',
        ],
        GridSorts: [],
        Name: 'Orders View',
      },
      {
        Columns: [
          'OrderId',
          'ShipVia',
          'Freight',
          'ShipName',
          'ShipAddress',
          'ShipCity',
          'ShipCountry',
          'ShippedDate',
          'CustomerReference',
        ],
        GridSorts: [
          {
            Column: 'ShipName',
            SortOrder: 'Ascending',
          },
        ],
        Name: 'Shipping View',
      },
    ],
  },
};
