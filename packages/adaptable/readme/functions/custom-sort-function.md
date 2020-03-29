# Custom Sort (AdaptableFunction)

The Custom Sort([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `CustomSort`) Function enables columns to be given a different sort order to the default for their data type.

This is useful when users need to order a column in an non-standard way (i.e. not in alphabetical, numerical, or date order). For example, if they want to sort a Rating column according to the rating (i.e. 'AAA', 'AA' etc), rather than alphabetically.

> The default sort order for text columns is alphabetical order; for numerical columns it is high-low order; and for date columns it is newest-oldest order.

When a custom sort order is used, AdapTable applies the custom order first. If the column has values that are not included in the custom sort order, they are sorted according to the default order for the column, for example, alphabetical order for text values.

### Defining a Custom Sort
The Custom Sort section of Predefined Config can accept 2 types of Custom Sort definitions:

- a 'hardcoded' list of values to use when sorting

- a 'comparer'-type function which will be evaluated each time sort is applied 
    
    > If using the function then only the **name** is provided in Predefined Config and the actual **implementation** is given in the [User Functions](https://api.adaptabletools.com/modules/_src_adaptableoptions_userfunctions_.html) section of Adaptable Options.

Only one Custom Sort can be supplied per column.

## UI Elements
Custom Sort includes the following UI Elements:

- **Popup** - Shows a list of existing Custom Sorts with *Edit* and *Delete* buttons.  Plus an *Add* button to start the Custom Sort Wizard.

- **Wizard** - A series of steps facilitating the creation and editing of a Custom Sort.

- **Column Menu** - The `Create Custom Sort` Menu Item starts the Custom Sort wizard; if the column already has a Custom Sort it says `Edit GCustom Sort`.

## Entitlements

Custom Sort supports these Entitlement Rules:

- **Full**: Everything is available to the User - Custom Sorts can be created, edited or deleted.

- **Hidden**: The function will not be applied

- **ReadOnly**: User sort columns that have Custom Sorts in Predefined Config but not edit or delete them, nor add others.

## FAQ

**Not all the values we want to include in the sort are currently in the grid, so they dont appear in the dropdown.  Can we add items by hand?**

That is not possible because in previous versions where it was, users ended up with multiple spelled variations of the same item. 

However there is an option for developers to supply their own list of values to the listbox so it can contain all the items that you will require for your sort (see [Getting Distinct Column Values FAQ](../faqs/adaptable-column-values-faq.md))

Additionally, if you provide a Custom Sort as part of your Predefined Config then it can contain whichever values you want.

**Can we run the Custom Sort when pivoting?**

Yes - any column that has a Custom Sort will have it automatically applied if the column is part of a pivot view.

### Further Information

- [Custom Sort State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_customsortstate_.customsortstate.html)

- [Custom Sort Api](https://api.adaptabletools.com/interfaces/_src_api_customsortapi_.customsortapi.html)

- [Custom Sort Demo](https://demo.adaptabletools.com/gridmanagement/aggridcustomsortdemo)

