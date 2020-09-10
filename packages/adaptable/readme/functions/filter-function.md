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

* `inputs` - any additional values the Predicate requires (e.g. if its a 'GreaterThan' or 'LessThan' Predicate it will need a number, or if it is 'StartsWith' it will need a string).

  > If the Predicate is 'IN' then the inputs will be an array of all the Column Values selected in the list.

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
      }
     {
        id: 'new_starter',
        label: 'New Starter',
        columnScope: {
          ColumnIds: ['Employee'],
        },
        functionScope: ['filter'],
        handler(params: PredicateDefHandlerParams) {
          return (
            params.value == 'Robert King' ||
            params.value == 'Laura Callahan' ||
            params.value == 'Andrew Fuller'
          );
        },
      },
      {
        id: 'post_takeover',
        label: 'Post Takeover',
        columnScope: {
          DataTypes: ['Date'],
        },
        functionScope: ['filter'],
        handler(params: PredicateDefHandlerParams) {
          let takeOverDate = new Date('2019-09-21');
          return (params.value as Date) > takeOverDate;
        },
      },
    ],
  };
 ```

 In this example we have created 3 predicates: 2 have `ColumnScope` of a single column and one of DataType of 'Date'.

## UI Filter Controls

There are 2 UI 'controls' which provide filtering capabilities in AdapTable.

> Each remains fully in sync with the other, and each updates the same [Filter](../../src/PredefinedConfig/FilterState.ts) section in AdaptableState.

### Filter Form

This is  powerful control that allows users to buld a Column Filter through the UI.

Every column in AdapTable - which is marked as filterable - will have a Filter Form to enable quick filter selection and creation.

The dropdown can appear in 2 places:

1. When the Filter tab in the Column Header Menu is selected
  
2. In the 'Filter' ToolPanel in the 'sidebar' (which appears by default at the right hand side of the grid)

The Dropdown contains 2 tabs:

* **Predicates** - This lists all the available Predicates for this column (System and Custom) as radio buttons.  Where a Predicate requirs an input (e.g. 'GreaterThan') this will appear when the Predicate is selected.

* **Column Values** - This lists all the distinct Column Values for that Column (or any Permitted Values if they have been set).  Each value is a checkbox enabling multiple items to be selected.

  > Column Values become an 'IN' Predicate.

> By default AdapTable's Filter Form will be used (in preference to one provided by the underlying Grid).  To change this behaviour, set `filterOptions.useAdaptableFilterForm` to `false` in order to use the underlying vendor grid's filter form instead of the one provided by AdapTable.

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

> By default AdapTable's Quick Filter Bar will be used (in preference to one provided by the underlying Grid).  To change this behaviour, set `filterOptions.useAdaptableQuickFilter` to `false` in order to use the underlying vendor grid's quick filter bar instead of the one provided by AdapTable.

## Managing Column Filters

There are a number of options provided by AdapTable to help users configure and manage filters.

### Seeing Filtered Columns

AdapTable makes it easy for users to see at a glance which columns have filters applied to them through the `filterOptions.indicateFilteredColumns` property.  This defaults to `true` and will distinctly render the Column Header for any filtered columns.

### Clearing Filters

To remove the filter for a column click the 'Clear' button in the Filter Form or in the Column Filter Toolbar.

### Auto-Applying Filters

By default the filter gets applied **automatically** - and the grid updated accordingly - each time a change is made to any predicate (e.g. another column value is added to an 'IN' predicate).  

Where this is not the desired behaviour (e.g. if you are peforming filtering on the server and want to apply the final filter only), set `filterOptions.autoApplyFilter` to `false` and a button will appear in the filter form; only on clicking that will the Filter be applied.

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

| System Filter           | Columns              | Inputs|
| --------  	          | ------               | ------               | 
| Values| All   | Yes |
  | Blanks' | All   | No |
  | NonBlanks| All   | No |
  | Equals| Number   | Yes |
  | NotEquals| Number   | Yes |
  | GreaterThan| Number   | Yes |
  | LessThan| Number   | Yes |
  | Positive| Number   | No |
  | Negative| Number   | No |
  | Zero| Number   | No |
  | Between| Number   | Yes |
  | NotBetween| Number   | Yes |
  | Is| String   | Yes |
  |IsNot| String   | Yes |
  | Contains| String   | Yes |
  | NotContains| String   | Yes |
  | StartsWith| String   | Yes |
  |EndsWith| String   | Yes |
  | Regex| String   | Yes |
  | Today| Date   | No |
  | Yesterday| Date   | No |
  | Tomorrow| Date   | No |
  | ThisWeek| Date   | No |
  | ThisMonth| Date   | No |
  | ThisQuarter| Date   | No |
  | ThisYear| Date   | No |
  | InPast| Date   | No |
  | InFuture| Date   |No |
  | Before| Date   | Yes |
  | After| Date   | Yes |
  | On| Date   | Yes |
  | NotOn| Date   | Yes |
  |NextWorkDay| Date   | No |
  | LastWorkDay| Date   | No |
  | True| Boolean   | No |
  | False| Boolean   | No |



### 2. Quick Filter Bar Wildcards

| Symbol | Predicate    | Columns      |
| ------ | ------------ | ------------ |
| =      | Equals       | Text, Number |
| !=     | Not Equals   | Text, Number |
| >      | Greater Than | Number       |
| <      | Less Than    | Number       |
| :      | Between      | Number       |
| !:     | Between      | Number       |
| [      | IN / Values  | All          |
| #      | IN / Values  | All          |

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
