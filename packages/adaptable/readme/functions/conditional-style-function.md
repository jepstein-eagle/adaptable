# Conditional Style (AdaptableFunction)

The Conditional Style Function enables cells and rows to be given a distinctive style / look and feel when they contain data that matches a `Query`.

## Conditional Style Properties

A Conditional Style contains 3 main elements:

### Scope

This defines where the style is applied.  Options are:

- one (or more) **Columns**

- one (or more) **DataTypes** (e.g. String, Number, Date etc)

- an entire **Row**

> There is an option to exclude grouped rows from having the style applied.

### Style

These are the the colours and font properties used to create the style required; fore and back colours and font elements can be selected. Only those elements which differ from the default setting need to be set.

> There is an option to select the name of a pre-existing CSS style instead of creating the style individually - if the css style has been referenced in User Interface Predefined Config.


### Query

This is a standard Adaptable Query (either Shared or bespoke) which determines **where** the style will be applied.

> Conditional Styles will only be applied when the cell (or row) values **match all the criteria set in the Expression**; otherwise the default styles will be used instead.

## UI Elements

Conditional Style includes the following UI Elements:

- **Popup** - Shows a list of existing Conditional Styles with Edit and Delete buttons.  Plus an Add button to start the Conditional Style Wizard.

- **Wizard** - A series of steps facilitating the creation and editing of Conditional Styles.

- **Column Menu** - `Add Conditional Style` Menu Item opens the Conditional Style wizard (and jumps to Step 2 setting the Scope to be that Column automatically).

## Entitlements
Conditional Style supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: User can see Conditional Styles created as a result of Rules defined in Predefined Config but not add, edit or delete them.

## FAQ

**Can we extend the styles screen to add our own additional style elements?**

This is not possible unfortunately because each underlying grid needs then to implement that style separately (and not all are DOM based and won't use CSS). If you would like to add extra properties to Conditional Styles that are not currently present please provide us with the details and we will try to add them in a future release.

**Can we provide the name of a css style instead of building it?**

Yes, you can do that. When you create a predefined Conditional Style there is a StyleName property which you can use to provide the name of the css style. If you do that, then its your responsibility to ensure that style is available in your css. 

Additionally, you can provide a list of styles in `User Interface Predefined Config` and then they will be available in a dropdown in the Conditional Styles wizard.

**Can we add gradient style to a Conditional Style so the colour transparency changes depending on the value?**

Not currently but we plan to add this in a future release. We do have the [Percent Bar](percent-bar-function.md) and [Gradient Column](gradient-column-function.md) functions that both do something similar but for **all** cells in a column.

**Can we add a style that is always applied, i.e. is not based on a condition?**

Yes - this is done through the [Format Column function](format-column-function.md). This uses the same style as a Style Condition but without an accompanying rule (e.g. if a user wants a particular column always to have a certain back colour).

### Further Information

- [Conditional Style State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_conditionalstylestate_.conditionalstylestate.html)

- [Conditional Style Api](https://api.adaptabletools.com/interfaces/_src_api_conditionalstyleapi_.conditionalstyleapi.html)

- [Conditional Style Demo](https://demo.adaptabletools.com/style/aggridconditionalstyledemo)