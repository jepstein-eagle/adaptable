# Gradient Column (AdaptableFunction)

The Gradient Column([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `GradientColumn`) Function enables Column to be styled dynamically so that each cell is coloured according to its value in relation to a given base value and maximum value.

### Base Value and Maximum Value

Each Gradient Column has a *base value*, a *maximum (positive) value* and a *(positive) colour*. The closer the cell value is to the maximum value the closer its colour will be to the 'positive' one.

By default the base value is 0, but a different base value can bemset. This ensures the cell is measured against possible values only, and the gradient begins from the lowest potential cell value. 

> e.g. if a column only displays values between 100 and 300 then the base value is is 100 and the maximum positive value is 300.

### Negative columns

For columns which contain negative values, a negative maximum value and a negative colour can be set.

> e.g. if a column only displays values between -100 and 200 then the base value is is 0, the maximum positive value is 200 and maximum negative value is -100.

## UI Elements

Gradient Column includes the following UI Elements:

- **Popup** - Shows a list of existing Gradient Columns with *Edit* and *Delete* buttons.  Plus an *Add* button to start the Gradient Column Wizard.  Each row in the popup is fully editable. 

- **Wizard** - A series of steps facilitating the creation and editing of Gradient Columne.

- **Column Menu** - Numeric columns have a `Create Gradient Column` Menu Item which starts the Gradient Column wizard; for columns already displaying as a Gradient Column it says `Edit Gradient Column`.

- **Context Menu** - Existing Gradient Columns have a `Edit Gradient Column` Menu Item which opens the Gradient Column wizard.

## Entitlements

Gradient Column supports these Entitlement Rules:

- **Full**: All Gradient Columns will be displayed and can be edited

- **Hidden**: No Gradient Columns will be displayed

- **ReadOnly**: All Gradient Columns will be displayed but cannot be edited or deleted or new ones created.

## FAQ

**Can I merge a Gradient Column and Percent Bar for the same column?**

No, they are 2 separate ways of looking at column data and each has a separate implementation.  You need to use one or the other.

### Further Information

- [Gradient Column State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_gradientcolumnstate_.gradientcolumnstate.html)

- [Gradient Column Api](https://api.adaptabletools.com/interfaces/_src_api_gradientcolumnapi_.gradientcolumnapi.html)

- [Gradient Column Demo](https://demo.adaptabletools.com/style/aggridgradientcolumndemo)

- [Gradient Column Video](https://youtu.be/33lID_zBsAw)

