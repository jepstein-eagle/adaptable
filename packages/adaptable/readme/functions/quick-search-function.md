# QuickSearch (AdaptableFunction)

The QuickSearch([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `QuickSearch`) Function  enables users to quickly find matching text across all visible columns.


## UI Elements
To Do

## Entitlements
To Do

## FAQ

Is it possible only to display rows that have cells that contain the search text?

Yes. There are options to highlight matching cells, just return matching rows, or both.

Is it possible to do free style quick search (e.g. '> 50')

Yes, you can use a number of shortcuts in the Quick Search. These are similar to the ones that you can use in the Floating Filter.

Can we limit Quick Search to particular columns or column data types?

Yes, you can. By default Quick Search works across ALL columns in AdapTable.

However if you want to exclude a column then use the excludecolumnfromquicksearch function in SearchOptions.

Does Quick Search include hidden columns?

No, Quick Search only operates on visible columns and it gets re-applied if the column visibility changes. However if you have a large number of columns so that some are not visible in the current scrolling position, Quick Search will still operate on them.

Does Quick Search update in real time as the data changes

Yes it does. Like Advanced Search and Filters, Quick Search is reapplied as data changes.

### Further Information

To Do

