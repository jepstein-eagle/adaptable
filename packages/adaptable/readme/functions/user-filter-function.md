# User Filter (AdaptableFunction)

The User Filter([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `UserFilter`) Function provides a way to provide an entirely new Data Set to AdapTable based on user selection.

The User Filter Function allows you to create your own custom filters to be applied in a particular column. They are especially useful if you regularly build queries, as you can select user filters from the query filter list. They can also save you time if you often use multi-value filters on a column, as you will be able to apply a multi-value filter by selecting one option.

Note
A User Filter is a column filter that you create. When you set one up, you define:

Which column the User Filter will be applied

The criteria for the User Filter

The name of the User Filter. (This name is then included in the Filters list in the Query Builder for the associated column).

To apply a User Filter that has already been created click on the filter icon in the column header and select the User Filter from the Filters list.

Note
You can only set one Condition in a User Filter as it applies to a single column only.

Tip
The name that you give to the Filter is what will appear in the Column Filter dropdown and in the Query Builder in future so make it as succinct but descriptive as possible.

## UI Elements
To Do

## Entitlements
To Do

## FAQ

Can a User Filter include more than one column?

No.  A User Filter references just one column so that it can then be re-used in other queries and made available in the Column Filter dropdown.  You can create multi-column queries but they are Advanced Searches.

Can we ship with our own User Filters?

Yes you can.  Create them in User Filter Config. You can also create dynamic User Filters which contain a predicate that is evaluated at runtime.

### Further Information

To Do

