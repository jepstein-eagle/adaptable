# Plus / Minus (AdaptableFunction)

The Plus / Minus([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `PlusMinus`) Function enables the creation of 'Nudge Rules' which react to the '+' or '-' keys being pressed in numeric cells.

AdapTable allows you to use the + and - keys on the keyboard to increment or decrement the value of numerical cells in those columns which you have identified as having a nudge value.

Using the Plus/Minus Function, you can for each column either:

Set a Default Nudge Value for the column. 

Create Custom Plus / Minus Rules so that Nudge Value amount for each cell will vary, depending on the values in other cells in the row using a Query. For more information on building and editing Queries using multiple Conditions and Criteria see Queries.

Note
A custom Nudge value has precedence over a default Nudge Value for a column, so any bespoke Nudge Values will get used first.

Warning
You can only have one Default Nudge Value for a column. If you attempt to add a second, you will be given a warning together with the option to override the existing Default Nudge Value. 

## UI Elements
To Do

## Entitlements
To Do

## FAQ

Which takes precedence - the column nudge value or a custom nudge value?

If there is a custom nudge value (and the condition is met) then that will take precedence over the column nudge value.

Can I use Plus/Minus across multiple cells simultaneously.

Yes, so long as all the highlighted cells are in the same column.  AdapTable will automatically apply the correct nudge value for each cell in the selection.

Is there a default Nudge Value for AdapTable like in the .NET edition?

No, this is one of the few changes we have made between the 2 editions. We no longer allow you to a set a default nudge value for AdapTable, as we found that it rarely made sense, and users preferred to 'opt in' and choose to make a column have a nudge value, rather than it having one by default.

### Further Information

To Do

