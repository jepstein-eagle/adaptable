# Showing Distinct Column Values FAQ

### Where does AdapTable need show a list of column values? 

There are a number of use cases in which AdapTable needs to display the distinct values associated with a given column.  

These include:

- Column Values tab of the Query Builder

- Column Filter dropdown (accessed via Column Header menu)

- Inside editing functions e.g. Bulk Update

There are 3 different ways in which we fetch these values depending on your preferences.

### What is the default option?

By default AdapTable will dynamically retrieve all the distinct values for the column currently in the grid.  

> The method to get this data has been refactored many times to ensure it is very performant.

### What happens if I have thousands of potential values for that Column/

By default AdapTabl

Permitted Column Values

Another alternative is to set - for each column - the values which can be displayed.  

These are known as Permitted Column Values.  

The object is straightforward; it contains 2 properties: 'column' (string) and permittedValues (string array). 

These can be set at design-time via Predefined Config.

Alternatively they can be set at run-time via the UserInterfaceApi section of AdaptableApi.

This method takes the name of the column and an array of column values as the 2 parameters.  

Tip
It is expected that Permitted Column Values will be set infrequently for each column, usually just once.

If you need to changes these values regularly then the Dynamic Column Values option (below) might be more suitable.

Note
Permitted Column Values takes precedence over fetching distinct column values.

Dynamic Column Values

The third option is to provide - at runtime - Dynamic Column Values.

In this case AdapTable will call a user-provided callback function each time that a list of column values is required.

This function is set at design time when AdapTable is defined.

The property is getColumnValues in AdaptableOptions.

The callback must take the form:  (column: string) => Promise<IServerColumnValues[]>.  In other words, it takes the name of the column in question as the only parameter and returns a Promise that will contain list of column values to display and whether to show display or raw values.

Warning
If you use this option, then you have to provide Dynamic Column Values for every Column.

There is currently no means to configure AdapTable only to use it for some, specified, columns.

Note
If the column values to be returned have not changed since the last time this function was run for the same column, you can return null.  

AdapTable will then display what you sent on the previous occasion.

Note
Dynamic Column Values takes precedence over Permitted Column Values.

Limiting Column Values Displayed

What happens if you have hundreds of thousands of rows in your grid?  How can you cap the number of column values displayed so that the list becomes manageable?

The solution is to use the (numeric) maxColumnValueItemsDisplayed property in AdaptableOptions.  

If this property is set (the default is that it is not) AdapTable will cap the number of values displayed in the grid to value of the property.

Note
If it is set, the maxColumnValueItemsDisplayed property will be used irrespective of which of the above methods is used to retrieve the column values.


 
 
 
 
 By default AdapTable will populate the listbox with all the distinct values for that column currently in the grid.

  However you can, alternatively, specify what the permitted values are for any column and then only those values will be displayed.  (See User Interface Config).

  A third alternative is to use the getColumnValues property of Query Options which provides a callback function to be called by AdapTable whenever column values are required.  The implementation for this callback is provided by  each user and allows them to react dynamically each time a filter is opened or a Query is built.

  You  can find out more about the 3 different options available at Column Values.

  to do


## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us/articles/360007083017-Help-) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
