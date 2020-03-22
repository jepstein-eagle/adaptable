# Column Category (AdaptableFunction)

The Column Category ([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `ColumnCategory`) Function provides a way to manage large groups of columns. 

A Column Category is simply a name given a specific group of columns that you specify.

A Column Category can be created through the UI or via [Column Category State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_columncategorystate_.columncategorystate.html).

> Column Categories are most commonly used within Column Chooser as a way to easily manage large groups of columns.  But they can be used in other functions (e.g. Conditional Style to colour just the columns in that Category).

This is a way to manage large groups of columns. A Column Category is simply a name you give to a group of columns that you specify.  The name of this category is stored with your user state.

You will most likely create your categories using at design time through Column Category Config but you can also use the Column Category screen too create and edit them at run time too.

Note
Column Categories are most used within Column Chooser as a way to easily manage large groups of columns, but you can also use them in Conditional Style to colour just the columns in that Category.



## UI Elements
Column Category includes the following UI Elements:

- **Popup** - Shows a list of existing Column Categories with Edit and Delete buttons, plus an Add button to start the Column Category Wizard.

- **Wizard** - A series of steps facilitating the creation and editing of Column Categoriess.

## Entitlements
Column Category supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: User can access Column Categories defined in Predefined Config but not add, edit or delete them.

## FAQ

**Can a column be in more than one Column Category?**

No. Each column can only be in one (or no) Column Category.


### Further Information
- [Column Category State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_columncategorystate_.columncategorystate.html)

- [Column Category Api](https://api.adaptabletools.com/interfaces/_src_api_columncategoryapi_.columncategoryapi.html)

- [Column Category Demo](https://demo.adaptabletools.com/column/aggridcolumncategorydemo)