# Query (AdaptableFunction)

The Query Function enables you to build complex searches using [*Expressions*](https://api.adaptabletools.com/classes/_src_predefinedconfig_common_expression_.expression.html) (aka Queries)

These searches can include a very wide variety of *Search Criteria* and run across multiple columns.

 > When an Query is applied, AdapTable will **only display those rows that match all of the Conditions in the Query**.

Queryes are named and saved and, therefore, available for re-use.

Queryes can be provided at design-time (through [Predefined Config](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_querystate_.querystate.html)) or at run-time through the UI (if Entitlements allow).

## UI Elements

Query includes the following UI Elements:

- **Popup** - Shows a list of existing Queryes with *Edit* and *Delete* buttons, and a Radio Button to select one to be run.  Plus an *Add* button to start the Query Wizard.

- **Wizard** - A series of steps facilitating the creation and editing of Queryes.

- **Toolbar** - Provides a list of the available Queryes in a dropdown, together with buttons for adding / adding / deleting.

- **Tool Panel** - Same as Toolbar above.

## Entitlements

Query supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User

- **ReadOnly**: User can run Queryes in Predefined Config but not edit or delete them, nor add others.

## FAQ

**Can we run Queries on the server?**

Yes, through setting the [ServerSearchOption](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_searchoptions_.searchoptions.html#serversearchoption) in SearchOptions.

**Does Query update if I edit the data in the grid?**

Yes, as soon as you make an edit AdapTable will re-evaluate if that row should be visible or not and react accordingly.

Note that this is the default behaviour. You can change this to Never, or only after a ThrottleDelay by setting the 
[filterActionOnUserDataChange](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_filteroptions_.filteroptions.html#filteractiononuserdatachange) property in FilterOptions.

**Does Query update if the underlying data changes?**

That depends on what you have specified for the
[filterActionOnExternalDataChange](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_filteroptions_.filteroptions.html#filteractiononexternaldatachange) property in FilterOptions.

The default is *Never* meaning Queryes won't update as ticking data changes or the underlying data set changes. But you can change this to *Always* or after a *ThrottleDelay*.

### Further Information

- [Query State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_querystate_.querystate.html)

- [Query Api](https://api.adaptabletools.com/interfaces/_src_api_queryapi_.queryapi.html)

- [Search Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_searchoptions_.searchoptions.html)

- [Query Demo](https://demo.adaptabletools.com/search/aggridquerydemo)
