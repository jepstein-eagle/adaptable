# QuickSearch (AdaptableFunction)

The QuickSearch([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `QuickSearch`) Function  enables users to quickly find matching text across all visible columns.

Quick Search makes it easy to find all instances of a specific value or term in a grid. You simply enter the value/term you want to search for, and AdapTable will find it.

Depending on the Quick Search settings you have in place, AdapTable will highlight the matching cells, will filter the grid so that it only shows those rows that have matching cells, or do both.

Tip
You should use Quick Search when you want to search in all columns and all rows of a grid.

Warning
Quick Search is a constant operation . So, like with Advanced Search or Column Filters, it will highlight / filter the cells at the time that the Search is applied and also when data updates or the columns change.

You can use the same wildcards as the Floating Filter to refine your quick search.  For example, '> 500' will return any cell that has a number greater than 500.  Or 't*' will return any cell that starts with t.  The 'Between' and 'In' Floating Filter wildcards are not available in Quick Search.

See the Appendix at the bottom for more information on using wildcards.

Note
You can set the Fore Colour and Back Colour for Highlighted Cells in the Quick Search settings page; you are also able to set a css style classname for Quick Search instead of setting the properties individually.

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

