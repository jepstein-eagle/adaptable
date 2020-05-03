# Format Column (AdaptableFunction)

The Format Column([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `FormatColumn`) Function enables columns to be given a particular **Style** (i.e. colours, font size etc) and / or **Display Format** which **all cells** in the Column will display.

### Style

Users can set the style for the Column by simply selecting the fore and back colours and any font properties as appropriate.

> Format Column differs from the [Conditional Styles Function](./conditional-style-function.md) because the latter only applies the style when a particular condition is met.  However Format Column will always style the column irrespective of the data contained in the cell.

The style in a Format Column has lowest last level of style-application preference, so any Flashing Cells, Quick Search highlights or Conditional Styles will be applied ahead of it.


### Display Format

The Display Format sets how the value in the column will be formatted, so it matches the precise requirements of users.  

> Setting a Display Format does NOT change the underlying cell value.

Display Formats can be set for:

- **Numeric Columns**:  users can set values for Prefix, Suffix, Fraction Separator, Integer Separator, Fraction Digits, Integer Digits, Multiplier and Negative Parentheses.

- **Date Columns**: users can set their own date pattern or select from one of the presets.  The full list of the available patterns is [here](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table)


## UI Elements
Format Column includes the following UI Elements:

- **Popup** - Shows a list of existing Format Columns with *Edit* and *Delete* buttons.  Plus an *Add* button to start the Format Column Wizard.  Each row in the popup is fully editable. 

- **Wizard** - A series of steps facilitating the creation and editing of Format Columns.

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

- Updated Row

- Format Column

**Can I apply more than one Format to a column?**

No. A column can only have one Format Column

**Can we show a currency in the Display Format?**

Yes. Create a prefix (or suffix) as appropriate

**Can we set negative numbers to appear in parentheses?**

Yes. Check the *Parentheses* checkbox in the Display Format stage of the wizard.

**Can we see just the time portion of a Date?**

Yes. Set the Display Format to show the time portion only (e.g. see the 'HH:mm:ss' preset which displays the time using a 24 hour clock)


### Further Information

- [Format Column State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_formatcolumnstate_.formatcolumnstate.html)

- [Format Column Api](https://api.adaptabletools.com/interfaces/_src_api_formatcolumnapi_.formatcolumnapi.html)

- [Format Column Demo](https://demo.adaptabletools.com/style/aggridformatcolumndemo)

- [Format Column Video](https://youtu.be/tYTGQ1ufhbc)

