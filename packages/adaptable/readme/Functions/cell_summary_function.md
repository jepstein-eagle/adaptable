# Cell Summary (AdaptableFunction)

The Cell Summary ([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `BulkUpdate`) facilitates replacing, via a single action, the cell value in multiple cells (in one column) **with the same new value**.

The 'replacement' value can either be one that already exists in the column or an entirely new one.

## UI Elements
Cell Summary includes the following UI Elements:

- **Popup** - Allows you to perform a Cell Summary operation on selected columns.  Will show what the new value for each selected cell will be and also whether any cell validation rules will be broken as a result of the update.

- **Toolbar** - Enables Cell Summary to be performed - and to provide both an existing column value or a new one.

- **Tool Panel** - Same as Toolbar above.

- **Column Menu** - None

- **Context Menu** - `Apply Cell Summary` Menu Item opens Cell Summary popup (only visible if selected cells are editable).

## Entitlements
Cell Summary supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: N/A

## FAQ

**Can I performa a Cell Summary on any column?**

Yes. Unlike Smart Edit which is restricted to numeric columns, Cell Summary can be performed on text (string), numeric and date columns.

**With Smart Edit you remember the last saved value but not with Cell Summary. Why not?**

It doesnt make sense to store a previous Cell Summary value as by its nature its usually a one-off operation.

**Can I perform Cell Summary on a readonly column?**

No, Cell Summary only applies on editable columns.

**Can I perform a Cell Summary across more than one column?**

No, like Smart Edit, Cell Summary works on only one column at a time.

**Can I choose to enter a value that is not currently in the column?**

Yes, you can. The selector for Cell Summary allows you to add your own value which is not currently contained in the column. Simply enter the new value you wish to set, and then click the selector to confirm.


### Further Information
- [Cell Summary State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_cellsummarystate_.cellsummarystate.html)

- [Cell Summary Api](https://api.adaptabletools.com/interfaces/_src_api_cellsummaryapi_.cellsummaryapi.html)

- [Cell Summary Demo](https://demo.adaptabletools.com/gridmanagement/aggridcellsummarydemo)





