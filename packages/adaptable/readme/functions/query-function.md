# Query (AdaptableFunction)

The Query Function runs an 'Expression' - a function which can contain multiple 'conditions' - as a powerful search.

When the Query is run, the AdapTable Expression Parser will **only return those rows that match all of the Conditions in the Query**.

> Expressions can have **any** return type - as demonstrated by Calculated Columns (which use Expressions); however the Expression used by a query must always return a Boolean (true / false) value.

## Expression Syntax

The Expression syntax is designed to be human readable and writable (though Expressions are typically created via the Expression Editor).

Columns can be referenced in an Expression in 2 ways:

1. ``Col("ColumnId")`` - e.g. Col("Bid")
  
2. ``[ColumnId]`` -e.g. [Bid]  

Note: you have to use the column's Id (or field name), i.e. the identifier for the column used by the underlying grid - e.g. ``[orderId]`` rather than the Caption visible in the grid - e.g. ``'[Order Id]``.
  
> We provide the Caption in the Expression Editor to help you identify the column more easily together with an option to see the Id value instead.

Expresions use common operators and functions and can include paranetheses, AND and OR support, and ternary logic.

Examples of Queries (taken from our demo site) are:

- [Employee] IN ("Robert King", "Andrew Fuller") AND [OrderCost] > 1000
- [OrderChange] > 10 AND [PackageCost] > 10
- [OrderChange] - ([PackageCost] + [OrderCost]) != [InvoicedCost]

For more examples of Expressions see [Calculated Column ReadMe](calculated-column-function.md)

## Query State

The Query State includes 2 elements:

* **CurrentQuery** - an Expression which will run as a 'Search'.  This can be provided via Predefined Config but is more typically persisted at run-time after having been run by a user.  Only the actual Expression string itself is persisted here.

* **SharedQueries** - these are Queries that have been named and so can be **re-used** in other functions in AdapTable (e.g. Reports, Conditional Styles).

  > If a Shared Query is provided in Predefined Config then - unlike with all other AdapTable functions -  **the Uuid must be included in the Config**.  This should be something guaranteed to be unique - which will be referenced elsewhere - and unlike other properties (e.g. 'Name') will never change.
  
## UI Elements

Query includes the following UI Elements:

* **Expression Editor** - an easy to use UI that allows users quickly and easily to create expressions.  It has a number of useful features including:

  * Drag n Drop of Columns into the Editor

  * List of all the available functions as buttons or in a dropdown so they are immediately applied in the Editor

  * Display the return value of the Expression (using data from the first row of the Grid)

  * Context sensitive Support / Help for each available function

* **Popup** - Shows a list of existing Queries with *Edit* and *Delete* buttons, plus an *Add* button to start the Query Wizard.

* **Wizard** - A series of steps facilitating the creation and editing of Queries.

* **Toolbar** - Provides a large input to enable users to write (and then run) a Query by hand if required.  Also contains:
  * 'Run' button to perform the Search
  * 'Clear' button to cancel a Search
  * 'Expand' button to open the Expression Editor if UI support is needed
  * 'Save' button to allow the query to be named - and then re-used elsewhere 
  * A dropdown showing all `SharedQueries` together with the last 5 unsaved queries that were run. 

## Entitlements

Query supports these Entitlement Rules:

* **Full**: Everything is available to the User

* **Hidden**: Everything is hidden from the User

* **ReadOnly**: User can run Queries in Predefined Config but not edit or delete them, nor add others.

## FAQ

**Can we run Queries on the server?**

Yes, through setting the [ServerSearchOptions](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_searchoptions_.searchoptions.html#serversearchoptions) in SearchOptions.

**Does Query update if I edit the data in the grid?**

Yes, as soon as you make an edit AdapTable will re-evaluate if that row should be visible or not and react accordingly.

Note that this is the default behaviour. You can change this to Never, or only after a ThrottleDelay by setting the 
[filterActionOnUserDataChange](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_filteroptions_.filteroptions.html#filteractiononuserdatachange) property in FilterOptions.

**Does Query update if the underlying data changes?**

That depends on what you have specified for the
[filterActionOnExternalDataChange](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_filteroptions_.filteroptions.html#filteractiononexternaldatachange) property in FilterOptions.

The default is *Never* meaning Queries won't update as ticking data changes or the underlying data set changes. But you can change this to *Always* or after a *ThrottleDelay*.

**Can we re-use the same query in different Functions - e.g. create a Query in Plus / Minus and use it also in Report?**

Yes - by using a Shared Query.  This allows you to use the same Query for searching, styling, reports setc.

### Further Information

- [Query State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_querystate_.querystate.html)

- [Query Api](https://api.adaptabletools.com/interfaces/_src_api_queryapi_.queryapi.html)

- [Search Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_searchoptions_.searchoptions.html)

- [Query Demo](https://demo.adaptabletools.com/search/aggridcurrentquerydemo)



## Demos

The following demos all contain Expressions:

- [Current Query Demo](https://demo.adaptabletools.com/search/aggridcurrentquerydemo)
- [Alerts Demo](https://demo.adaptabletools.com/alertsmessages/aggridalertdemo)
- [Cell Validation Demo](https://demo.adaptabletools.com/edit/aggridcellvalidationdemo)
- [Conditional Style Demo](https://demo.adaptabletools.com/style/aggridconditionalstyledemo)
- [Export Demos](https://demo.adaptabletools.com/export)
- [Plus / Minus Demo](https://demo.adaptabletools.com/edit/aggridplusminusdemo)
- [User Filter Demo](https://demo.adaptabletools.com/filters/aggriduserfiltersdemo)

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us/articles/360007083017-Help-) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
