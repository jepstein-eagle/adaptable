# Advanced Search (AdaptableFunction)

The Advanced Search Function ([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `AdvancedSearch`) enables you to build complex searches using [*Expressions*](https://api.adaptabletools.com/classes/_src_predefinedconfig_common_expression_.expression.html) (aka Queries)

These searches can include a very wide variety of *Search Criteria* and run across multiple columns.

 > When an Advanced Search is applied, AdapTable will **only display those rows that match all of the Conditions in the Query**. 

Advanced Searches are named and saved and, therefore, available for re-use.

Advanced Searches can be provided at design-time (through [Predefined Config](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_advancedsearchstate_.advancedsearchstate.html)) or at run-time through the UI (if Entitlements allow).

## UI Elements
Advanced Search includes the following UI Elements:

- **Popup** - Shows a list of existing Advanced Searches with *Edit* and *Delete* buttons, and a Radio Button to select one to be run.  Plus an *Add* button to start the Advanced Search Wizard.

- **Wizard** - A series of steps facilitating the creation and editing of Advanced Searches.

- **Toolbar** - Provides a list of the available Advanced Searches in a dropdown, together with buttons for adding / adding / deleting.

- **Tool Panel** - Same as Toolbar above.

## Entitlements
Advanced Search supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: User can run Advanced Searches in Predefined Config but not edit or delete them, nor add others.

## FAQ
**Can we apply searches on the server?**

Yes, through setting the [ServerSearchOption](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_searchoptions_.searchoptions.html#serversearchoption) in SearchOptions.

**Does Advanced Search update if I edit the data in the grid?**

Yes, as soon as you make an edit AdapTable will re-evaluate if that row should be visible or not and react accordingly.

Note that this is the default behaviour. You can change this to Never, or only after a ThrottleDelay by setting the 
[filterActionOnUserDataChange](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_filteroptions_.filteroptions.html#filteractiononuserdatachange) property in FilterOptions.

**Does Advanced Search update if the underlying data changes?**

That depends on what you have specified for the
[filterActionOnExternalDataChange](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_filteroptions_.filteroptions.html#filteractiononexternaldatachange) property in FilterOptions.

The default is *Never* meaning Advanced Searches won't update as ticking data changes or the underlying data set changes. But you can change this to *Always* or after a *ThrottleDelay*.

### Further Information
- [Advanced Search State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_advancedsearchstate_.advancedsearchstate.html)

- [Advanced Search Api](https://api.adaptabletools.com/interfaces/_src_api_advancedsearchapi_.advancedsearchapi.html)

- [Search Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_searchoptions_.searchoptions.html)

- [Advanced Search Demo](https://demo.adaptabletools.com/search/aggridadvancedsearchdemo)
