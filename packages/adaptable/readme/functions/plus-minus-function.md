# Plus / Minus (AdaptableFunction)

The Plus / Minus Function enables the creation of 'Nudge Rules' which react to the '+' or '-' keys being pressed in numeric cells.

AdapTable allows you to use the + and - keys on the keyboard to increment or decrement the value of numerical cells in those columns which you have identified as having a nudge value.

Using the Plus/Minus Function, you can for each column either:

- Set a Default Nudge Value for the column. 

- Create Custom Plus / Minus Rules so that Nudge Value amount for each cell will vary, depending on the values in other cells in the row using a Query. For more information on building and editing Queries using multiple Conditions and Criteria see Queries.

> A custom Nudge value has precedence over a default Nudge Value for a column, so any bespoke Nudge Values will get used first.

Note: There can only be one Default Nudge Value for a column. Attempting to add a second, will trigger a warning together with the option to override the existing Default Nudge Value.

## UI Elements

Plus/Minus includes the following UI Elements:

- **Popup** - Shows a list of existing Plus / Minus rules with a *Delete* button.  Plus an *Add* button to start the Shortcut Wizard.

- **Wizard** - A series of steps facilitating the creation and editing of Plus / Minus rules.

- **Column Menu** - Numeric columns have a `Create Plus Minus Rule` Menu Item which starts the Plus / Minus wizard

## Entitlements

- **Full**: Everything is available to the User - they can create and edit Plus / Minus rules

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: Users can use pre-existing Plus / Minus rules but not create or edit their own

## FAQ

**Which takes precedence - the column nudge value or a custom nudge value?**

If there is a custom nudge value (and the condition is met) then that will take precedence over the column nudge value.

**Can I use Plus/Minus across multiple cells simultaneously?**

Yes, so long as all the highlighted cells are in the same column.  AdapTable will automatically apply the correct nudge value for each cell in the selection.

**Is there a default Nudge Value for AdapTable like in the .NET edition?**

No, this is one of the few changes we have made between the 2 editions. We no longer allow you to a set a default nudge value for AdapTable, as we found that it rarely made sense, and users preferred to 'opt in' and choose to make a column have a nudge value, rather than it having one by default.

### Further Information

- [Plus/Minus State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_plusminusstate_.plusminusstate.html)

- [Plus/Minus Api](https://api.adaptabletools.com/interfaces/_src_api_plusminusapi_.plusminusapi.html)

- [Plus/Minus Demo](https://demo.adaptabletools.com/edit/aggridplusminusdemo)