# Column Filter (AdaptableFunction)

The Column Filter ([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `ColumnFilter`) Function facilitates creating powerful, dynamic filters for any column in AdapTable.

This is a very straightforward function that allows you to see at a glance which columns have filters applied to them , together with an option to clear them.

Note
You are also able to see which columns are being filtered by setting the indicateFilteredColumns property to true.  This will render the header cell text of filtered columns to be bold and italicised.

Column Filters cannot be saved for re-use (though any column filters active when the application closes will be re-applied on restart

If you want to re-use a Column Filter then click the Save button to convert them it a named - and subsequently re-usable - User Filter (see below)

You can either use the Column Filter popup or the Column Filter Function Toolbar.  If using the toolbar, you can click the 'Clear button to remove the currently applied filters.

Tip
If you dont want to use AdapTable's Filter Form and prefer to use that provided by the underlying vendor grid, then set the useAdaptableFilterForm property to false in Filter Options.

Quick Filter

Some vendor grids like ag-Grid have a 'Quick Filter' : an area underneath the Column Header which users can access to filter quickly.

If the Quick Filter is visible then AdapTable will provide additional functionality such as wildcards.

## UI Elements
To Do

## Entitlements
To Do

## FAQ

**Can I save a Column Filter?**

Yes, but as a User Filter.  Column Filters are designed to be transient.  If you want to re-use one in other queries then make it a user filter (there are plenty of ways to do that).

### Further Information

To Do

