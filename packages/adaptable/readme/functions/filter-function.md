# Filter (AdaptableFunction)

The Filter Function facilitates the creation of powerful, dynamic filters for any column in AdapTable.

Filtering is designed to be intuitive and easy to use, but that simplicity of use 'hides' a great deal of complexity in terms of the filtering options and functonalities on offer.

Users can create Filters for as many Columns as required and the grid will automatically update so that it only shows rows that match the filters set for the column.

## Predicate

A Filter is essentially a **single** `AdaptablePredicate` - an object which wraps a boolean function.

> In earlier versions of AdapTable a ColumnFilter could have multiple criteria but this was reduced to a single Predicate in Version 7 with the parallel introduction of the [Query](query-function.md) - that facilitated multiple conditions with 'AND' and 'OR' support.

This object contains a number of properties of which the most important are:

* `Scope` - where the Filter can be applied, i.e. to one, some or all columns or to columns of a particular DataType(s).

* `handler` - the boolean function to run when the filter is applied.

* `inputs` - blah lah (Talk about teh IN / Values here)


## Filter State

The [Filter](../../src/PredefinedConfig/FilterState.ts)  section of Adaptable State (and Predefined Config) has 2 collections:

* **System Filters** - in-build Predicates shipped by AdapTable in order to pre-populate the filter UI (see full list in Appendix 1).  

    > You can use the `SystemFilters` property of FilterState to limit which System Predicates are available.

* **Column Filters** - These are filters which have been applied to a particular column - either created by User at run-time and persisted automatically by AdapTable, or provided by a developer at design-time for first use.

    > Any active Column Filters when the system closes are automatically persisted and then immediately re-applied on startup.

## Custom Filters

Developers are able to provide their own filters at design-time.

This is done by creating an `AdaptablePredicateDef` and putting it in the `customPredicateDefs` collection in Adaptable Options.

```js
 const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Demo Grid',
    customPredicateDefs: [
     {
      id: 'high_invoice',
      label: 'High Invoice',
      columnScope: {
        ColumnIds: ['OrderId'],
      },
      functionScope: ['filter'],
      handler(params: PredicateDefHandlerParams) {
        const invoiced: number = params.node.data.InvoicedCost;
        const itemCount: number = params.node.data.ItemCount;
        return invoiced > 100 && itemCount > 10 ? true : false;
        },
    ],
  };
 ```

 In this example we have created a filter predicate (see `functionScope` property) and which will operate on the 'OrderId' column (see `columnScope` property).

## UI Filter Controls

There are 2 UI 'controls' which provide filtering capabilities in AdapTable.

> Each remains fully in sync with the other, and each updates the same [Filter](../../src/PredefinedConfig/FilterState.ts) section in AdaptableState.

### Filter Dropdown

This is  powerful control that allows users to buld a Column Filter through the UI.

Every column in AdapTable - which is marked as filterable - will have a Filter Dropdown to enable quick filter selection and creation.

The dropdown can appear in 2 places:

1. When the Filter tab in the Column Header Menu is selected
  
2. In the 'Filter' ToolPanel in the 'sidebar' (which appears by default at the right hand side of the grid)

The Dropdown contains 2 tabs:

* blah

* blah

> Set `filterOptions.useAdaptableFilterForm` to `false` in order to use the underlying vendor grid's filter form instead of the one provided by AdapTable.

### Quick Filter Bar

This is a textbox that is displayed in the row between the Column Header and the first data row in the grid - allows Filters to be created through text entry.

> In version 23 of ag-Grid the Quick Filter Bar is set at **column** level and not grid level (through the `floatingFilter` property) so the Quick Filter bar will only appear if at least one column has this property to set `true` and is enables just for those columns.

The left hand side of the Quick Filter Bar contains a dropdown showing all the System and Custom Filters with scope for that column.  If the relevant predicate has `inputs` then the textbox will be enabled for these to be entered; otherwise it merely displays the name of the current predicate.

> If the predicate type is 'IN' (i.e. column values) then a list of all distinct values for that column will display.

AdapTable provides wildcard support to make it easy to switch between predicates in the textbox itself, e.g. typing '>' will switch to 'GreaterThan'.  (See the full list in Appendix 2).

Each DataType has a default predicate as follows:

* Number - Equals
* String - Contains
* Date - Equals

The Quick Filter Bar can be hidden / displayed at any time you want by selecting the 'Show / Hide Quick Filter' menu option from any Column menu, or clicking the Show/Hide button in the Filter Toolbar.

> Set `filterOptions.useAdaptableQuickFilter` to `false` in order to use the underlying vendor grid's quick filter bar instead of the one provided by AdapTable.

## Managing Column Filters

There are a number of options provided by AdapTable to help users configure and manage filters.

### Seeing Filtered Columns

AdapTable makes it easy for users to see at a glance which columns have filters applied to them by setting `filterOptions.indicateFilteredColumns` to `true` which will distinctly render the Column Header for any filtered columns.

### Clearing Filters

To remove the filter for a column click the 'Clear' button in the Filter Dropdown or in the Column Filter Toolbar.

### Auto-Applying Filters

By default the filter gets applied automatically - and the grid updated accordingly - each time a change is made to any predicate.  To avoid this behaviour (useful if you are peforming filtering on the server), set `filterOptions.autoApplyFilter` to `false` and a button will appear in the filter form; only on clicking that will the Filter be applied.

### Saving Column Filters

Any active column filters when the system closes are saved to state and then immediately re-applied on startup.

If this behaviour is not desirable set `filterOptions.clearFiltersOnStartUp` to `true` and they will be cleared when AdapTable next loads.

## Other UI Elements

Filters also include the following UI Elements:

- **Popup** - Shows a list of existing Column Filters with clear buttons.  

- **Toolbar** - When any Column Filters are applied, it shows an Info icon which, when clicked, provides details of the Filters together with a clear option.  

    The Toolbar also contains a Check Box to enable the *Quick Filter Bar* to be shown / hidden.

- **Tool Panel** - Same as Toolbar above.

- **Column Menu Items**:
  -  `Clear Filter` Menu Item opens enables all Filters to be cleared (it is only visible if Filters are currently applied).  
  -  `Show / Hide Quick Filter Bar` Menu Item enables the *Quick Filter Bar* to be easily made visible or invisible (only available when a *Quick Filter Bar* is active).

- **Context Menu Item** - `Filter on Cell Value(s)` Menu Item opens enables a cell or cells to be selected (from a single column) and a Column Filter to be immediately created on those values.

## Entitlements

Filter supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: The Column Filter related Column and Context Menu items are hidden but the Column Filter itself is still available - this can never be hidden.

- **ReadOnly**: N/A


## FAQ

**Can we do AND or OR in the Quick Filter Bar?**

No, but this is available via a [Query](query-function.md).

**Can a user include column values in a Query that are not present in the grid when the Query is created?**

Yes.  The easiest way to do this is via Permitted Values.  You can set the permitted vales for each column, and can include any values you want.  (See Column Values for more information).

Additionally, if the Query is built at design time and shipped with the product then it can include any Column Values that the developers want to include - they don't need to be present in the grid at the time of creation.

## Appendices

### 1. System Filters

The System Filter predicates shipped by AdapTable are:

| System Filter           | Columns              |
| --------  	          | ------               | 
| Values| All   | 
  | Blanks' | All   | 
  | NonBlanks| All   | 
  | Equals| Number   | 
  | NotEquals| Number   | 
  | GreaterThan| Number   | 
  | LessThan| Number   | 
  | Positive| Number   | 
  | Negative| Number   | 
  | Zero| Number   | 
  | Between| Number   | 
  | NotBetween| Number   | 
  | Is| String   | 
  |IsNot| String   | 
  | Contains| String   | 
  | NotContains| String   | 
  | StartsWith| String   | 
  |EndsWith| String   | 
  | Regex| String   | 
  | Today| Date   | 
  | Yesterday| Date   | 
  | Tomorrow| Date   | 
  | ThisWeek| Date   | 
  | ThisMonth| Date   | 
  | ThisQuarter| Date   | 
  | ThisYear| Date   | 
  | InPast| Date   | 
  | InFuture| Date   |
  | Before| Date   | 
  | After| Date   | 
  | On| Date   | 
  | NotOn| Date   | 
  |NextWorkDay| Date   | 
  | LastWorkDay| Date   | 
  | True| Boolean   | 
  | False| Boolean   | 



### 2. Quick Filter Bar Wildcards

| Symbol | Value        | Columns      | Example    |
| ------ | ------------ | ------------ | ---------- |
| =      | Equals       | Text, Number | '=15'      |
| !=     | Not Equals   | Number       | '<> 23'    |
| >      | Greater Than | Number       | '> 5'      |
| <      | Less Than    | Number       | '<5'       |
| :      | Between      | Number       | '5 : 100'  |
| !:     | Between      | Number       | '5 !: 100' |

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us/articles/360007083017-Help-) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## Demos

The [Demo Site's filter section](https://demo.adaptabletools.com/filters) contains a number of filtering-related demos

## More Information

- [Filter State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_filterstate_.filterstate.html)

- [ Filter Api](https://api.adaptabletools.com/interfaces/_src_api_filterapi_.filterapi.html)

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).