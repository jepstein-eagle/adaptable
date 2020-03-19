# AdapTable Expressions Guide

Many of the functions in AdapTable are powered by an Expression (a.k.a. a query).

 

## Terminology

An **Expression** is essentially an instruction that tells AdapTable to find data that matches specific search criteria.

An Expression contains one or more **Conditions**: a condition is a set of rules that apply to a single Column. 

Each Condition contains one or more **Criteria**:  these are the values that must be matched for the row / cell to be returned by the Query.


## Expression Contents

There are 3 types of Criteria in a Condition:

- **Column Values**. This lists all the column values available to you.

  By default AdapTable will populate the listbox with all the distinct values for that column currently in the grid.

  However you can, alternatively, specify what the permitted values are for any column and then only those values will be displayed.  (See User Interface Config).

  A third alternative is to use the getColumnValues property of Query Options which provides a callback function to be called by AdapTable whenever column values are required.  The implementation for this callback is provided by  each user and allows them to react dynamically each time a filter is opened or a Query is built.

  You  can find out more about the 3 different options available at Column Values.

- **Filters**.. This will list all System Filters (for the column's datatype) and any User Filters or Named Filters that you have previously created for that column (which are displayed in italics).

The filter options visible will differ depending on the datatype of the column. 

See the Filter ReadMe for more information.

- **Ranges**. These are small expressions that you create via the Add Range button. Each Range consists of an Operator and an Operand. An Operand can be either a value (e.g. > 32) or another Column (> 'Bid'). 

 > You can use multiple ranges in your query. When you have defined one range, click the Add Range Entry button to add another.

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


AdapTable displays all the Conditions that are in place for the query in the Preview panel. 

The Preview Panel also allows for Criteria in each Condition to be edited and deleted.

## Functions using Expression

These are the following AdapTable Functions that use Expressions - together with a description of what the Expression does when its run:

| Function  	      | Result                                                                                                |
| --------  	      | ------                                                                                                | 
| Advanced Search   | AdapTable displays only those rows that match the Advanced Search's Conditions and Criteria           | 
| Alerts 	          | The Alert is only triggered if the data change matches the Expression's Critieria.                    | 
| Cell Validation	  | Cell Validation Rule will be applied if Cell being edited matches the Expression's Critieria          | 
| Conditional Style | Conditional Style is only applied to Cells and Rows in Grid that that match the Expression's Critieria| 
| Export 	          | Only rows which match the query are included in the data range that is exported.                      | 
| Plus / Minus 	    | The Plus/Minus settings for a column are used if the Row being 'nudged' matches the query.            | 
| User Filter 	    | Applies to a single column only - only those values which match the filter criteria are returned true | 


## Demos

The following demos all contain Expressions:

- [Advanced Search Demo](https://demo.adaptabletools.com/search/aggridadvancedsearchdemo)
- [Alerts Demo](https://demo.adaptabletools.com/alertsmessages/aggridalertdemo)
- [Cell Validation Demo](https://demo.adaptabletools.com/edit/aggridcellvalidationdemo)
- [Conditional Style Demo](https://demo.adaptabletools.com/style/aggridconditionalstyledemo)
- [Export Demo](https://demo.adaptabletools.com/gridmanagement/aggridexportdemo)
- [Plus / Minus Demo](https://demo.adaptabletools.com/edit/aggridplusminusdemo)
- [User Filter Demo](https://demo.adaptabletools.com/filters/aggriduserfiltersdemo)

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
