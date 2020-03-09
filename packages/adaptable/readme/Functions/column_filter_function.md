# Column Filter (AdaptableFunction)

The Column Filter ([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `BulkUpdate`) facilitates replacing, via a single action, the cell value in multiple cells (in one column) **with the same new value**.

The 'replacement' value can either be one that already exists in the column or an entirely new one.

## UI Elements
Column Filter includes the following UI Elements:

- **Popup** - Allows you to perform a Column Filter operation on selected columns.  Will show what the new value for each selected cell will be and also whether any cell validation rules will be broken as a result of the update.

- **Toolbar** - Enables Column Filter to be performed - and to provide both an existing column value or a new one.

- **Tool Panel** - Same as Toolbar above.

- **Column Menu** - None

- **Context Menu** - `Apply Column Filter` Menu Item opens Column Filter popup (only visible if selected cells are editable).

## Entitlements
Column Filter supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: N/A

## FAQ

**Can I performa a Column Filter on any column?**

Yes. Unlike Smart Edit which is restricted to numeric columns, Column Filter can be performed on text (string), numeric and date columns.

**With Smart Edit you remember the last saved value but not with Column Filter. Why not?**

It doesnt make sense to store a previous Column Filter value as by its nature its usually a one-off operation.

**Can I perform Column Filter on a readonly column?**

No, Column Filter only applies on editable columns.

**Can I perform a Column Filter across more than one column?**

No, like Smart Edit, Column Filter works on only one column at a time.

**Can I choose to enter a value that is not currently in the column?**

Yes, you can. The selector for Column Filter allows you to add your own value which is not currently contained in the column. Simply enter the new value you wish to set, and then click the selector to confirm.


### Further Information
- [Column Filter State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_cellsummarystate_.cellsummarystate.html)

- [Column Filter Api](https://api.adaptabletools.com/interfaces/_src_api_cellsummaryapi_.cellsummaryapi.html)

- [Column Filter Demo](https://demo.adaptabletools.com/gridmanagement/aggridcellsummarydemo)





