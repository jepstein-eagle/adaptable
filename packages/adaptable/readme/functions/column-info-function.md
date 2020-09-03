# Column Info (AdaptableFunction)

The Column Info Function provides an at-a-glance overview of a given column in AdapTable.  

It also contains a summary of all Functions associated with that Column - and any associated Adaptable Objects that have been created - together with buttons to add, edit and delete related items.


## UI Elements
Column Info includes the following UI Elements:

- **Popup** - A screen showing a table providing all the relevant information for a given Column.  For instance, whether there are Column Filters or Conditional Styles applied or it has a Custom Sort or Plus / Minus info etc.   

    There are buttons in each row enabling existing Adaptable Objects to be edited or deleted and new ones created.

- **Column Menu** - The `Column Information` Menu Item opens the Column Info Popup.

- **Context Menu** - The `Column Information` Menu Item opens the Column Info Popup.

## Entitlements
Column Info supports these Entitlement Rules:

- **Full**: The Column Info popup can be displayed

- **Hidden**: The Column Info popup is fully hidden

- **ReadOnly**: N/A

Note: Column Info is aware of all Entitlements so it will only show Functions to which the User is appropriately entitled.

## FAQ

**Can I change the Column's Data Source?**

No, that is not possible.

**Can I use Column Info to make a readonly column editable?**

No, that is not possible.

### Further Information
- [Column Info Demo](https://demo.adaptabletools.com/column/aggridcolumninfodemo)


