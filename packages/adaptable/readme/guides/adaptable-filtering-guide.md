# AdapTable Filtering Guide

Filtering is one of the most commonly used - and powerful - functions offered by AdapTable.

It is designed to be intuitive and easy to use, but that simplicity of use 'hides' a great deal of complexity in terms of the filtering options and functonalities on offer.

There are 2 'controls' which provide filtering capabilities in AdapTable:

- **Column Filter Component**:  This powerful control allow you to buld very complex Column-based filters entirelly through the UI.

- **Quick Filter Bar**:  The textbox that is displayed in the row between the Column Header and the first data row in the grid - allows Filters to be created through text entry.

Both controls update the same [ColumnFilterState](../../src/PredefinedConfig/ColumnFilterState.ts) section in AdaptableState.

## Column Filter Component

Each column in Adaptable - which is marked as filterable - will have Column Filter Component to enable quick filter selection.

The Component can appear in 2 places:

1. In the dropdown which appears when you click the filter icon in any Column Header, or if you select the Filter tab in the Column Header Menu.
  
2. In the Filter ToolPanel appears in the 'sidebar', by default at the right hand side of the grid.  

Users can create as many Column Filters as required and the grid will automatically update so that it only shows rows that match the filters set for the column.

Any active Column Filters when the system closes are automatically persisted and then immediately re-applied on startup.

> Note: Column Filters cannot be saved and re-used elsewhere. But they can be easily converted into named - and re-usable [User Filters](../functions/user-filter-function.md) for this very purpose.

See the [Column Filter Read Me](../functions/column-filter-function.md) for more information on Column Filters and creating User Filters.

There are 2 types of filter that you can apply:

1. **Range Filters**: A range uses an 'Operator' (e.g. Greater Than, Starts With etc) and an Operand (ie. value) that you specify. 

    They are similar to the Ranges used in Expressions (Queries).

    The Operators will vary depending on the data type of the column - see the Appendix below for a full list.

    > Most Range Operands will be a value (e.g. > 50) but they can referece another column (e.g. > 'Bid')

2. **Value Filters**: A list of actual values to filter against.  
    
    There are, actually, up to 4 groups of Filters that can appear in the dropdown list:

    - **System Filters**: filters shipped by AdapTable and for which it provides an evaluation (e.g. `Tomorrow` for Date columns or `Positive` for number columns).  

        See the Appendix for the full list of System Filters and their associated column types.
    
        > You can choose - through System Filter Config - which, if any, System Filters you want available

    - **User Filters**: filters created by Users (either at design-time or run-time). 

        These are essentially named Column Filters (allowing for recursion) e.g. 'This Business Year' could be a filter for 'Between 1/05/20 and 31/04/21'

        See the [User Filter Read Me](../functions/user-filter-function.md) for more information on how to create User Filters.

    - **Named Filters**: filters created by developers at design-time and provided through Predefined Config.
    
        Named Filtes contain a Predicate function that will be run each time the filter is evaluated.

        See the [Named Filter Read Me](../functions/named-filter-function.md) for more information on how to create Named Filters.

    - **Column Values**: the distinct column values for that Column.  

        > Read [Showing Distinct Column Values FAQ](../faqs/adaptable-column-values-faq.md) to learn how AdapTable retrieves column values

    > System, User and Named Filters all appear italicised in the Filter dropdown

## Quick Filter Bar

Some vendor grids like ag-Grid have a 'Quick Filter' : an area underneath the Column Header which users can access to filter quickly.

Each column in Adaptable - which is marked as filterable - has a filter dropdown which allows for quick filter selection.

> In version 23 of ag-Grid the Quick Filter Bar is set at **column** level and not grid level (through the `floatingFilter` property).

If the Quick Filter is visible then AdapTable will provide additional functionality such as wildcards.

The Quick Filter bar allows you to use free text to find the data you want for a column.

> By default, the filter uses 'Contains' when searching - so any cell which **contains** the inputted text will be included in the filter results.

You can change this behaviour by using one of the wildcards (e.g. 'Starts With') that are listed below.

AdapTable has special characters or wildcards that you can use to find text more easily. e.g. '5 : 15' will find all rows where the value for that column is between 5 and 15. See Appendix at foot of page for more details.

> You can show / hide the Quick Filter Bar any time you want by selecting the 'Show / Hide Quick Filter' menu option from any Column menu, or by clicking the Show/Hide button in the Column Filter Function Toolbar.

The Quick Filter bar is not available on all grids - only those where the underlying vendor grid supports it.

> If you are using ag-Grid then you will need to set the floatingFilter property in GridOptions to true.

If you want to use the underlying vendor grid's quick filter bar instead of the one provided by AdapTable then set the useAdaptableQuickFilter property to false.

## Demos

The [Demo Site's filter section](https://demo.adaptabletools.com/filters) contains a number of filtering-related demos

## Appendices

### Column Range Filters

| Operator               | Columns            |
| ---------------------- | ------------------ |
| Greater Than           | Number             |
| Greater Than or Equals | Number             |
| Less Than              | Number             |
| Less Than or Equals    | Number             |
| After                  | Dat                |
| After or On            | Date               |
| Before                 | Date               |
| Before or On           | Date               |
| Equals                 | Number, Date, Text |
| NotEquals              | Number, Date, Text |
| Between                | Number, Date       |
| Contains               | Text               |
| Not Contains           | Text               |
| Starts With            | Text               |
| Ends With              | Text               |
| Matches Expression     | Text               |


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
| This Year               | Date                 | 



### Quick Filter Bar Wildcards

| Symbol   | Value                  | Columns      | Example     |
| -------- | ---------------------- | ------------ | ----------- |
| %        | Contains (the default) | Text, Number | 'S' or 'S%' |
| =        | Equals                 | Text, Number | '=15'       |
| <>       | Not Equals             | Number       | '<> 23'     |
| >=       | Greater Than or Equals | Number       | '>= 49'     |
| >        | Greater Than           | Number       | '> 5'       |
| <=       | Less Than or Equals    | Number       | '<= 49'     |
| <        | Less Than              | Number       | '<5'        |
| :        | Between                | Number       | '5 : 100'   |
| *        | Starts With            | Text, Number | 'd*'        |
| !        | Doesn't Contain        | Text, Number | '!he'       |
| 1        | True                   | Boolean      | '1'         |
| t (or T) | True                   | Boolean      | 't'         |
| y        | True                   | Boolean      | 'y'         |
| 0        | False                  | Boolean      | '0'         |
| f (or F) | False                  | Boolean      | 'f'         |
| n        | False                  | Boolean      | 'n'         |

## FAQ

**Can we do AND or OR in the Quick Filter Bar?**

Not at present but this is in the Issue Log and will be added in a future release.

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us/articles/360007083017-Help-) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
