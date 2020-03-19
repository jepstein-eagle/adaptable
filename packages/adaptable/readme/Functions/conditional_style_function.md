# Conditional Style (AdaptableFunction)

The Conditional Style ([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `ConditionalStyle`) Function enables cells and rows to be given a distinctive style / look and feel when they contain data that matches a bespoke rule.

## Conditional Style Rules

A Conditional Style *Rule* is written using and Adaptable Expression (Query).

When create a Conditional Style you will select the:

- **Scope**: whether the style is applied for a single column or an entire row

 >  If you are using Column Categories then you can also apply a style just to the columns in a single category

- **Colours and Font Properties**: used to create the style that suits your needs by selecting the fore and back colours and font elements that you require. Just select those elements that you wish to change from the default setting.

 > If you don't want to create the style yourself then there is an option to select the name of a pre-existing CSS style instead.

- **Query**: determines when the style will be applied. For more information on building and editing Queries using multiple Conditions and Criteria see Queries

 > The conditional styles you create will be applied to your grid when a row's values **match all the criteria you have set**. If a row's values do not match the criteria, the default styles will be used instead.


## UI Elements

Conditional Style includes the following UI Elements:

- **Popup** - Shows a list of existing Conditional Styles with Edit and Delete buttons.  Plus an Add button to start the Conditional Style Wizard.

- **Wizard** - A series of steps facilitating the creation and editing of Conditional Styles.

- **Column Menu** - `Conditional Style` Menu Item opens the Conditional Style wizard (andjumps to page 2 so that it sets the Scope to be that Column automatically).

## Entitlements
Conditional Style supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: User can see Conditional Styles defined in Predefined Config but not add, edit or delete them.

## FAQ

**Can we extend the styles screen to add our own additional style elements?**

This is not possible unfortunately because each underlying grid needs then to implement that style separately (and not all are DOM based and won't use CSS). If you would like to add extra properties to Conditional Styles that are not currently present please provide us with the details and we will try to add them in a future release.

C**an we provide the name of a css style instead of building it?**

Yes, you can do that. When you create a predefined Conditional Style there is a StyleName property which you can use to provide the name of the css style. If you do that, then its your responsibility to ensure that style is available in your css. Additionally, you can provide a list of styles in UserInterface config adn then they will be available in a dropdown in the Conditional Styles wizard.

**Can we add gradient style to a Conditional Style so the colour transparency changes depending on the value?**

Not currently but we plan to add this in a future release. We do have the Percent Bar that does something similar for all cells in a column.

**Can we add a style that is always applied, i.e. is not based on a condition?**

Yes - this is done through the Format Column function. Format Column uses the same style as a Style Condition but without an accompanying rule (e.g. if a user wants a particular column always to have a certain back colour).

### Further Information

- [Conditional Style State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_conditionalstylestate_.conditionalstylestate.html)

- [Conditional Style Api](https://api.adaptabletools.com/interfaces/_src_api_conditionalstyleapi_.conditionalstyleapi.html)

- [Conditional Style Demo](https://demo.adaptabletools.com/style/aggridconditionalstyledemo)

