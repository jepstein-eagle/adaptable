# Column Filter (AdaptableFunction)

The Column Filter ([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `ColumnFilter`) Function facilitates creating powerful, dynamic filters for any column in AdapTable.

It also provides a way for users to see at a glance which columns have filters applied to them, together with an option to clear them (or turn them into reusable [User Filters](./user-filter-function.md)).

### Filtering
Each column in Adaptable - which is marked as filterable - has a filter dropdown which allows for quick filter selection.

Users can create as many filter items as they want and the grid will automatically update so that it only displays rows that match the filters set for the column.

See the [AdapTable Filtering Guide](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-filtering-guide.md) for detailed lists of the many different types of Filters that can be created.

### Managing Column Filters
To remove all the filters for a column click the 'Clear' button in the Filter Dropdown or in the Column Filter Toolbar.

The caption (in the Column Header) is bold and italicised for any columns that are filtered.

> You are also able to see which columns are being filtered by setting the indicateFilteredColumns property to true.  This will render the header cell text of filtered columns to be bold and italicised.

Auto-apply filter is available.

### Saving and Re-Using Column Filters

Any active column filters when the system closes are immediately re-applied on startup.

If you don't want this then you can set it.

Column Filters cannot be saved for re-use.  In order to save - and then re-use - Column Filters in other functions (e.g. Advanced Search), click the save button in the top of the Filter Form which will convert the Column Filter into a named - and re-usable [User Filter](./user-filter-function.md).

> If you dont want to use AdapTable's Filter Form and prefer to use that provided by the underlying vendor grid, then set the useAdaptableFilterForm property to false in Filter Options.

Column Filters can be cleared either by using the Column Filter Popup, Toolbar or ToolPanel. 

### Quick Filter Bar

Some vendor grids like ag-Grid have a 'Quick Filter' : an area underneath the Column Header which users can access to filter quickly.

When this is used, AdapTable will create a Column Filter behind the scenes that can be used in the same way as a Column Filter created via the Dropdown.

See the [AdapTable Filtering Guide](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-filtering-guide.md) for more details.

## UI Elements
Column Filters includes the following UI Elements:

- **Popup** - Shows a list of existing Column Filters with *Save as User Filter* and *Delete* buttons.  

- **Toolbar** - When any Column Filters are applied, it shows an Info icon which, when clicked, provides details of the Filters, with ability to delete or save them as User Filters.  

  In grids which support a Quick Filter Bar, the Toolbar additionally contains a Check Box to enable the *Quick Filter Bar* to shown / hidden.

- **Tool Panel** - Same as Toolbar above.

- **Column Menu Item** - `Clear Column Filter` Menu Item opens enables all Column Filters to be cleared (only visible if Column Filters are currently applied).  

    `Show / Hide Quick Filter Bar` Menu Item enables the *Quick Filter Bar* to be easily made visible or invisible (only available when a *Quick Filter Bar* is active).

- **Context Menu Item** - `Filter on Cell Value(s)` Menu Item opens enables a cell or cells to be selected (from a single column) and a Column Filter to be immediately created on those values.

## Entitlements
Column Filters supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: The Column Filter related Column and Context Menu items are hidden but the Column Filter itself is still available - this can never be hidden.

- **ReadOnly**: N/A


## FAQ

**Can I save a Column Filter?**

Yes you can - by creating a [User Filter](./user-filter-function.md).  Column Filters are designed to be transient.  This will then allow you to reuse that Filter in multiple other Functions where you want to fetch specific rows or cells.

### Further Information

- [Column Filters State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_columnfilterstate_.columnfilterstate.html)

- [Column Filters Api](https://api.adaptabletools.com/interfaces/_src_api_columnfilterapi_.columnfilterapi.html)

- [Column Filters Demo](https://demo.adaptabletools.com/filters/aggridcolumnfiltersdemo)

- [AdapTable Filtering Guide](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-filtering-guide.md)
