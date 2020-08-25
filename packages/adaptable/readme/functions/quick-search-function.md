# QuickSearch (AdaptableFunction)

The `QuickSearch` Function performs a **text search** enabling users to quickly find all instances of a specific value across all visible columns in the Grid.

### Setting Highlight Style

The Quick Search UI allows users to set the Back Colour and Fore (i.e. font) colour of a matched cell.  

An alternative to setting the properties individually, is to set a css style classname for Quick Search (make sure to include the css style being referenced in your application code).


### Filtering

Quick Search does **not filter** the Grid - it merely hightlights matching text in the current visible rows and columns.

Previous versions of AdapTable did enable filtering as an option for Quick Search but with the improved functionality around Queries and Column Filters, this was no longer rquired.

Similarly, Quick Search from v.7 onwards no longer offers 'wildcard' functionality - this is unnecesary as it's now provided by Column Filters.

> Quick Search is a 'constant operation' - so, like with Advanced Search or Column Filters, it will run both when a new Quick Search is applied but also when data ticks or the visible columns change.


## UI Elements

Quick Search includes the following UI Elements:

- **Popup** - Allows you to perform a Quick Search operation.  It also includes properties for setting Quick Search (e.g. colours for highlighted cells and whether to display rows with no matching cells)

- **Toolbar** - Enables Quick Search to be performed - and to provide both an existing column value or a new one.

- **Tool Panel** - Same as Toolbar above.

- **Dashboard** - Because Quick Search is such a popular function, it is embedded in the [Dashboard](./dashboard-function.md) Header itself - in Expanded, Collapsed and Floating Modes.

    > This option can be turned off by setting the `ShowQuickSearchInHeader` property in [Dashboard Predefined Config](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_dashboardstate_.dashboardstate.html#showquicksearchinheader)
    

## Entitlements

Quick Search supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User (including Quick Search not being included in the Dashboard Header)

- **ReadOnly**: N/A

## FAQ

**Is it possible only to display rows that have cells that contain the search text?**

Yes. There are options to highlight matching cells, just return matching rows, or both.

**Is it possible to do free style quick search (e.g. '> 50')**

No, this was possible in previous versions but as column filters now provide that functionality, it was removed from Quick Search which is a simple text search on 'contains'

**Can we limit Quick Search to particular columns or column data types?**

Yes, you can. By default Quick Search works across ALL columns in AdapTable.

However if you want to exclude a column then provide an implementation for the [excludecolumnfromquicksearch](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_searchoptions_.searchoptions.html#excludecolumnfromquicksearch) function in the SearchOptions section of AdaptableOptions.

**Does Quick Search include hidden columns?**

No, Quick Search only operates on **visible columns** and it gets re-applied if the column visibility changes. 

If you have a large number of columns so that some are not visible in the current scrolling position, Quick Search will still operate on them.

**Does Quick Search update in real time as the data changes**

Yes it does. Like Advanced Search and Column Filters, Quick Search is reapplied as data changes.


### Further Information

- [Quick Search State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_quicksearchstate_.quicksearchstate.html)

- [Quick Search Api](https://api.adaptabletools.com/interfaces/_src_api_quicksearchapi_.quicksearchapi.html)

- [Quick Search Demo](https://demo.adaptabletools.com/search/aggridquicksearchdemo)

- [Filtering Guide](../guides/adaptable-filtering-guide.md)

- [Server Functionality Guide](../guides/adaptable-server-functionality-guide.md)