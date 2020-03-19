# Data Source (AdaptableFunction)

The Data Source([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `DataSource`) Function provides a way to provide an entirely new Data Set to AdapTable based on user selection.

Most users will send AdapTable a datasource at start up and then allow users subsequently to filter and search on that data in the client using the various searching and filtering functions provided. However, occasionally, your data source might be so big that you would like to provide an option for users to switch between different "data sources" so that the grid is populated with different data sets.

The Data Source Selector function allows you to do that. It simply provides a dropdown which contains a list of all the data sources that you provide it at design time through the DataSource section in your config.

These Data Sources are simply text names that you provide and will correspond to Stored Procedures or other server-related items that make sense to you.

When a Data Source is selected, AdapTable will fire an event, providing the name of the newly selected Data Source and stating the trigger for the event to be 'DataSource'. (See Server Searching for more details).

Warning
AdapTable will not perform any functionality itself when the Data Source - it will merely inform the user through an event and it is their responsibility to listen to the event and provide AdapTable (or the underlying grid) with any data that has changed accordingly.


## UI Elements
To Do

## Entitlements
To Do

## FAQ

Do you offer parameterised queries?

Not currently but they will form part of a release in the summer of 2020.

### Further Information

To Do

