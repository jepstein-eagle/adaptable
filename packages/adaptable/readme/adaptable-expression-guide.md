# AdapTable Expressions Guide

Many of the functions in AdapTable use a query, which is an instruction that tells the AdapTable to find data that matches specific search criteria. For example, the Advanced Search feature uses a query to tell AdapTable to find and return rows that have specific values, such as Country is 'USA' and Currency is 'EUR'.

It is likely that you will need to build or use queries, so its worthwhile understanding the terminology used.

Terminology

A Query contains one or more Conditions. Each Condition contains one or more Criteria:

Term

Description

Query

An instruction to find and return data. It contains one or more Conditions. 

Condition

A set of rules that apply to a column. The rules are called Criteria.

Criteria

The values that must be matched for the row / cell to be returned by the Query.

When you have created the criteria and conditions, they are stored collectively as a query.

Query Criteria

There are 3 types of Criteria in a Condition:

Column Values. This lists all the column values available to you.

Note
By default the listbox will show all the distinct values for that column currently in the grid.

However you can, alternatively, use configuration to specify what the permitted values are for any column and then only those values will be displayed.  (See User Interface Config).

A third alternative is to use the getColumnValues property of Query Options which provides a callback function to be called by AdapTable whenever column values are required.  The implementation for this callback is provided by  each user and allows them to react dynamically each time a filter is opened or a Query is built.

You  can find out more about the 3 different options available at Column Values.

Filters.. This will list all System Filters (for the column's datatype) and any User Filters or Named Filters that you have previously created for that column (which are displayed in italics).

The filter options visible will differ depending on the datatype of the column. The System Filters available are:

Search Filter

Evaluation Rule

Columns

Blanks

Where no value for the selected column (hides any non-empty rows).

Text, Date, Number

Non Blanks

Where is a value for the selected column (hides any empty rows).

Text, Date, Number

Positive

If Column contains Positive number.

Number

Negative

If Column contains Negative number.

Number

Zero

If Column contains Positive number.

Number

True

If Column is 'True'

True/False

False

If Column is 'False'

True/False

Today

If Column contains today's date.

Date

In Past

If Column value is earlier than today's date.

Date

In Future

If Column value is later than today's date.

Date

Yesterday

If Column value is yesterday's date.

Date

Tomorrow

If Column value is tomorrow's date.

Date

Next Working Day

If Column value is the next working day (based on the current Calendar).

Date

Previous Working Day

If Column value is the previous working day (based on the current Calendar).

Date

Ranges. These are small expressions that you create via the Add Range button. Each Range consists of an Operator and an Operand. An Operand can be either a value (e.g. > 32) or another Column (> 'Bid'). 

The available Operators are:

Operator

Description

Columns

>

Greater than.

Number, Date

>=

Greater than or equal to.

Number, Date

<

Less than.

Number, Date

<=

Less than or equal to.

Number, Date 

=

Equal to.

Number, Date, Text

< >

Not equal to.

Number, Date, Text

Between

In the range between two specified values.

Number, Date

Contains

The query value appears anywhere in the cell.

Text

Starts With

The query value appears at the beginning of the cell.

Text 

Ends With

The query value appears at the end of the cell.

Text 

Regex

Allows you to define the query as a Regular Expression.

Text 

You can use multiple ranges in your query. When you have defined one range, click the Add Range Entry button to add another.

You can see any conditions that are in place for the query in the Preview panel. which will also let you edit and delete criteria.

How Queries Work

What happens when AdapTable applies the rules of the query, and finds matching rows? The outcome varies, depending on which function you are using.

Feature

Result

Advanced Search

The grid displays only those rows that match the Advanced Search's query criteria. Rows that do not match the query are hidden.

Alerts

The Alert is only triggered if the data change matches the query critieria.

Cell Validation

The Cell Validation rule will be applied if the row which contains the cell being edited matches the query.

Conditional Style

The Conditional Style is only applied in rows that match the query; if there are no rows in the grid that match the query, the style is not used.

Export

Only rows which match the query are included in the range that is exported.

Plus / Minus

The Plus/Minus settings for a column are only used if the row that contains the cell being 'nudged' matches the query. If it doesn't, then the default nudge value for the column is used. 

User Filter

This applies on a single column only - only those values which match the filter criteria are returned in the result set.


 
## Demos

The following demos all contain Expressions:

To Do

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
