# Shortcut (AdaptableFunction)

The Shortcut([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `Shortcut`) Function helps to avoid fat finger issues and to speed up data entry for numeric and date columns.

### Defining a Shortcut
A Shortcut defines what happens when a particular key is pressed.

They operate on 2 types of Columns:

- **Date Columns**: A new Date value is selected which can be either a Custom date or a 'Dynamic' Date (e.g. Next Working day).  It will always replace the current contents of the cell when applied.

- **Number Columns**: The shortcut is a mathmematical calculation which is applied to the new cell based on the cell's current contents and the Shortcut Key (e.g. if the Shortcut was defined as KeyStroke:'M', Action" Multiply by a Million, and it was applied in a cell which currently contained the vlaue 5, the new cell value will become 5,000,000).

### Applying a Shortcut
To apply a shortcut is straightforward.  Simply enter the Keystroke in the column that is affected and the Shortcut will work automatically.  

>  If the Column is a date column there is no need to enter Edit Mode as the Shortcut will work so long as there is just one column selected.

## UI Elements
Shortcut includes the following UI Elements:

- **Popup** - Shows a list of existing Shortcuts with a *Delete* button.  Plus an *Add* button to start the Shortcut Wizard.

- **Wizard** - A series of steps facilitating the creation and editing of Shortcuts.

## Entitlements
Shortcut supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: N/A

## FAQ

**How do the 'Working Day' shortcuts work?**

They use whichever the currently selected holiday calendar is in the [Calendar Function](./calendar-function.md). So for 'Next Working Day', if the next non-weekend day is a holiday according to the current calendar, it will try the following weekday until a non holiday is found.

**Can we apply shortcuts on text (string) columns?**

No, Shortcuts only work for numeric or date columns. 

**What is the difference between shortcuts for numeric and for date columns?**

Numeric shortcuts perform a calculation based on existing values in the cell (e.g. if you have an 'M' for 1,000,000 shortcut typing 5M will render 5,000,000). Date shortcuts replace the existing date in the cell with the replacement value of the shortcut.

### Further Information

- [Shortcut State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_shortcutstate_.shortcutstate.html)

- [Shortcut Api](https://api.adaptabletools.com/interfaces/_src_api_shortcutapi_.shortcutapi.html)

- [Shortcut Demo](https://demo.adaptabletools.com/edit/aggridshortcutdemo)



