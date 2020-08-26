# AdapTable Master Detail AgGrid Plugin Read Me

Version 7 of AdapTable introduced support for using Master-Detail grids in ag-Grid.

It allows you to create a definition for the Detail grid which will apply for all detail grids.  

This means that if you create a Conditional Style in Predefind Config it will apply in each detail grid.

## How It Works

The `masterDetailAgGridPlugin` has 2 properties:

- *detailAdaptableOptions* - an `AdaptableOptions` object to be used for **every** Detail grid

- *onDetailInit: (api: AdaptableApi) => void* - an optional function which will be called whenever a Detail grid is opened (essentially initialised), providing you with the AdaptableApi instance for full programmatic access to all Adaptable features.

### Example

This code taken from the [Master-Detail demo](https://demo.adaptabletools.com/aggridfeatures/aggridmasterdetaildemo) shows how it works.

We have set up a Master-Detail grid in ag-Grid and the Adaptable Options object for the Master grid in the normal way.

And we have supplied the detail grid Adaptable Options in the plugins section.  Here we create a Conditional Style in Predefined Config to be used in all Detail grids.

```ts
// typical ag-Grid GridOptions object but popuplated for use in a Master-Detail grid 
// for more information see: https://www.ag-grid.com/javascript-grid-master-detail/
 const gridOptions: GridOptions = {
    columnDefs,
    rowData,
    masterDetail: true,
    detailCellRendererParams: {
      detailGridOptions: {
        columnDefs: detailColumnDefs,
      },
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
