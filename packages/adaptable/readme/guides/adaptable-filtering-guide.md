# AdapTable Filtering Guide

Filtering is one of the most common - and powerful - functionalities offered by AdapTable.

It is designeed to be intuitive and easy to use, but there is actualy a lot of different types of filters and options on offer for filtering. 

There are 2 places where filtering can take place:

- **Column Filters**:  The dropdown that appears when you click the filter icon in the Column Header (or in the Tab of the Column Header Menu)
- **Quick Filter Bar**:  The textbox that appears in the row between the Column Header and the first data row in the grid.

## Column Filters

Each column in the grid has a filter dropdown which allows for quick filter selection.

Users can select as many filter items as they want and the grid will automatically update so that it only shows rows that match the filters set for the column.

There are 2 types of filter that you can apply:

- **Range Filters**: This allows you to create your own filter using an 'Operator' (e.g. Greater Than, Starts With etc) and a value that you specify. The Operators will vary depending on the data type of the column.

> When creating a Range Filter, you can choose between entering a value (e.g. > 50) or referencing another column (e.g. > 'Bid')

  

- **Value Filters**: This provides a list of values from which you can select as many as you wish. There are 3 groups of Filters in the dropdown list:

Built-in system filters provided by AdapTable

Any user filters or named filters that you have created, either at design time (through predefined config) or at run-time

All distinct values for that column.

Tip
To remove all the filters for a column click the 'Clear' button.









Tip
If you can't find the information you are looking for in your grid, use the Column Filter Function to check if any filters are applied. Click the 'Clear' button to remove all filters for these columns.

You should also check to see if any columns have been hidden, as it is possible that a hidden column has a filter applied (the filter will affect your grid, even though the column is not shown).

We also allow you to mark a column that is filtered

Re-Using Column Filters

Any active column filters when the system closes are immediately re-applied on startup.

If you want to save and re-use Column Filters in other functions (e.g. Advanced Search), click the save button in the top of the Filter Form and that will allow you to convert the Column Filter into a named - and re-usable User Filter.


## Quick Filter Bar

Some vendor grids like ag-Grid have a 'Quick Filter' : an area underneath the Column Header which users can access to filter quickly.

If the Quick Filter is visible then AdapTable will provide additional functionality such as wildcards.


## FAQs
What are the different types of filter and how do they differ?

There are 4 types of filters in AdapTable:

System Filters - these are filters which AdapTable ships and provides an evaluation for (e.g. Tomorrow for date columns).  You can choose (through System Filter Config which, if any, System Filters you want available and can rely on AdapTable to match rows.

Column Filters - these are the filters that you create when you filter a column level.  They are transient in the sense that you cannot save them (although any Column Filters applied when the grid shuts down will be saved automatically with your state and then reapplied on restart).  If you want deliberately to re-use a Column Filter then you will need to save it (and thereby name it) as a User Filter.

User Filters - these are filters that operate on one column only that you can name and save for re-use (both as column filters and throughout the grid).  

Named Filters- these are filters that you create at design-time and you provide (through Adaptable Options) the Predicate Function that needs to be evaluated each time the filter is run.

Can a Filter include more than one column?

No.  A User Filter references just one column so that it can then be re-used in other queries and made available in the Column Filter dropdown.  You can create multi-column queries but they are Advanced Searches.

Can we ship with our own User Filters?

Yes you can.  Create them in User Filter Config. You can also create dynamic User Filters which contain a predicate that is evaluated at runtime.

Can I save a Column Filter?

Yes, but as a User Filter.  Column Filters are designed to be transient.  If you want to re-use one in other queries then make it a user filter (there are plenty of ways to do that).

Why can't I save my Named Filter predicate with my config?

This is because the Config cannot properly store functions as it is JSON.

So, as a result, you provide the function with your Adaptable Options, and AdapTable will find it and run it when required.

 
## Demos

Visit the [AdapTable Demo Site](https://demo.adaptabletools.com/filters) to see a number of filtering-related demos

## Appendices

### Column Range Filters

| Operator                | Columns            |
| ------                  | -------            | 
| Greater Than            | Number             | 
| Greater Than or Equals  | Number             | 
| Less Than               | Number             | 
| Less Than or Equals     | Number             | 
| After                   | Dat                | 
| After or On             | Date               | 
| Before                  | Date               | 
| Before or On            | Date               | 
| Equals                  | Number, Date, Text | 
| NotEquals               | Number, Date, Text | 
| Between                 | Number, Date       | 
| Contains                | Text               | 
| Not Contains            | Text               | 
| Starts With             | Text               | 
| Ends With               | Text               | 
| Matches Expression      | Text               | 


### System Filters

The System Filters shipped by AdapTable are:

| System Filter   	      | Columns              |
| --------  	          | ------               | 
| Blanks                  | Number, Date, Text   | 
| Non Blanks              | Number, Date, Text   | 
| Positive                | Number               | 
| Negative                | Number               | 
| Zero                    | Number               | 
| True                    | Boolean              | 
| False                   | Boolean              | 
| Today                   | Date                 | 
| In Past                 | Date                 | 
| In Future               | Date                 | 
| Yesterday               | Date                 | 
| Tomorrow                | Date                 | 
| Next Working Day        | Date                 | 
| Previous Working Day    | Date                 | 
| Today                   | Date                 | 

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
