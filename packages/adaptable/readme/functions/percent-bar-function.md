# Percent Bar (AdaptableFunction)

The Percent Bar([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `PercentBar`) Function enables numeric columns to be viewed as a 'bar' where each cell is filled as a % of its value against the maximum value for the column.

In other words, the width of the bar is proportional to the value in the column.

In Version 7 the concept of 'Ranges' were introduced so that the Percent Bar colour will vary according to which range its value falls in.

### Percent Bar Options

When a Percent Bar is created AdapTable will, by default, create one range based on the current miminum and maximum values in that column.

However, these can be edited by the User - at both design-time or run-time - and additional ranges can be created as required.

Other options when creating a Percent Bar include: 

- choosing the colours for each range - the default colour is green

- setting a back colour for the cell (some users like the visual effect this provides) - the default is gray

- displaying the actual value in the cell

- displaying the cell value as a percentage of the maximum value in the range (or the highest range if there is more than one)

- showing the cell value (and / or the percentage value) as a Tooltip

> Percent Bars are like 'normal' columns and can be edited (if the column is editable) and filtered (if the column is filterable) like any other column.


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

**We used to be able to see negative and positive values in the same bar - why has that changed?**

In version 7 of AdapTable we introduced Ranges.  These allow you to set multiple colours for the percent bar depending on the value.  one result of this is that percent bars no longer show minus values the way that they did so previously.

### Further Information

- [Percent Bar State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_percentbarstate_.percentbarstate.html)

- [Percent Bar Api](https://api.adaptabletools.com/interfaces/_src_api_percentbarapi_.percentbarapi.html)

- [Percent Bar Demo](https://demo.adaptabletools.com/style/aggridpercentbardemo)

