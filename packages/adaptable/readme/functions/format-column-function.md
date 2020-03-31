# Format Column (AdaptableFunction)

The Format Column([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `FormatColumn`) Function enables columns to be given a particular style (i.e. colours, font size etc) which **all cells** in the Column will display.

Users need simply to select the column and choose the fore and back colours and font properties as appropriate.

> Format Column differs from the [Conditional Styles Function](./conditional-style-function.md) because the latter only applies the style when a particular condition is met.  However Format Column will always style the column irrespective of the data contained in the cell.

The style has the last level of style-application preference, so any quick searches or conditional styles will be applied ahead of it.


## UI Elements
Format Column includes the following UI Elements:

- **Popup** - Shows a list of existing Format Columns with *Edit* and *Delete* buttons.  Plus an *Add* button to start the Format Column Wizard.  Each row in the popup is fully editable. 

- **Wizard** - A series of steps facilitating the creation and editing of Format Columne.

- **Column Menu** - Numeric columns have a `Create Format Column` Menu Item which starts the Format Column wizard; for columns already displaying as a Format Column it says `Edit Format Column`.


## Entitlements
Format Column supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: User can see Format Column styles defined in Predefined Config but not add, edit or delete them.

## FAQ

**How does this function differ from the Conditional Styles function?**

The Conditional Styles function applies the style on when a particular condition is met.  Format Column will always style the column; it is best used when a user wants a particular column to have a distinctive background or font.

**If a Conditional Style condition is met, which style will get applied?**

The Conditional Style will take preference over a Format Column Style.  The order of preference for styles is:

- Flashing Cell

- Quick Search

- Conditional Style

- Format Column

**Can I apply more than one Format to a column?**

No. A column can only have one Format Column


### Further Information

- [Format Column State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_formatcolumnstate_.formatcolumnstate.html)

- [Format Column Api](https://api.adaptabletools.com/interfaces/_src_api_formatcolumnapi_.formatcolumnapi.html)

- [Format Column Demo](https://demo.adaptabletools.com/style/aggridformatcolumndemo)

