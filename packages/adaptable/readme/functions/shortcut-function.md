# Shortcut (AdaptableFunction)

The Shortcut([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `Shortcut`) Function helps to avoid fat finger issues and to speed up data entry for numeric and date columns.

You can use keyboard shortcuts to quickly apply calculations or enter dates and avoid fat finger or mathematical errors as you do so.

Tip
To apply a shortcut you simply press the relevant Shortcut Key.

You can apply shortcuts on 2 types of Columns:

Date Columns: A new date always replaces the current value. If the Date Type is Custom enter a date in the date picker. If the Date Type is Dynamic then select an entry from the dropdown.  The value you pick will replace the current contents of the cell when the shortcut key is pressed.

Number Columns: The shortcut is a calculation (you can choose between Add, Subtract, Multiply, or Divide) is applied to the new cell based on the cell's current contents and the Shortcut Key (e.g. if you create a 'M' Multiply by a Million shortcut and the cell contains 5 and you then click 'M', the new cell value will become 5,000,000).



## UI Elements
To Do

## Entitlements
Shortcut supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: N/A

## FAQ

How do the 'Working Day' shortcuts work?

They use whichever the currently selected holiday calendar is. So for 'Next Working Day', if the next non-weekend day is a holiday according to the current calendar, it will try the following weekday until a non holiday is found.

Can we apply shortcuts on text (string) columns?

No, Shortcuts only work for numeric or date columns. 

What is the difference between shortcuts for numeric and for date columns?

Numeric shortcuts perform a calculation based on existing values in the cell (e.g. if you have an 'M' for 1,000,000 shortcut typing 5M will render 5,000,000). Date shortcuts replace the existing date in the cell with the replacement value of the shortcut.

### Further Information

- [Shortcut State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_freetextcolumnstate_.freetextcolumnstate.html)

- [Shortcut Api](https://api.adaptabletools.com/interfaces/_src_api_freetextcolumnapi_.freetextcolumnapi.html)

- [Shortcut Demo](https://demo.adaptabletools.com/column/aggridfreetextcolumndemo)



