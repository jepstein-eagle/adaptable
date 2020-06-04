# Updated Row (AdaptableFunction)

The Updated Row[AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `UpdatedRow`) Function allows users to specify how rows will appear visually if / when the contents of one of the cells in the row changes.

> The function is designed for those use cases when the grid wil update fairly irregularly so that users have the opportunity see the update.  For faster updates use the [Flashing Cell](./flashing-cell-function.md) Function.

Updated Rows do not flash; the changed rows will remain with their Updated Row colours until they are explicitly cleared. 

Clearing Updated Rows can be done either through the Context Menu (for a single row) or via the Column Menu (for all rows).

### Updated Row Properties

There are 3 colour settings that Updated Row will show (all can be edited at both design-time in Predefined Config or run-time by the User).  These are:

- *Up* - defaults to Green

- *Down* - defaults to Red

- *Neutral* - defaults to Gray

Another available property option is to set the Grid to 'jump' to the selected row.

## UI Elements

Updated Row includes the following UI Elements:

- **Popup** - Allows you to turn on Updated Rows and set the other properties associated with the function.

- **Column Menu** - `Clear Updated Rows` Menu Item removes any Updated Rows that have been created.

- **Context Menu** - `Clear Updated Row` Menu Item removes the Updated Row style for that row (only appears in rows which have been updated) 

## Entitlements

Updated Rows supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: N/A

## FAQ

**How do I clear an Updated Row?**

You can do it in 2 ways:

- Clear a single Updated Row by clicking `Clear Updated Row` in the Context Menu

- Clear all Updated Rows by clicking `Clear Updated Rows` in the Column Header Menu

**Is there a way to make Updated Rows disappear automatically?**

Not at the moment but that will change in a forthcoming version.

### Further Information

- [Updated Row State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_updatedrowstate_.updatedrowstate.html)

- [Updated Row Api](https://api.adaptabletools.com/interfaces/_src_api_updatedrowapi_.updatedrowapi.html)

- [Updated Row Demo](https://demo.adaptabletools.com/style/aggridupdatedrowsdemo)

