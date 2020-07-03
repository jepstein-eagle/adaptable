# AdapTable Master Detail AgGrid Plugin Read Me

Version 7 of AdapTable introduced support for using Master-Detail grids in ag-Grid.

It allows you to create a definition for the Detail grid which will apply for all detail grids.  

This means that if you create a Conditional Style in Predefind Config it will apply in each detail grid.

## How It Works

### Example

This code taken from the [Master-Detail demo](https://demo.adaptabletools.com/aggridfeatures/aggridmasterdetaildemo) shows how it works:

```ts
 const gridOptions: GridOptions = {
    columnDefs,
    rowData,
    masterDetail: true,
    detailCellRendererParams: {
      // provide detail column defs
      detailGridOptions: {
        columnDefs: detailColumnDefs,
      },
      // extract and supply row data for detail
      getDetailRowData: function(params: any) {
        params.successCallback(params.data.squad);
      },
    },
    isRowMaster: function(dataItem) {
      return dataItem ? dataItem.squad.length > 0 : false;
    },
    .......
  };

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'name',
    userName: 'Demo User',
    adaptableId: 'Master Detail Demo - Master Grid',
    predefinedConfig: demoConfig,
    vendorGrid: { ...gridOptions, modules: AllEnterpriseModules },
    plugins: [
      masterDetailAgGridPlugin({
        detailAdaptableOptions: {
          primaryKey: 'name',
          adaptableId: 'Master Detail Demo - Detail Grid',
          predefinedConfig: {
            ConditionalStyle: {
              ConditionalStyles: [
                {
                  Style: {
                    BackColor: '#ffffe0',
                  },
                  ConditionalStyleScope: 'Row',
                  Expression: {
                    RangeExpressions: [
                      {
                        ColumnId: 'age',
                        Ranges: [
                          {
                            Operand1: '30',
                            Operand1Type: 'Value',
                            Operator: 'GreaterThan',
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      }),
    ],
  };
  adaptableApi = await Adaptable.init(adaptableOptions);
```

## Requirements

This plugin depends on the ag-Grid `@ag-grid-enterprise/master-detail` Module (or `@ag-grid-enterprise/all-modules`) being present.

## Demo

There is a [Master-Detail demo](https://demo.adaptabletools.com/aggridfeatures/aggridmasterdetaildemo) at the [AdapTable Demo Site](https://demo.adaptabletools.com)

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us/articles/360007083017-Help-) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
