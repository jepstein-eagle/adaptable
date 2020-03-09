# Column Chooser (AdaptableFunction)

The Column Chooser ([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `BulkUpdate`) facilitates replacing, via a single action, the cell value in multiple cells (in one column) **with the same new value**.

The 'replacement' value can either be one that already exists in the column or an entirely new one.

## UI Elements
Column Chooser includes the following UI Elements:

- **Popup** - Allows you to perform a Column Chooser operation on selected columns.  Will show what the new value for each selected cell will be and also whether any cell validation rules will be broken as a result of the update.

- **Toolbar** - Enables Column Chooser to be performed - and to provide both an existing column value or a new one.

- **Tool Panel** - Same as Toolbar above.

- **Context Menu** - `Apply Column Chooser` Menu Item opens Column Chooser popup (only visible if selected cells are editable).

## Entitlements
Column Chooser supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: N/A

## FAQ

**Can I performa a Column Chooser on any column?**

Yes. Unlike Smart Edit which is restricted to numeric columns, Column Chooser can be performed on text (string), numeric and date columns.

**With Smart Edit you remember the last saved value but not with Column Chooser. Why not?**

It doesnt make sense to store a previous Column Chooser value as by its nature its usually a one-off operation.

**Can I perform Column Chooser on a readonly column?**

No, Column Chooser only applies on editable columns.

**Can I perform a Column Chooser across more than one column?**

No, like Smart Edit, Column Chooser works on only one column at a time.

**Can I choose to enter a value that is not currently in the column?**

Yes, you can. The selector for Column Chooser allows you to add your own value which is not currently contained in the column. Simply enter the new value you wish to set, and then click the selector to confirm.


### Further Information
- [Column Chooser State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_cellsummarystate_.cellsummarystate.html)

- [Column Chooser Api](https://api.adaptabletools.com/interfaces/_src_api_cellsummaryapi_.cellsummaryapi.html)

- [Column Chooser Demo](https://demo.adaptabletools.com/gridmanagement/aggridcellsummarydemo)