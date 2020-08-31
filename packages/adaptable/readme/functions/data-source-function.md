# Data Source (AdaptableFunction)

The Data Source Function provides a way to provide an entirely new Data Set to AdapTable based on user selection.

It is designed for those scenarios when there is too much data to send to the client at start-up, and developers want to provide an option for users to switch between different "data sources", with the result that the grid is populated with different data sets.

The Data Source Selector simply provides a dropdown which contains a list of all the data sources that are provided at design time through the DataSource section in [Predefined Config](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_datasourcestate_.datasourcestate.html).

These Data Sources are simply text names that developers provide and will typically correspond to Stored Procedures or other server-related items that make sense to the user (e.g. a 'book').

### SearchChanged Event (and Server Searching)

Data Sources provide a nice alternative to [Server Searching](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_searchoptions_.searchoptions.html#serversearchoption) as it allows for data to be dynamically retrieved from the server as a response to user selection, but without needing to build a whole server-side searching and filtering infrastructure.  And then users can filter the returned data set on the client as normal.

When a Data Source is selected, AdapTable will fire the [SearchChanged event](https://api.adaptabletools.com/interfaces/_src_api_events_searchchanged_.searchchangedeventargs.html), providing the name of the newly selected Data Source and stating the trigger for the event to be 'DataSource'.

> Note: **AdapTable will not perform any functionality itself when the Data Source is selected** - it will merely inform the user through an event, which if subscribed do, can be used to provide AdapTable with the new data source.

## UI Elements
Data Source includes the following UI Elements:

- **Popup** - Shows a list of existing Data Sources with *Edit* and *Delete* buttons.  Plus an *Add* button to start the Data Source Selector Wizard.

- **Wizard** - A series of steps facilitating the creation and editing of Data Source.

- **Toolbar** - Displays a dropdown containing all the DataSources in the Adaptable State, and a button (with a tick) which is enabled when a Data Source is selected.  When the button is clicked, the [SearchChanged event](https://api.adaptabletools.com/interfaces/_src_api_events_searchchanged_.searchchangedeventargs.html) fires.    

- **Tool Panel** - Same as Toolbar above.


## Entitlements
Data Source supports these Entitlement Rules:

- **Full**: Everything is available to the User - and Data Sources can be selected, created, edited and deleted.

- **Hidden**: Everything is hidden from the User.

- **ReadOnly**: Data Sources can be selected (and the event will fire) but users cannot not edit or delete them, nor create others.

## FAQ

**Do Data Sources include parameterised queries?**

Not currently but they will form part of a release in the summer of 2020.

### Further Information

- [Data Source State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_datasourcestate_.datasourcestate.html)

- [Data Source Api](https://api.adaptabletools.com/interfaces/_src_api_datasourceapi_.datasourceapi.html)

- [Data Sources Demo](https://demo.adaptabletools.com/search/aggriddatasourcedemo)

- [Server Searching](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_searchoptions_.searchoptions.html#serversearchoption)

- [Server Functionality Guide](../guides/adaptable-server-functionality-guide.md)
