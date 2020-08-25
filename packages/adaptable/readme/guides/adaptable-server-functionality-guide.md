# AdapTable Server Functionality Guide

AdapTable is a client-side tool and designed to run on the client - either directly in the browser or in related environments like Electron, OpenFin, Finsemble, Glue42 etc.

Out of the box all the functionality in AdapTable will run purely in the client.

However there are frequent cases where our users want to perform some actions on the server.  These include:

- **Validation** - sometimes its preferable that proposed data edits are externally validated before being 'allowed'

- **Look up functions** - often users will want to do external lookups (e.g. for Entitlements)

- **Searching and Filtering** - perhaps the most common request, where users want to perform searches on the server but using AdapTable's rich 'Expression' / Querying capabilities

- **Getting Distinct Column Values** - many functions (e.g. Column Filters) require a list of distinct column values and these might want to be sourced from a server

- **Infinite scrolling** - getting new data each time the user scrolls or 'pages'

What AdapTable can do for each of these use cases is detailed below in turn.

## Server Validation

AdapTable provides a powerful [Cell Validation](../functions/cell-validation-function.md) function which allows for the creation of Validation Rules that run each time a propsosed edit is made and disallow those which break a rule.

But sometimes users require more sophisticated rules that run on the Server that contain complicated calculated or external lookups.

To facilitate this AdapTable offers Server Validation functionality that works as follows:

In the [Edit Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_editoptions_.editoptions.html) section of Adaptable Options developers supply a function that  will run each time a cell is edited.  The function returns a Promise containing a `ValidationResult`. 

This includes a return value which can be:

- nothing (either the edit works - or you want to 'swallow' it)
- the old value (validation failed) 
- a differnt value altogether (in advanced scenarios). 

The Promise can additionally include an optional Validation Message which, if present, will be displayed to the user.

### Server Validation Example

In this (slightly contrived) example the logic is that for the 'Amount' column any edit > 100 will return 100, any edit < 20 will return 20 and if edit is 50 its rejected.

> Any edits that dont break those rules - or which are not for the 'amount' column - we ignore (so they will be processed normally)

```ts
adaptableOptions.editOptions = {
    validateOnServer: (dataChangedInfo: DataChangedInfo) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(getServerEditResponse(dataChangedInfo)), 2000);
      });
    },
  };

--------------------

function getServerEditResponse(dataChangedInfo: DataChangedInfo): ValidationResult {
 if (dataChangedInfo.ColumnId == 'amount') {
   if (dataChangedInfo.NewValue == 50) {
    return {
      NewValue: dataChangedInfo.OldValue,
       ValidationMessage: 'Cannot set amount to 50',
     };
   } else if (dataChangedInfo.NewValue > 100) {
     return {
       NewValue: 100,
       ValidationMessage: 'Amount cannot be greater than 100',
     };
   } else if (dataChangedInfo.NewValue < 20) {
     return {
       NewValue: 20,
       ValidationMessage: 'Amount cannot  be less than  20',
     };
   }
 }
return {};
}

 ```

## Lookup Functions
AdapTable provides rich and advanced state-management functionality which persists and fetches user settings.  

One element of this 'Adaptable State' is **Predefined Config** which enables users to pre-populate their grids with items they need (e.g. searches, reports, styles, charts etc.).

Most Predefined Config is simple JSON properties or objects that is easy to write and which stores easily as a string.  

But AdapTable also allows for functions to be provided by developers at design-time; these will then be evaluated by AdapTable at run-time at the appropriate moments. 

> Because of the limitation of only being able to store string in state, Predefined Config just contains the **name** of the function, and the actual **implementation** is provided in the [User Functions](https://api.adaptabletools.com/modules/_src_adaptableoptions_userfunctions_.html) section of Adaptable Options.

The items in Adaptable State that contain functions include:

- Action Columns
- Cell Summary
- Custom Sort
- Column and Context Menus
- User Filters
- Entitlements

One consequence of this is that AdapTable, therefore, also enables developers to write functions that 'hand off' implementation to the server. 

For instance instead of providing a 'hard-coded' list of Function Entitlements in Predefined Config (which is possible), a function can also be supplied:

```ts
// Predefined Config
export default {
 Entitlements: {
   DefaultAccessLevel: 'Full',
   EntitlementLookUpFunction: 'serverLookUp',
  },
 },
} as PredefinedConfig;


// Adaptable Options
const adaptableOptions: AdaptableOptions = {
......
 userFunctions: [
    {
       name: 'EntitlementLookUpFunction',
       type: 'serverLookUp',
       handler(functionName: AdaptableFunctionName, userName: string, adaptableId: string) {
         // do server look up here
         }
     },
   ],
 ```

## Server Searching & Filtering
By default all filtering and searching in AdapTable takes place on the client.

However you can choose to run some or all filtering and searching on the Server instead.

>  Modern browsers are very powerful and AdapTable is very fast and performant so only run server searching if you have more than 100,000 records that you need filtering.

This is done through the `serverSearchOption` in the [SearchOptions](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_searchoptions_.searchoptions.html#serversearchoption) section of Adaptable Options

The property can take one of 4 values:

- **None** - the default; all searching and filtering will take place on the client.

- **AdvancedSearch** - runs just the [`AdvancedSearch` Function](../functions/advanced-search-function.md) on the server but filtering will take place on the client. (This is a popular option).

- **AllSearch** - runs all search and filtering functions on the server (i.e. Advanced Search, Column Filters etc)

- **AllSearchandSort** - runs all search and filtering functions on the server and will also run all sorting on the server.

> If a search function has been selected to be run on the Server then AdapTable will not do any relevant searching or filtering when the function runs.

### SearchChanged Event
Whenever the search criteria in AdapTable change (e.g. a new Advanced Search has been selected, or a Column Filter has been applied) the [SearchChanged](https://api.adaptabletools.com/interfaces/_src_api_events_searchchanged_.searchchangedeventargs.html) event is fired.

The event includes a [`SearchChangedInfo`](https://api.adaptabletools.com/interfaces/_src_api_events_searchchanged_.searchchangedinfo.html) property which contains 3 important properties:

- [`AdaptableSearchState`](https://api.adaptabletools.com/interfaces/_src_api_events_searchchanged_.adaptablesearchstate.html) which provides full and comprehensive details of the state of all the search and filter related functions in Adaptable

- [`AdaptableSortState`](https://api.adaptabletools.com/interfaces/_src_api_events_searchchanged_.adaptablesortstate.html) which lists what sorts are currently applied in the Grid

- [`SearchChangedTrigger`](https://api.adaptabletools.com/interfaces/_src_api_events_searchchanged_.searchchangedinfo.html#searchchangedtrigger) which says which AdapTable Function was responsible for the change in Search state.

### JSON Translation
All the objects in the Search State are JSON.

This means that in order to perform searching and filtering on the server this JSON will need to be 'translated' into something that the particular server can understand.

Obviously each server is different so AdapTable cannot provide an out of the box implemenation, but we do work with a number of partners who have performed this for clients and we have a [Grid Gurus consultancy service](https://adaptabletools.com/grid-gurus) that can advise you in a bespoke manner.

### Returning Search Results
Once the AdapTable JSON has been parsed into a query format that matches the particular server setup and the search has been run, then the data needs to be returned to AdapTable and displayed accordingly.

There are a number of different Adaptable Api methods you can use but the most common is perhaps [`setGridData`](https://api.adaptabletools.com/interfaces/_src_api_gridapi_.gridapi.html#setgriddata) in GridApi.

>  Once the data is sent back, AdapTable will automatically make any changes to your sorting, styles etc as required.

## Getting Distinct Column Values From Server
There are many places where AdapTable requires a list of distinct column values e.g. when opening a Column Filter or when creating an Expression.

By default AdapTable will loop through values in the grid for that column retrieiving distinct items.

However there is an option to allow developers dynamically to get the list of values for a column externally each time it is required.

The `getColumnValues` property in the [Query Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_queryoptions_.queryoptions.html#getcolumnvalues) section of AdaptableOptions defines this callback function:

```ts
 getColumnValues?: (column: string) => Promise<IServerColumnValues>;
 ```
 In other words, it takes the name of the column in question as the only parameter and returns a Promise of type `IServerColumnValues` that contains the list of column values to display and whether to show display or raw values:

```ts
export interface IServerColumnValues {
    DistinctCriteriaPairValue: 'RawValue' | 'DisplayValue';
    ColumnValues: string[];
}
```

Read more about the various options available in getting distinct column values in the [Column Values FAQ](../faqs/adaptable-column-values-faq.md).

## Getting Data From the Server (infinite scrolling)

ag-Grid provides a [Server Side Model](https://www.ag-grid.com/javascript-grid-server-side-model/) which: "allows applications to work with very large datasets by delegating grid operations such as grouping, sorting and pivoting to the server. The data is then lazy loaded from the server in blocks as the user browses through the data."

AdapTable supports this - primarily by leveraging *Server Searching and Filtering* (see above).

> It is still the responsibility of the developer to perform the actual searching on the server, including converting the AdapTable Expression JSON to something relevant to your tech stack.

## FAQ

**Can we swallow the Validation and return nothing?**

Yes you can. You have the option in Server Validation of returning:

- the original value - this will indicate that validation has succeeded

- a replacement value - this new value will be used instead

- nothing - the edit will persist in the Grid and presumably the user will update the DataSource in other ways - (perhaps via GridApi).


## Demos

The following demos all relate to the use cases in this Read Me:

- [Server Validation](https://demo.adaptabletools.com/edit/aggridservervalidationdemo)
- [Server Lookups](https://demo.adaptabletools.com/lookups/aggridserverlookupsdemo)
- [Search Changed](https://demo.adaptabletools.com/events/searchchangedeventdemo)

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us/articles/360007083017-Help-) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
