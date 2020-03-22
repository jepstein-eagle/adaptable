# AdapTable Troubleshooting FAQ 

Why are the edit and delete buttons disabled?

This is likely because the Function is 'Read Only'.  When this happens users can access existing Adaptable Objects but cannot edit or delete them or create new ones.  It might be the case that the item in question can never be deleted (e.g. if its the 'Default' layout).

Why are some rows missing from my grid?

Check that there are no Column Filters applied, or that there is no active Advanced Search.  

Why can I not see some toolbars in my Dashboard that other user have?

First check that they have not been closed. You can see the available toolbars in the Dashboard popup.

If the toolbar is not listed there then the Function might be marked as 'Hidden' in your entitlements which means you don't have access to see it.

Why is AdapTable not showing up in my browser? I'm using Internet Explorer

Adaptable does not support Internet Explorer.

AdapTable does work in Chrome, Edge, Opera, Firefox, Safari and all other modern browsers.

Why I am seeing a warning in my console that AdapTable does not know the type of the column?

This happens if you use ag-Grid which has no means of setting the DataType of the column. So AdapTable has to guess it by looking at the first row in the grid. You can avoid this by setting the columnTypes property when configuring GridOptions, and then using that type when defining your column:

gridOptions = {    
    columnDefs: getColumnsForGrid(),
    rowData: trades,
    ....
    columnTypes: { //helpful for column data type identification
        abColDefNumber: {},
        abColDefString: {},
        abColDefBoolean: {},
        abColDefDate: {},
        abColDefObject: {}
    }
}; 

.....
 schema.push({ 
    headerName: "Order Id",
    field: "OrderId",
    type: 'abColDefNumber'});
schema.push({ 
    headerName: "Cust. Ref",
    field: "CustomerReference",
    type: 'abColDefString', });
....



## Demos

To Do

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
