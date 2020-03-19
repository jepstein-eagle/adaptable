# AdapTable Filtering Guide

Each column in the grid has a filter dropdown. This allows you to filter any column quickly and easily.

You can select as many filter items as you want. When you have made your choice, the grid updates so that it only shows rows that match the filters you have set for the column.

There are 2 types of filter that you can apply:

Range Filters. This allows you to create your own filter using an 'Operator' (e.g. Greater Than, Starts With etc) and a value that you specify. The Operators will vary depending on the data type of the column.

Note
When creating a Range Filter, you can choose between entering a value (e.g. > 50) or referencing another column (e.g. > 'Bid')

Value Filters. This provides a list of values from which you can select as many as you wish. There are 3 groups of Filters in the dropdown list:

Built-in system filters provided by AdapTable

Any user filters or named filters that you have created, either at design time (through predefined config) or at run-time

All distinct values for that column.

Tip
To remove all the filters for a column click the 'Clear' button.

The full list of potential value filters are:

Search Filter

Rows Returned

Columns

Blanks

Where the cell value is empty.

Text, Date, Number

Non Blanks

Where the cell value is not empty.

Text, Date, Number

Positive

Where the cell value is positive.

Number

Negative

Where the cell value is negative.

Number

Zero

Where the cell value is zero.

Number

True

Where the cell value is true.

True/False

False

Where the cell value is false.

True/False

Today

Where the cell value is current date.

Date

In Past

Where the cell value is before current date. 

Date

In Future

Where the cell value is after current date.

Date

Yesterday

Where the cell value is yesterday's date.

Date

Tomorrow

Where the cell value is tomorrow's date.

Date

Next Working Day

Where the cell value is the next working day.

Date

Previous Working Day

Where the cell value is the previous working day.

Date

<distinct cell value>

Where cell value matches the <distinct cell value>

All

<user filter>

Where cell value matches the <user filter>

All

Tip
If you can't find the information you are looking for in your grid, use the Column Filter Function to check if any filters are applied. Click the 'Clear' button to remove all filters for these columns.

You should also check to see if any columns have been hidden, as it is possible that a hidden column has a filter applied (the filter will affect your grid, even though the column is not shown).

Re-Using Column Filters

Any active column filters when the system closes are immediately re-applied on startup.

If you want to save and re-use Column Filters in other functions (e.g. Advanced Search), click the save button in the top of the Filter Form and that will allow you to convert the Column Filter into a named - and re-usable User Filter.

Quick Filter

Some vendor grids like ag-Grid have a 'Quick Filter' : an area underneath the Column Header which users can access to filter quickly.

If the Quick Filter is visible then AdapTable will provide additional functionality such as wildcards.


 
## Demos

Visit the [AdapTable Demo Site](https://demo.adaptabletools.com/filters) to see a number of filtering-related demos

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
