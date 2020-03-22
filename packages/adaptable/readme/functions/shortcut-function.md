# Shortcut (AdaptableFunction)

The Shortcut([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `Shortcut`) Function helps to avoid fat finger issues and to speed up data entry for numeric and date columns.


## UI Elements
To Do

## Entitlements
To Do

## FAQ

How do the 'Working Day' shortcuts work?

They use whichever the currently selected holiday calendar is. So for 'Next Working Day', if the next non-weekend day is a holiday according to the current calendar, it will try the following weekday until a non holiday is found.

Can we apply shortcuts on text (string) columns?

No, Shortcuts only work for numeric or date columns. 

What is the difference between shortcuts for numeric and for date columns?

Numeric shortcuts perform a calculation based on existing values in the cell (e.g. if you have an 'M' for 1,000,000 shortcut typing 5M will render 5,000,000). Date shortcuts replace the existing date in the cell with the replacement value of the shortcut.

### Further Information

To Do

