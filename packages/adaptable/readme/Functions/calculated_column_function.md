# Calculated Column (AdaptableFunction)

The Calculated Column ([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `CalculatedColumn`) enables the creation of special 'user-defined' columns which contain a custom 'Expression' which is evaluated at design-time per row.

> Calculated Columns can either be provided at design-time (through `CalculatedColumns` in [Predefined Config](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_calculatedcolumnstate_.calculatedcolumnstate.html)) or at run-time through the UI (if Entitlements allow).

Unlike 'regular' columns, Calculated Columns **do not store data** and are not part of your underlying grid's Data Source.

Calculated Columns can either be static (i.e. show a single value) or dynamic (i.e. based on other columns in the row).

There are numerous potential uses for Calculated Columns including showing Historical Data, and allowing you to do 'what if' or scenario analysis by copying some columns and see what happens if you change their values.

## Calculated Column Expression

Calculated Columns include an **Expression** that users provide. 

An Expression typically include a mathematical operator and will reference other columns. 

There is a huge array of potential mathematical operators that you can use to create your Expression.  (We use the Math.JS library to evaluate the Expression(.

> An Expression can include as many operators as required: there is no limit on the number of operators or the number of other columns that can be referenced.

Note: The Expression in the Calculated Column updates in real time as values in the columns which form part of that expression change.

We plan in future releases to enable drag and drop so that you can more easily reference other columns when creating a Custom Column Expression.

> If you want to refer to other columns in the Expression you need to reference them as Col("ColumnName"). (e.g. Col("Bid").  You can use either the column's field name (the private identifier for the column used by the underlying grid - e.g. Col("orderId") ) or its Friendly Name (the Caption displayed for the Column in the Header row - e.g. Col("Order ID") ).

## UI Elements

Calculated Column includes the following UI Elements:

- **Popup** - Shows a list of existing Calculated Columns with Edit and Delete buttons.  Plus an Add button to start the Calculated Column Wizard.

- **Wizard** - A series of steps facilitating the creation and editing of Calculated Columns.

- **Column Menu** - `Edit Calculated Column` Menu Item opens the Calculated Column wizard (only visible if that column is a Calculated Column).

## Entitlements
Calculated Column supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: User can see the Calculated Columns defined in Predefined Config but not edit or delete them, nor add others.

## FAQ

**Which mathematical operators can we use to build the Expression?**

You can use any of the hundreds available in the math.js library.

**Its quite cumbersome to have to write the Expression by hand.  Is there a GUI option?**

Not at present but it is on the To Do list and will be in a future release.  We anticipate that you will be able to drag and drop the columns and choose the operators from a dropdown.

**Can I include more than one operator in an Expression?**

Yes, you can include as many operators as you wish in an Expression. Some users have written Expressions that contain 4 or more operators.

**Can I use the Calculated Column in other Queries?**

Yes, once the Calculated Column is created, then its treated the same as any other column and can be used in Queries and Adaptable Objects.

**Can I edit the value a Calculated Column directly?**

No, a Calculated Column is readonly. You can edit the Expression but cannot edit one of the cells in the column itself.

**Can I create a Calculated Column that returns a string?**

Yes, your Calculated Column can return a number, string, date or boolean. AdapTable will work out the datatype of the Calculated Column automatically, so that the created Column is treated like any other Column in queries and Expressions.

**Can I change the name of a Calculated Column?**

You can and the change will persist.  However please note that AdapTable will not update any layouts or other objects (e.g. filters) that reference this Calculated Column so be very careful before changing the name of a Calculated Column that is used elsewhere.


### Further Information
- [Calculated Column State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_calculatedcolumnstate_.calculatedcolumnstate.html)

- [Calculated Column Api](https://api.adaptabletools.com/interfaces/_src_api_calculatedcolumnapi_.calculatedcolumnapi.html)

- [Calculated Column Demo](https://demo.adaptabletools.com/column/aggridcalculatedcolumndemo)




