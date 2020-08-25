# FreeText Column (AdaptableFunction)

The FreeText Column Function enables the creation of 'special columns' for users to save comments and other text that is not part of the main data source.

FreeText columns are similar to calculated columns in that they are not part of the Grid's datasource but are created by Users and stored with the Adaptable State for that user.

The difference is that a FreeText column is designed to be editable (not derived) - the purpose is for users to store whatever values they want for each row (typically comments but can be additional calculations or contact details).

### Default value
FreeText Columns have an optional default value; if set, the cell will hold that value unless explicitly overriden by the User.

## UI Elements
FreeText Column includes the following UI Elements:

- **Popup** - Shows a list of existing FreeText Columns with *Edit* and *Delete* buttons.  Plus an *Add* button to start the FreeText Column Wizard.  Each row in the popup is fully editable. 

- **Wizard** - A series of steps facilitating the creation and editing of FreeText Columne.

- **Column Menu** - Existing FreeText columns have a `Edit Free Text Column` Menu Item which opens the Format Column wizard for that Column.


## Entitlements
FreeText Column supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: N/A

## FAQ
**Where is the data stored for Free Text Columns?**

With the User's state, wherever that is stored. Free Text Column data is not stored with the dataset of the underlying grid.

### Further Information

- [FreeText Column State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_freetextcolumnstate_.freetextcolumnstate.html)

- [FreeText Column Api](https://api.adaptabletools.com/interfaces/_src_api_freetextcolumnapi_.freetextcolumnapi.html)

- [FreeText Column Demo](https://demo.adaptabletools.com/column/aggridfreetextcolumndemo)