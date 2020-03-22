# Named Filter (AdaptableFunction)

The Named Filter([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `NamedFilter`) Function provides a way to provide an entirely new Data Set to AdapTable based on user selection.

Named Filters allow you to provide at design-time a predicate function that will evaluate each time the filter is run.

You create the Named Filter and the associated Predicate function in the Named Filter section of Predefined Config.

To apply, at run-time, a Named Filter that has already been created click on the filter icon in the column header and select the Named Filter from the Filters list.

Tip
The name that you give to the Named Filter is what will appear in the Column Filter dropdown and in the Query Builder in future so make it as succinct but descriptive as possible.

## UI Elements
To Do

## Entitlements
To Do

## FAQ

**Why can't I save my Named Filter predicate with my config?**

This is because the Config cannot properly store functions as it is JSON.

So, as a result, you provide the function with your Adaptable Options, and AdapTable will find it and run it when required.


### Further Information

To Do

