# Dashboard (AdaptableFunction)

The Dasbhoard ([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `Dasbhoard`) is the area above the Grid that contains tabs, toolbars and frequently used buttons.

The Dashboard can be heavily customised so that it fits your needs.

There are 3 modes for the Dashboard:

- **Full** - This shows everything in the Dashboard opened up with one tab open.

- **Collapsed** - This shows just the Dashboard Header - situated above the Grid.

> To collapse / uncollapse the Dashboard click on a Dashboard tab.

- **Floating** - This shows just the Dashboard Header in reduced width and it can be dragged to any position by clicking on the Name (the mouse will change to a cross).

> To float / unfloat the Dashboard double-click on the Name in the Dashboard Header (or click the 'carat' at the right hand side).

The Dashboard is made up of 2 areas:

1. **Dashboard Header** - This is the part of the Dashboard that is always visible, irrespective of mode.  It contains:

- **Functions Dropdown** - a dropdown on the left hand side that shows a list of all Functions in AdapTable to which the user is 'Entitled'.  Clicking an item in this list will open the popup associated with that Function.

> This dropdown can be hidden via the `ShowFunctionsDropdown` property of Dashboard State.

- **Tabs** - blah

- **Function Buttons** - blah

- **Quick Search** - blah

2. **Dashboard Header** - T

## UI Elements
Dasbhoard includes the following UI Elements:

- **Popup** - Allows you to perform a Dasbhoard operation on selected columns.  Will show what the new value for each selected cell will be and also whether any cell validation rules will be broken as a result of the update.

- **Toolbar** - Enables Dasbhoard to be performed - and to provide both an existing column value or a new one.

- **Tool Panel** - Same as Toolbar above.

- **Column Menu** - None

- **Context Menu** - `Apply Dasbhoard` Menu Item opens Dasbhoard popup (only visible if selected cells are editable).

## Entitlements
Dasbhoard supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: N/A

## FAQ

**Can I performa a Dasbhoard on any column?**

Yes. Unlike Smart Edit which is restricted to numeric columns, Dasbhoard can be performed on text (string), numeric and date columns.

**With Smart Edit you remember the last saved value but not with Dasbhoard. Why not?**

It doesnt make sense to store a previous Dasbhoard value as by its nature its usually a one-off operation.

**Can I perform Dasbhoard on a readonly column?**

No, Dasbhoard only applies on editable columns.

**Can I perform a Dasbhoard across more than one column?**

No, like Smart Edit, Dasbhoard works on only one column at a time.

**Can I choose to enter a value that is not currently in the column?**

Yes, you can. The selector for Dasbhoard allows you to add your own value which is not currently contained in the column. Simply enter the new value you wish to set, and then click the selector to confirm.


### Further Information
- [Dasbhoard State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_cellsummarystate_.cellsummarystate.html)

- [Dasbhoard Api](https://api.adaptabletools.com/interfaces/_src_api_cellsummaryapi_.cellsummaryapi.html)

- [Dasbhoard Demo](https://demo.adaptabletools.com/gridmanagement/aggridcellsummarydemo)
