# AdapTable State Guide

Managing User State is one of the most valued pieces of functionality that AdapTable provides.

> This ReadMe provides an **overview** of the core concepts, and objects, involved in Adaptable State management.  For more detailed information follow the links to the Developer Documentation.

Conceptually Adaptable State comprises 2 distinct elements:

- **Predefined Config** - State created at **design-time** and given to AdapTable so that at first-time use of the application, the user has everything he or she needs to get started.

- **State Management** - Ensuring that all changes made by the user at **run-time** are saved and persisted to an appropriate location so they are available the next time the system runs.

## Predefined Config

Typically you will want to "pre-populate" your deployed application with Predefined Config - i.e. the initial state that AdapTable will use when it first loads up.

This ensures that users wont see an empty AdapTable instance but, rather, one full of reports, searches, conditional styles etc that allow them to be productive immediately.

### Predefined Config Contents

Predefined Config consists of a series of (nullable) properties that themselves each implement Config State (e.g. `ConditionalStyle`, `Layouts` etc.

Users only need to provide config for those properties which they want intial state; within each object every object is nullable (with default values) so only those elements which differ from the default implementation need to be provided.

> To prevent users from editing the Adaptable Objects shipped in PredefinedConfig, set the Entitlement for that function to `ReadOnly`.

### How Predefined Config Works

Predefined Config is created at design-time in JSON format.  

It is passed into AdapTable via the `predefinedConfig` property in [AdaptableOptions](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_adaptableoptions_.adaptableoptions.html#predefinedconfig). 

It can be passed in either as pure JSON or as a url to a file which contains the JSON.

When AdapTable is first loaded, any Predefined Config is read into memory and then stored (either locally or remotely - depending on your settings - see below) together with any user state that is created during that session.

Subsequently, each time the application is launched, that User State is retrieved and the particular AdapTable instance is pre-populated with it. 

> Although you can construct all your config by hand, its often easier when building more "complex" items like Queries to create them in the GUI at design time and then copy and paste the resulting state into your config file.

### Creating Functions

Many objects in AdapTable (e.g. Custom Sorts, User Menus, Action Columns etc.) include 'functions' that developers will provide in situations where it makes sense to use a custom implementation rather than one provided by AdapTable.

But this presents a problem for Predefined Config, because it is stored as JSON which means it can only contain elements which can be 'stringified' (and that excludes functions).

The solution is that these elements in Predefined Config contain a **named reference to the function** but the **actual implementation** is elsewhere (in the [UserFunctions](https://api.adaptabletools.com/modules/_src_adaptableoptions_userfunctions_.html) section of AdaptableOptions).

### Revision Property

The concept behind Predefined Config is that it provides - at design-time - the objects, entitlements and theme for initial, one-time, use of the host application.  

But sometimes developers might want to update a section in Predefined Config while ensuring that the rest of the user's Adaptable State remains untouched.

This can be accomplished through the `Revision` property in [ConfigState](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_configstate_.configstate.html#revision) (the base interface for all Adaptable State sections).

Simply put: if you increment (or provide from new) the revision number in a section of Predefined Config, AdapTable will replace that section (but only that section) in the user's State with the new Config.

> This is, currently, **replace only**, so you cannot use Revisions to merge a new Layout section in Predefined Config with the user's Layouts in State.  But you can, for example, provide a new CustomSort section in Predefined Config which will replace the user's Custom Sorts in State while keeping their Layouts and other state elements untouched (see example below).

```ts
export default {
 .....
   CustomSort: {
     // This section will replace the Custom Sort section in User State 
     // if the Revision Number is greater than the one currently in User State
     Revision: 2, 
     CustomSorts: [
     {
       ColumnId: 'Rating',
       SortedValues: ['AAA', 'AA+', 'AA', 'AA-'], // etc.
     },
     {
        ColumnId: 'Country',
        CustomSortComparerFunction: 'country',
      },
     {
        ColumnId: 'currency',
        CustomSortComparerFunction: 'currency',
      },
   ],
   },
  .....
 } as PredefinedConfig;
```

### AdaptableObject

Most objects in Predefined Config implement the `AdaptableObject` interface.

This has a single `Uuid` property which is used for easy identification of objects and to make it easy for AdapTable instances to share state and inform each other when an item has been created / edited / deleted.  It is included by AdapTable in all base objects and also frequently used objects like Expressions.

> Do not set this property when writing objects in your Predefined Config as it will be set by AdapTable at run-tine when the Predefined Config is first read

If [Team Sharing](./adaptable-team-sharing-guide.md) is enabled, then any Adaptable Object can easily be shared - at run-time - between colleagues.

### Bespoke State (Application Data Entries)

The [Application State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_applicationstate_.applicationstate.html) property of Predefined Config contains an `ApplicationDataEntries` array.

This is essentially a set of key / value pairs that you can populate with any data that you want and which AdapTable will store in its state.

See the [Application Data Entries Demo](https://demo.adaptabletools.com/adaptablestate/aggridapplicationdataentriesdemo) for more information.

## State Management

AdapTable makes it easy for you, via configuration, to store Adaptable State, in a location most suitable to your requirements (ie. locally or remotely).  

User state can be created at run-time (through user action e.g. selecting a Layout, creating a Column Filter etc.) or provided at design-time (through Predefined Config).

> Internally AdapTable uses Redux to manage its state - this provides a unidirectional store for all the objects used in the grid.  If you are also using Redux in your own application then you should continue to use your own Store and not merge the 2 Stores. 

 
### Adaptable State Storage Options

There are 2 modes of storage available in AdapTable:

- **Local Storage** - by default, Adaptable State is stored in the browser's local storage using the unique `adaptableId` property that you provide in AdaptableOptions.

  > If using Local Storage, all user state will be lost each time the user clear's the browser cache and will not be available when switching computer.

- **Remote Storage** - Adaptable state is automatically persisted (and retrieved from) a specificed, remote, location
  
  > In older versions of AdapTable remote storage was managed via *Config Server*; however in Version 7 this was removed.

### State Options

AdapTable provides 4 function hooks to enable users to provide their own implementations / functionality when state is being managed.

> This functionality is superior to the previous remote state management implementation which used 'Config Server' and was removed in Version 7.

This allows you to provide your own hydration or rehydration functionality or to enrich the State when its being loaded with your own items (e.g. entitlements).

The 4 functions you can provide your own implementations for are:

- **[loadState](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_stateoptions_.stateoptions.html#loadstate)**: Allows the customization of state loading.

- **[applyState](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_stateoptions_.stateoptions.html#applyState)**: Allows hooking into AdaptableState hydration

- **[saveState](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_stateoptions_.stateoptions.html#saveState)**: Allows the customization of the state that is going to be persisted

- **[persistState](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_stateoptions_.stateoptions.html#persistState)**: Allows the customization of state persistence

See more at [State Options Developer Documentation](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_stateoptions_.stateoptions.html).

### Accessing Adaptable State

Developers have full, run-time access to the Adaptable State Store is via the [Adaptable Api](https://api.adaptabletools.com/interfaces/_src_api_adaptableapi_.adaptableapi.html).  

Among many other advantages, the Adaptable Api provides full, programmatic, read / write access to all Adaptable State objects in a 'clean' and safe way.

> The Adaptable Api is actually a simple wrapper around our Redux store with some additional error handling, logging and other features.

### Listening to State Changes

The recommended way to listen to changes in the Store is by subscribing to the `AuditStateChanged` audit event in the [AuditEventApi](https://api.adaptabletools.com/interfaces/_src_api_auditeventapi_.auditeventapi.html) section of Adaptable Api.


## FAQs

**Where is configuration stored?**

By default its stored in the local browser cache. However you can use the State Options functions to choose to save your state in any location that you specify (as well as to enrich it).

**Do you provide data adapters to fetch / save configuration?**

No we don't, you will need to provide the mechanism to store configuration in a remote location.

**Can I preconfigure my AdapTable instance?**

Yes you can. You are able to build your own Adaptable Objects which are stored as Predefined Config. You are able to provide this configuration as a JSON object or as a URL (to a .JSON file).

**Can I provide different configuration per user?**

Yes, that is possible and expected.  AdapTable allows you provide highly configurable and personalised instances.

**Can we store our own data in the AdapTable State / Predefined Config?**

Yes you can. Use the AdaptableEntries property of Application State.

This provides an array of key / value pairs which you can use to store your own bespoke data and AdapTable will persist it with the rest of the state.

**Is there a restriction on what we can store in AdapTable Entries?**

Yes, it needs to be something that can be JSON stringified so it cannot be a function.


## Predefined Config example

 ```ts
 export default {
  Dashboard: {
    Tabs: [
          {
            Name: 'Search',
            Toolbars: ['QuickSearch', 'DataSource', 'Query'],
          },
          {
            Name: 'Edit',
            Toolbars: ['BulkUpdate','SmartEdit'],
          },
          {
            Name: 'Grid',
            Toolbars: ['Layout', 'CellSummary', 'SystemStatus', 'appToolbar']
          },
     ],
 },
  SmartEdit: {
    SmartEditValue: 10,
  },
  QuickSearch: {
     QuickSearchText: 'g*',
      Style: {
       BackColor: '#ffff00',
       ForeColor: '#8b0000',
     },
   },
  Export: {
    CurrentReport: 'High Freight',
    Reports: [
      {
        Name: 'High Freight',
        ReportColumnScope: 'ScopeColumns',
        ReportRowScope: 'ExpressionRows',
         Scope: {
            ColumnIds: [
              'OrderId',
              'ChangeLastOrder',
              'ContactName',
              'InvoicedCost',
              'ItemCost',
              'ItemCount',
              'OrderCost',
              'OrderDate',
            ],
        }
         Expression: '[Freight]> 500'
         },
       },
     ],
   },
   CustomSort: {
     Customsorts: [
       {
         ColumnId: 'Employee',
         SortedValues: [
           'Margaret Peacock',
           'Steven Buchanan',
           'Janet Leverling',
         ],
       },
     ],
   },
   ConditionalStyle: {
     ConditionalStyles: [
        {
          Scope: { DataTypes: ['Number'] },
          Style: {
            ForeColor: '#008000',
          },
          Predicate: { PredicateId: 'Positive' },
        },
        {
          Scope: { DataTypes: ['Number'] },
          Style: {
            ForeColor: '#ff0000',
          },
          Predicate: { PredicateId: 'Negative' },
        },
       {
          Scope: { ColumnIds: ['InvoicedCost'] }
          Style: {
            BackColor: '#ffffcc',
            FontStyle: 'Italic',
            ForeColor: '#000000',
          },
          Expression: '[InvoicedCost]> 2000 AND [ItemCount] > 30'
        },
     ],
   },
   Layout: {
     CurrentLayout: 'Orders View',
     Layouts: [
       {
         Columns: [
           'OrderId',
           'OrderDate',
           'CustomerReference',
           'CompanyName',
           'ContactName',
           'InvoicedCost',
           'ChangeLastOrder',
           'OrderCost',
           'PackageCost',
           'ItemCost',
           'ItemCount',
         ],
         Name: 'Orders View',
       },
       {
         Columns: [
           'OrderId',
           'ShipVia',
           'Freight',
           'ShipName',
           'ShipCountry',
           'ShippedDate',
           'CustomerReference',
         ],
         ColumnSorts: [
           {
             Column: 'ShipName',
             SortOrder: 'Asc',
           },
         ],
         Name: 'Shipping View',
       },
     ],
   },
   FormatColumn: {
     FormatColumns: [
       {
         Scope: { ColumnIds: ['OrderId'] },
         Style: {
           BackColor: '#d4fb79',
           ForeColor: '#8b0000',
           FontWeight: 'Normal',
           FontStyle: 'Normal',
           ClassName: '',
         },
       },
     ],
   },
 *
 } as PredefinedConfig;
 ```

## State Functions example

(Taken from our [State Functions demo](https://demo.adaptabletools.com/adaptablestate/aggridstatefunctionsdemo))

 ```ts
 const adaptableOptions: AdaptableOptions = {
    primaryKey: 'OrderId',
    userName: 'Demo User',
    adaptableId: 'State Functions Demo',
    stateOptions: {
      /**
       * The loadState function is used to load the predefined config
       * from a remote source - namely firebase in this example
       *
       * It returns a promise which is resolved when the Predefined Config is retrieved from firebase.
       */
      loadState: () => {
        return firebase
          .database()
          .ref(`predefinedconfig/${id}`)
          .once('value')
          .then(function(snapshot) {
            const str = snapshot.val();
            return str ? JSON.parse(str) : {};
          });
      },

      /**
       * The persistState function is called with the state that needs to be persisted.
       * By default, state is persisted in localStorage, but this example
       * illustrates how you can persist it to a remote datastore (Firebase, etc)
       */
      persistState: (state: Partial<AdaptableState>) => {
        return firebase
          .database()
          .ref(`predefinedconfig/${id}`)
          .set(JSON.stringify(state))
          .then(() => Promise.resolve(true));
      },
    },
    predefinedConfig: demoConfig,
    vendorGrid: { ...gridOptions, modules: AllEnterpriseModules },
  };
 ```
 
## Demos

Visit the [AdapTable Demo Site](https://demo.adaptabletools.com/adaptablestate) to see a number of state-related demos

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us/articles/360007083017-Help-) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
