# Percent Bar (AdaptableFunction)

The Percent Bar([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `PercentBar`) Function enables numeric columns to be viewed as a 'bar' where each cell is filled as a % of its value against the maximum value for the column.

In other words, the width of the bar is proportional to the value in the column.

### Percent Bar Options

When a Percent Bar is created AdapTable will, by default, work out the width of the bar by using the current minimum and maximum values in the column respectively. 

However, these can be set by the User - at both design-time or run-time - so that a different set of minimum and maximum values are used.

Other options when creating a Percent Bar include: 

- choosing the colours for positive and negative cells (the defaults are red and green)

- set the minimum and maximum values to be other columns rather than 'hard-coded' values (e.g. you can set the percent bar in Column 'A' to use Column 'B' - so that it displays the width as the percentage of the value in Column 'A' compared to that in Column 'B')

- additionally displaying the actual cell value in the call

- showing the cell value as Tooltip

> Percent Bars work for both positive and negative values and can be edited (if editable) and filtered (if filterable) like any other column.


## UI Elements
Percent Bar includes the following UI Elements:

- **Popup** - Shows a list of existing Percent Bars with *Edit* and *Delete* buttons, plus an *Add* button to start the Percent Bar Wizard.

- **Wizard** - A series of steps facilitating the creation and editing of Percent Bars.

- **Column Menu** - The `Create Percent Bar` (or for existing columns `Edit Percent Bar`) Menu Item opens the Percent Bar wizard for that column on the second step.

- **Context Menu** - `Edit Percent Bar` Menu Item opens the Percent Bar wizard for that column on the second step.

## Entitlements
Percent Bar supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User and no Percent Bars can be seen nor appear in menus.

- **ReadOnly**: User can see columns with Percent Bars (as defined in [Percent Bar Predefined Config](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_percentbarstate_.percentbarstate.html)) but not edit or delete them, nor add others.

## FAQ

**Can we see the underlying value in the cell?**

Yes - you can do this either at Design Time or at Run Time.

### Further Information

- [Percent Bar State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_percentbarstate_.percentbarstate.html)

- [Percent Bar Api](https://api.adaptabletools.com/interfaces/_src_api_percentbarapi_.percentbarapi.html)

- [Percent Bar Demo](https://demo.adaptabletools.com/style/aggridpercentbardemo)

