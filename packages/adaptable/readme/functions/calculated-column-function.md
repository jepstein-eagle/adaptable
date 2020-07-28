# Calculated Column (AdaptableFunction)

The Calculated Column ([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `CalculatedColumn`) enables the creation of special 'user-defined' columns which contain a custom 'Expression' which is evaluated at design-time per row.

> Calculated Columns can either be provided at design-time (through `CalculatedColumns` in [Predefined Config](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_calculatedcolumnstate_.calculatedcolumnstate.html)) or at run-time through the UI (if Entitlements allow).

Unlike 'regular' columns, Calculated Columns **do not store data** and are not part of your underlying grid's Data Source.

Calculated Columns can either be static (i.e. show a single value) or dynamic (i.e. based on other columns in the row).

There are numerous potential uses for Calculated Columns including showing Historical Data, and allowing you to do 'what if' or scenario analysis by copying some columns and see what happens if you change their values.

## Calculated Column Expression

Calculated Columns include an **Expression** that users provide in the Expression Editor.

> Up to [Version 7](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/upgrade-guides/upgrade-guide-v7.md) of AdapTable the Expression was created using an extermal library (Math.js) but this dependnecy has been removed and Expressions are now created and evaluated interally using our own parser.

An Expression typically includes one or more mathematical operators or functions and will likely reference other columns.

> AdapTable ships with the most common mathematical operators that you can use to create your Expression.  Future releases will include more functions, and the ability for users to provide their own.

An Expression can include as many operators as required: there is no limit on the number of operators or the number of other columns that can be referenced.

Note: The Expression in the Calculated Column updates in real time as values in the columns to which it refers change.

## Expression Editor

Since [Version 7](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/upgrade-guides/upgrade-guide-v7.md) Expressions can be most easily created using our Expression Editor.  

This has a number of useful features including:

- Drag n Drop of Columns into the Editor

- List of all the available functions as buttons or in a dropdown so they are immediately applied in the Editor

- Dispaly the return value of the Expression (using data from the first row of the Grid)

- Context sensitive Support / Help for each available function

## Expression Syntax

One key thing to note is that columns are referenced in the Expression as Col("ColumnName"), e.g. Col("Bid").  

You currently have to use the column's field name, i.e. the identifier for the column used by the underlying grid - e.g. Col("orderId") rather than the Caption visible in the grid (e.g. 'Order Id').  However we provide the Caption in the UI to help you identify them

> In a forthcoming release we hope to enable both field and captions to be used in the Expression.

We provide a 'shortcut' for the most commonly used functions.

For example instead of using the 'ADD' function as follows:

```
ADD(COL('ItemCount'),COL('PackageCost'))
 ```
 
you can provide the '+' sign (available in the UI as a button): 

```
COL('ItemCount') + COL('PackageCost')
 ```

## Expression Examples

There are limitless Expressions you can create but here a few examples to show you what is possible - try them out at the [Calculated Column Demo](https://demo.adaptabletools.com/column/aggridcalculatedcolumndemo).

To create an Expression which references another column and a mathematical operator: 

```
Col("ItemCost") * 2
 ```      

To create an Expression which references 2 columns:

```
Col("ItemCost") / Col("ItemCount")
 ```      

To create an Expression which references 3 columns:

```
ColumnExpression: Col("InvoicedCost") - ( Col("OrderCost") + Col("PackageCost"))
 ```      

To create an Expression which multiplies many columns:

```
MUL(Col("OrderCost") , Col("ItemCost"), Col("PackageCost"))
 ```
 
though this is more readable using the function short syntax as:

```
Col("OrderCost") * Col("ItemCost")* Col("PackageCost")
 ```
 
To create an Expression which uses ternary (if) logic (and outputs a string):

```
Col("ItemCost") > 100 ? "High" : Col("ItemCost") > 50 ? "Medium": "Low"
 ``` 

To create an Expression which returns the highest of 4 Columns in the row (great for things like MiFID):

```
MAX(Col("ItemCost"), Col("OrderCost"), Col("InvoicedCost"), (Col("PackageCost")*10))
 ```

## Calculated Column Settings

When creating a Calculated Column there are a number of properties you can provide in the wizard so that the column will operate according to your requirements.  These include:

- Column Type (AdapTable will infer this from the Expression and your data but you can override this if the assumption is incorrect)

- Width (if left empty then the width will be set by the underlying grid based on whatever other properties are set)

- Filterable

- Resizable

- Groupable

- Sortable

- Pivotable

- Aggregatable
 
## UI Elements

Calculated Column includes the following UI Elements:

- **Popup** - Shows a list of existing Calculated Columns with Edit and Delete buttons.  Plus an Add button to start the Calculated Column Wizard.

- **Wizard** - A series of steps facilitating the creation and editing of Calculated Columns.

- **Column Menu** - `Edit Calculated Column` Menu Item opens the Calculated Column wizard (only visible if that column is a Calculated Column).

## Entitlements

Calculated Column supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: User can see Calculated Columns defined in Predefined Config but not add, edit or delete them.

## FAQ

**Which mathematical operators can we use to build the Expression?**

You can use any of the functions currently available and more are being added all the time.

**Can we add our own function and then refrence it in the Expression?**

Not at the moment, but that funcionality will be coming soon.

**Its quite cumbersome to have to write the Expression by hand.  Is there a GUI option?**

Yes, this was introduced in Version 7.

**Can I include more than one operator in an Expression?**

Yes, you can include as many operators as you wish in an Expression. Some users have written Expressions that contain 4 or more operators.

**Can I use the Calculated Column in other Queries?**

Yes, once the Calculated Column is created, then its treated the same as any other column and can be used in Queries and Adaptable Objects.

**Can I edit the value a Calculated Column directly?**

No, a Calculated Column is readonly. You can edit the **Expression** but you cannot edit one of the cells in the column itself.

**Can I create a Calculated Column that returns a string?**

Yes, your Calculated Column can return a number, string, date or boolean. AdapTable will work out the datatype of the Calculated Column automatically, so that the created Column is treated like any other Column in queries and Expressions.

**Can I change the name of a Calculated Column?**

You can and the change will persist.  

> However please note that AdapTable will not update any layouts or other objects (e.g. filters) that reference this Calculated Column so be very careful before changing the name of a Calculated Column that is used elsewhere.

### Further Information

- [Calculated Column State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_calculatedcolumnstate_.calculatedcolumnstate.html)

- [Calculated Column Api](https://api.adaptabletools.com/interfaces/_src_api_calculatedcolumnapi_.calculatedcolumnapi.html)

- [Calculated Column Demo](https://demo.adaptabletools.com/column/aggridcalculatedcolumndemo)

- [Calculated Column Vidoo](https://youtu.be/mk_KpFLzV-c)
