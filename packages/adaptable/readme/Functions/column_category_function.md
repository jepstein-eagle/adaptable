# Column Category (AdaptableFunction)

The Column Category ([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `ColumnCategory`) This is a way to manage large groups of columns. A Column Category is simply a name you give to a group of columns that you specify.  The name of this category is stored with your user state.

You will most likely create your categories using at design time through Column Category Config but you can also use the Column Category screen too create and edit them at run time too.

Note
Column Categories are most used within Column Chooser as a way to easily manage large groups of columns, but you can also use them in Conditional Style to colour just the columns in that Category.

## UI Elements
Column Category includes the following UI Elements:

- **Popup** - Allows you to perform a Column Category operation on selected columns.  Will show what the new value for each selected cell will be and also whether any cell validation rules will be broken as a result of the update.

- **Toolbar** - Enables Column Category to be performed - and to provide both an existing column value or a new one.

- **Tool Panel** - Same as Toolbar above.

- **Column Menu** - None

- **Context Menu** - `Apply Column Category` Menu Item opens Column Category popup (only visible if selected cells are editable).

## Entitlements
Column Category supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: N/A

## FAQ

**Can I performa a Column Category on any column?**

Yes. Unlike Smart Edit which is restricted to numeric columns, Column Category can be performed on text (string), numeric and date columns.

**With Smart Edit you remember the last saved value but not with Column Category. Why not?**

It doesnt make sense to store a previous Column Category value as by its nature its usually a one-off operation.

**Can I perform Column Category on a readonly column?**

No, Column Category only applies on editable columns.

**Can I perform a Column Category across more than one column?**

No, like Smart Edit, Column Category works on only one column at a time.

**Can I choose to enter a value that is not currently in the column?**

Yes, you can. The selector for Column Category allows you to add your own value which is not currently contained in the column. Simply enter the new value you wish to set, and then click the selector to confirm.


### Further Information
- [Column Category State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_columncategorystate_.columncategorystate.html)

- [Column Category Api](https://api.adaptabletools.com/interfaces/_src_api_columncategoryapi_.columncategoryapi.html)

- [Column Category Demo](https://demo.adaptabletools.com/column/aggridcolumncategorydemo)
