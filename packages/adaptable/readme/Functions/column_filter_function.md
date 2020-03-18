# Column Filter (AdaptableFunction)

The Column Filter ([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `ColumnFilter`) Function facilitates creating powerful, dynamic filters for any column in AdapTable.


## UI Elements
To Do

## Entitlements
To Do

## FAQ

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

### Further Information

To Do

