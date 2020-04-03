# Bulk Update (AdaptableFunction)

The Bulk Update ([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `BulkUpdate`) facilitates replacing, via a single action, the cell value in multiple cells (in one column) **with the same new value**.

The 'replacement' value can either be one that already exists in the column or an entirely new one.

> Unlike Smart Edit which updates the cell based on its current contents, Bulk Updates replaces the existing cell value with a new value provided by the User.

Bulk Update can bre applied on text, numeric and date columns. The input will change depending on the datatype of the column.

> If updating a date column you are provided with a calendar when entering the new value.

Users are able to choose between selecting an existing column value or providing their own.

If the proposed Bulk Update breaks a [Cell Validation Rule](./cell-validation-function.md) then the edit will be prevented (or a warning is displayed).

## UI Elements
Bulk Update includes the following UI Elements:

- **Popup** - Allows you to perform a Bulk Update operation on selected cells.  Will show what the new value for each selected cell will be and also whether any cell validation rules will be broken as a result of the update.

- **Toolbar** - Enables Bulk Update to be performed - and to provide both an existing column value or a new one.

- **Tool Panel** - Same as Toolbar above.

- **Context Menu** - `Apply Bulk Update` Menu Item opens Bulk Update popup (only visible if selected cells are editable and from a single column).

## Entitlements
Bulk Update supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: N/A

## FAQ

**Can I performa a Bulk Update on any column?**

Yes. Unlike Smart Edit which is restricted to numeric columns, Bulk Update can be performed on text (string), numeric and date columns.

**With Smart Edit you remember the last saved value but not with Bulk Update. Why not?**

It doesnt make sense to store a previous bulk update value as by its nature its usually a one-off operation.

**Can I perform Bulk Update on a readonly column?**

No, Bulk Update only applies on editable columns.

**Can I perform a Bulk Update across more than one column?**

No, like Smart Edit, Bulk Update works on only one column at a time.

**Can I choose to enter a value that is not currently in the column?**

Yes, you can. The selector for Bulk Update allows you to add your own value which is not currently contained in the column. Simply enter the new value you wish to set, and then click the selector to confirm.


### Further Information
- [Bulk Update State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_bulkupdatestate_.bulkupdatestate.html)

- [Bulk Update Api](https://api.adaptabletools.com/interfaces/_src_api_bulkupdateapi_.bulkupdateapi.html)

- [Edit Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_editoptions_.editoptions.html)

- [Bulk Update Demo](https://demo.adaptabletools.com/edit/aggridbulkupdatedemo)