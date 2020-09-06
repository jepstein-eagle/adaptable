# Query (AdaptableFunction)

The Query Function enables you to build complex searches using [*Expressions*](https://api.adaptabletools.com/classes/_src_predefinedconfig_common_expression_.expression.html) (aka Queries)

These searches can include a very wide variety of *Search Criteria* and run across multiple columns.

 > When an Query is applied, AdapTable will **only display those rows that match all of the Conditions in the Query**.

Queries are named and saved and, therefore, available for re-use.

Queries can be provided at design-time (through [Predefined Config](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_querystate_.querystate.html)) or at run-time through the UI (if Entitlements allow).

## UI Elements

Query includes the following UI Elements:

- **Popup** - Shows a list of existing Queries with *Edit* and *Delete* buttons, and a Radio Button to select one to be run.  Plus an *Add* button to start the Query Wizard.

- **Wizard** - A series of steps facilitating the creation and editing of Queries.

- **Toolbar** - Provides a list of the available Queries in a dropdown, together with buttons for adding / adding / deleting.

- **Tool Panel** - Same as Toolbar above.

## Entitlements

Query supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: User can run Queries in Predefined Config but not edit or delete them, nor add others.

## FAQ

**Can we run Queries on the server?**

Yes, through setting the [ServerSearchOption](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_searchoptions_.searchoptions.html#serversearchoption) in SearchOptions.

**Does Query update if I edit the data in the grid?**

Yes, as soon as you make an edit AdapTable will re-evaluate if that row should be visible or not and react accordingly.

Note that this is the default behaviour. You can change this to Never, or only after a ThrottleDelay by setting the 
[filterActionOnUserDataChange](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_filteroptions_.filteroptions.html#filteractiononuserdatachange) property in FilterOptions.

**Does Query update if the underlying data changes?**

That depends on what you have specified for the
[filterActionOnExternalDataChange](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_filteroptions_.filteroptions.html#filteractiononexternaldatachange) property in FilterOptions.

The default is *Never* meaning Queries won't update as ticking data changes or the underlying data set changes. But you can change this to *Always* or after a *ThrottleDelay*.

### Further Information

- [Query State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_querystate_.querystate.html)

- [Query Api](https://api.adaptabletools.com/interfaces/_src_api_queryapi_.queryapi.html)

- [Search Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_searchoptions_.searchoptions.html)

- [Query Demo](https://demo.adaptabletools.com/search/aggridquerydemo)


# AdapTable Expressions (Queries) Guide

Many of the functions in AdapTable are powered by an `Expression`.

This is essentially a powerful multi-column query that evaluates on a row by row basis whether that row 'passes'.

> The Expression object and its constituent properties is described from a code perspective in the [Adaptable Developer Documentation](https://api.adaptabletools.com/classes/_src_predefinedconfig_common_expression_.expression.html) 

## Terminology

Strictly speakng an **Expression** is an instruction that tells AdapTable to find data that matches specific search criteria.

An Expression contains one or more **Conditions**: a condition is a set of rules that apply to a single Column. 

Each Condition contains one or more **Criteria**:  these are the values that must be matched for the row / cell to be returned by the Query.


## Expression Contents

There are 3 types of Criteria in a Condition:

- **Column Values**
  This lists all the values in the chosen Column .

  By default AdapTable will populate the listbox with all the distinct values for that column currently in the grid.

  However you can, alternatively, specify what the permitted values are for any column and then only those values will be displayed.  (See User Interface Config).

  A third alternative is to use the getColumnValues property of Query Options which provides a callback function to be called by AdapTable whenever column values are required.  The implementation for this callback is provided by  each user and allows them to react dynamically each time a filter is opened or a Query is built.

  You  can find out more about the 3 different options available in the [Column Values FAQ](../faqs/adaptable-column-values-faq.md).
  

- **Filters**
  This will list all System Filters (for the column's datatype) and any User Filters or Named Filters that you have previously created for that column (which are displayed in italics).

  The filter options visible will differ depending on the datatype of the column. 

 
- **Ranges**. These are small expressions that you create via the Add Range button. Each Range consists of an Operator and an Operand. An Operand can be either a value (e.g. > 32) or another Column (> 'Bid'). 

  > You can use multiple ranges in your query. When you have defined one range, click the Add Range Entry button to add another.

  > When creating a Range Filter, you can choose between entering a value (e.g. > 50) or referencing another column (e.g. > 'Bid')


  The available Operators are:

  | Operator  	              | Description                                  | Columns           |
  | --------  	              | ------                                       | -------           | 
  |>                          | Greater Than                                 | Number, Date      | 
  |>=                         | Greater Than or Equal To                     | Number, Date      | 
  |<                          | Less Than                                    | Number, Date      | 
  |<=                         | Less Than or Equal To                        | Number, Date      | 
  |=                          | Equal To                                     | Number, Date, Text| 
  |< >                        | NotEqual To                                  | Number, Date, Text| 
  |Between                    | In range between two values                  | Number, Date      | 
  |Contains                   | Query value appears anywhere in Cell         | Text              | 
  |Starts With                | Query value appears at beginning of Cell     | Text              | 
  |Ends With                  | Query value appears at end of Cell           | Text              | 
  |Regex                      | Query can be defined as a Regular Expression | Text              | 


### Preview Panel
AdapTable displays all the Conditions that are in place for the query in the Preview panel. 

The Preview Panel also allows for Criteria in each Condition to be edited and deleted.

## Functions using Expressions

These are the following AdapTable Functions that use Expressions - together with a description of what the Expression does when its run:

| Function  	      | Result                                                                                       |
| --------  	      | ------                                                                                       | 
| CurrentQuery      | AdapTable displays only those rows that match the Query's 'Expression'  | 
| Alerts 	          | The Alert is only triggered if the data change matches the Expression's Critieria.           | 
| Cell Validation	  | Cell Validation Rule will be applied if Cell being edited matches the Expression's Critieria | 
| Conditional Style | Style is only applied to Cells and Rows in Grid that that match the Expression's Critieria   | 
| Export 	          | Only rows which match the query are included in the data range that is exported              | 
| Plus / Minus 	    | The Plus/Minus settings for a column are used if the Row being 'nudged' matches query        | 
| User Filter 	    | Applies to single column only - only values which match filter criteria return true          | 

## FAQ

**Can a user include column values in a Query that are not present in the grid when the Query is created?**

Yes.  The easiest way to do this is via Permitted Values.  You can set the permitted vales for each column, and can include any values you want.  (See Column Values for more information).

Additionally, if the Query is built at design time and shipped with the product then it can include any Column Values that the developers want to include - they don't need to be present in the grid at the time of creation.

**Can we add our own list of items for the Column Values listbox in the Query Builder?**

Yes.  The AdaptableOptions object has a getColumnValues property; this property is a function called each time column values are required.  It returns a Promise of a string array.

**Can we re-use the same query in different Functions - e.g. create a Query in Plus / Minus and use it also in Report?**

Yes - by using a Shared Query.

**Can we add our own filters to the list shown in a query?**

Yes you can - but per-column only. This is achieved by using User Filters.

**Can a Range reference other columns e.g. Trade Date > Effective Date?**

Yes, this feature was introduced in 1.6. When creating a range you have the choice of comparing to an absolute value or that in another column.

**Can a Range reference other columns and absolute values e.g. 'Bid' > ('Ask' +5)?**

Not at the moment. But we might add this functionality in future releases.

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
