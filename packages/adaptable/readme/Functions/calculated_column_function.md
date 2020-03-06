# Calculated Column (AdaptableFunction)

The Calculated Column ([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `BulkUpdate`) facilitates replacing, via a single action, the cell value in multiple cells (in one column) **with the same new value**.

The 'replacement' value can either be one that already exists in the column or an entirely new one.

## UI Elements
Calculated Column includes the following UI Elements:

- **Popup** - Allows you to perform a Calculated Column operation on selected columns.  Will show what the new value for each selected cell will be and also whether any cell validation rules will be broken as a result of the update.

- **Toolbar** - Enables Calculated Column to be performed - and to provide both an existing column value or a new one.

- **Tool Panel** - Same as Toolbar above.

- **Column Menu** - None

- **Context Menu** - `Apply Calculated Column` Menu Item opens Calculated Column popup (only visible if selected cells are editable).

## Entitlements
Calculated Column supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: N/A

## FAQ

**Can I performa a Calculated Column on any column?**

Yes. Unlike Smart Edit which is restricted to numeric columns, Calculated Column can be performed on text (string), numeric and date columns.

**With Smart Edit you remember the last saved value but not with Calculated Column. Why not?**

It doesnt make sense to store a previous Calculated Column value as by its nature its usually a one-off operation.

**Can I perform Calculated Column on a readonly column?**

No, Calculated Column only applies on editable columns.

**Can I perform a Calculated Column across more than one column?**

No, like Smart Edit, Calculated Column works on only one column at a time.

**Can I choose to enter a value that is not currently in the column?**

Yes, you can. The selector for Calculated Column allows you to add your own value which is not currently contained in the column. Simply enter the new value you wish to set, and then click the selector to confirm.


### Further Information
- [Calculated Column State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_bulkupdatestate_.bulkupdatestate.html)

- [Calculated Column Api](https://api.adaptabletools.com/interfaces/_src_api_bulkupdateapi_.bulkupdateapi.html)

- [Edit Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_editoptions_.editoptions.html)

- [Calculated Column Demo](https://demo.adaptabletools.com/edit/aggridbulkupdatedemo)





