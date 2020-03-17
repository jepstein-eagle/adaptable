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

Predefined Config consists of a series of (nullable) properties that themselves each implement Config State (e.g. `AdvancedSearch`, `Layouts` etc.

Users only need to provide config for those properties which they want intial state; within each object every object is nullable (with default values) so only those elements which differ from the default implementation need to be provided.

> To prevent users from editing the Adaptable Objects shipped in PredefinedConfig, set the Entitlement for that function to `ReadOnly`.

### How Predefined Config Works
Predefined Config is created at design-time in JSON format.  

It is passed into AdapTable via the `predefinedConfig` property in [AdaptableOptions](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_adaptableoptions_.adaptableoptions.html#predefinedconfig). 

It can be passed in either as pure JSON or as a url to a file which contains the JSON.

When AdapTable is first loaded, any Predefined Config is read into memory and then stored (either locally or remotely - depending on your settings - see below) together with any user state that is created during that session.

Subsequently, each time the application is launched, that User State is retrieved and the particular AdapTable instance is pre-populated with it. 

In other words, Predefined Config is read once and merged into the user's Adaptable State, and then any run-time changes which users make will form part of their State and be continually updated.

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

```yaml
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

This has a single `Uuid` property which is used for easy identification of objects and to make it easy for AdapTable instances to share state and inform each other when an item has been created / edited / deleted..

This is included by AdapTable in all base objects and also frequently used objects like Expressions.

> Do not set this property when writing objects in your Predefined Config as it will be set by AdapTable at run-tine when the config is first read

### Bespoke State

The [Application State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_applicationstate_.applicationstate.html) property of Predefined Config contains an ApplicationDataEntries array.

This is essentially a set of key / value pairs that you can populate with any data that you want and which AdapTable will store in its state.

## State Management

AdapTable makes it easy for you, via configuration, to store Adaptable State, in a location most suitable to your requirements (ie. locally or remotely).  

User state can be created at run-time (through user action e.g. selecting a Layout, creating a Column Filter etc.) or provided at design-time (through Predefined Config).

> Internally AdapTable uses Redux to manage its state - this provides a unidirectional store for all the objects used in the grid.  If you are also using Redux in your own application then you should continue to use your own Store and not merge the 2 Stores. 

 
### Adaptable State Storage Options
There are 2 modes of storage available in AdapTable:

- **Local Storage** - by default, Adaptable State is stored in the browser's local storage using the unique `adaptableId` property that you provide in AdaptableOptions.

  > If using Local Storage, all user state will be lost each time the user clear's the browser cache and will not be available when switching computer.

- **Remote Storage** - user state is stored remotely (via ConfigServer) at a configured location. All user state is automatically sent to the location specified in ConfigServer and then persisted there.

Important
Remote Storage is enabled by setting the enableConfigServer property to true when AdapTable is integrated with the host application.  (If this is set to false, then Local Storage will be used.)

You will, additionally, need to provide the location where you want the configuration to be stored.  This is done via the configServerUrl property.

Note
When using Remote Storage, all user configuration is still available even after switching computers.

For more information, see Config Server.


Tip
Additionally AdapTable provides 4 function hooks to enable advanced users to provide their own implementations / functionality when state is being managed.

This allows you to provide your own hydration or rehydration functionality or to enrich the State when its being loaded with your own items (e.g. entitlements).

There are 4 functions available: loadState, applyState, saveState and persistState.

See more at State Options.

### Accessing Adaptable State
The recommended way to access the Store is via the Adaptable Api which provides you with full programmatic read / write access to all our objects in a clean way.

> The Adaptable Api is actually a simple wrapper around our Redux store with basic read / write access and some additional error handling, logging and other features.

We strongly recommend that you use the Adaptable API to access the Store (both for reading and writing).

Listening to State Changes
The recommended way to listen to changes in the Store is by subscribing to the AuditStateChanged audit event in the AuditEventsAPI section of the Adaptable API.

This event can be set to fire through the Audit Log - which gives you the option of listening to User State changes, Internal State changes or both. There is an option to set whether this Audit Message is fired as an event.


## FAQs

Where is configuration stored?

By default its stored in the local browser cache. However if the enableConfigServer property is set to true during installation you can choose to store in a different location which is more convenient for you.

Do you provide data adapters to fetch / save configuration?

No we don't, you will need to provide the mechanism to store configuration in a remote location.

Can I preconfigure my AdapTable instance?

Yes you can. You are able to build your own Adaptable Objects which are stored as Predefined Config. You are able to provide this configuration as a JSON object or as a URL (to a .JSON file).

Can I provide different configuration per user?

Yes, that is possible and expected.  AdapTable allows you provide highly configurable and personalised instances.


 ## Predefined Config example

 ```yaml
 export default {
  Dashboard: {
    Tabs: [
          {
            Name: 'Search',
            Toolbars: ['QuickSearch', 'DataSource', 'AdvancedSearch'],
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
     DisplayAction: 'ShowRowAndHighlightCell',
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
        ReportColumnScope: 'BespokeColumns',
        ReportRowScope: 'ExpressionRows',
        ColumnIds: [
          'OrderId',
          'Freight',
          'Employee',
          'PackageCost',
          'InvoicedCost',
         ],
         Expression: {
             RangeExpressions: [
             {
               ColumnId: 'Freight',
               Ranges: [
                 {
                   Operand1: '500',
                   Operand1Type: 'Value',
                   Operand2: '',
                   Operand2Type: 'Value',
                   Operator: 'GreaterThan',
                 },
               ],
             },
           ],
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
         ColumnId: 'ChangeLastOrder',
         Style: {
           ForeColor: '#008000',
         },
         ConditionalStyleScope: 'Column',
         Expression: {
            FilterExpressions: [
             {
               ColumnId: 'ChangeLastOrder',
               Filters: ['Positive'],
             },
           ],
         },
       },
       {
         ColumnId: 'ChangeLastOrder',
         Style: {
           ForeColor: '#ff0000',
         },
         ConditionalStyleScope: 'Column',
         Expression: {
           FilterExpressions: [
             {
               ColumnId: 'ChangeLastOrder',
               Filters: ['Negative'],
             },
           ],
         },
       },
       {
         Style: {
           BackColor: '#ffffcc',
           FontStyle: 'Italic',
           ForeColor: '#000000',
         },
         ConditionalStyleScope: 'Row',
         Expression: {
           RangeExpressions: [
             {
               ColumnId: 'InvoicedCost',
               Ranges: [
                 {
                   Operand1: '2000',
                   Operand1Type: 'Value',
                   Operand2: '',
                   Operand2Type: 'Value',
                   Operator: 'GreaterThan',
                 },
               ],
             },
           ],
         },
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
         ColumnSorts: [],
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
             SortOrder: 'Ascending',
           },
         ],
         Name: 'Shipping View',
       },
     ],
   },
   FormatColumn: {
     FormatColumns: [
       {
         ColumnId: 'OrderId',
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


## Demos

Visit the [AdapTable Demo Site](https://demo.adaptabletools.com/adaptablestate) to see a number of state-related demos

## Help

Further information about AdapTable is available at our [Website](www.adaptabletools.com) and our [Help Site](https://adaptabletools.zendesk.com/hc/en-us)

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
