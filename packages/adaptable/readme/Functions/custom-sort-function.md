# Custom Sort (AdaptableFunction)

The Custom Sort([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `CustomSort`) Function enables columns to be given a different sort order to the default for their data type.

The Custom Sort Function allows you to create your own sort order for columns. You will find it useful when you need to order a column in an non-standard way (i.e. not in alphabetical, numerical, or date order). For example, you will want to sort a Rating column according to the rating, rather than alphabetically.

Note
The default sort order for text columns is alphabetical order. For numerical columns it is high-low order and for date columns it is newest-oldest order.

When a custom sort order is used, AdapTable applies the custom order first. If the column has values that are not included in the custom sort order, they are sorted according to the default order for the column, for example, alphabetical order for text values.

You are able to provide either a 'hardcoded' list of values to use when sorting, or a 'comparer'-type function which will be evaluated each time sort is applied.

Warning
You can only create one Custom Sort Order per column - make sure that the Column has been defined as Sortable when it was created.

## UI Elements
To Do

## Entitlements
To Do

## FAQ

Not all the values we want to include in the sort are currently in the grid, so they dont appear in the dropdown.  Can we add items by hand?

That is not possible because in previous versions where it was users ended up with multiple spelled variations of the same item. 

However there is an option for developers to supply their own list of values to the listbox so it can contain all the items that you will require for your sort.

Additionally, if you provide a Custom Sort as part of your Predefined Config then it can contain whichever values you want.

### Further Information

To Do

