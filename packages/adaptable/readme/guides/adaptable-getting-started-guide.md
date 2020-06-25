# AdapTable Getting Started Guide

This guide is designed to help new users get up and running quickly with the key concepts and objects in AdapTable.

## Adaptable State / Predefined Config

One of the key functionalities offered by AdapTable is User State Management. This takes 2 forms:

- **Predefined Config**: State created by Developers at Design Time and shipped with Adaptable for first-time use.

    Typically developers will create a new AdapTable instance filled with [Predefined Configuration](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_adaptableoptions_.adaptableoptions.html#predefinedconfig).  This means that when new users open the application, they will see AdapTable pre-loaded with multiple Searches, Styles, Edit Rules, Reports etc that match their needs.

    Additionally Predefined Configuration can include 'Entitlements' - stipulating which AdapTable functions users are allowed to access (See [Entitlements Guide](./adaptable-entitlements-guide.md) for more information)

- **Saving State**:  Managing changes made to user state at Run Time and storing it for future use

    AdapTable automatically saves User State as it changes - meaning that the next time the Application is reloaded, the user sees the same state as on the previous visit.

    Adaptable State can either be saved to Local Storage or to a remote location - via the State Options Functions which allow developers to store User State in any location of their choosing.

### More Information

- [AdapTable State Guide](./adaptable-state-guide.md) 
- [Predefined Config Developer Documentation](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_predefinedconfig_.predefinedconfig.html) 
- [AdapTable State Demos](https://demo.adaptabletools.com/adaptablestate) 
- [AdapTable Entitlements Guide](./adaptable-entitlements-guide.md)

## Adaptable Options

AdaptableOptions is a large group of property options designed to help developers set up AdapTable at design time so that it fits their requirements. 

There are 2 mandatory properties (primaryKey and vendorGrid) and a host of optional ones (including Predefined Config - see below). 

Most properties are grouped in a series of conceptual sets (e.g. Layout Options, Search Options, Edit Options etc.)

Where a property is not provided, AdapTable provides a sensible default, so developers only need to set Options where they wish to provide a different value.

### More Information

- [Adaptable Options Developer Documentation](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_adaptableoptions_.adaptableoptions.html) 
- [AdapTable Options Demos](https://demo.adaptabletools.com/adaptableoptions) 

## Adaptable Api

AdapTable's rich, powerful api provides full safe, run-time access to all the functionality and state inside AdapTable. 

This allows users to create, save and delete AdapTable objects in their our screens bypassing AdapTable's UI, or to access the Store in a safe non-mutable manner.

Everything that can be done in AdapTable through the UI can also be done through code via the Adaptable Api.

### More Information

- [Adaptable Api Developer Documentation](https://api.adaptabletools.com/interfaces/_src_api_adaptableapi_.adaptableapi.html)
- [AdapTable Api Demo](https://demo.adaptabletools.com/admin/aggridblotterapidemo) 

### How It Fits Together

These 3 objects are linked as follows:

**Predefined Configuration** is a property of **AdaptableOptions**.  
This is the only object which the *AdapTable static constructor* requires in order to initialise everything and build the grid.
The constructor returns the **AdaptableApi** object so it is available for future reference.

```ts

// Create an AdaptableOptions object to pass in to the constructor
 const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId', // a unique column
    vendorGrid: {      // the underlying vendor DataGrid
      ...gridOptions,   // in this example its an ag-Grid GridOptions
      modules: AllEnterpriseModules, // passing in any ag-Grid Modules that are required
    },
    predefinedConfig: applicationJSON, // the predefined config we created
  };

// The AdapTable constructor returns a promise containing an API object that we can use
 const adaptableApi: AdaptableApi = await Adaptable.init(adaptableOptions);
 ```

There is also a static `initLazy` constructor which receives an AdaptableOptions object and returns a Promise that contains the `api` object.  It is utilised by the [No Code Version](https://github.com/AdaptableTools/adaptable/tree/master/packages/plugins/nocode-aggrid) and is used as follows: 

```ts
  Adaptable.initLazy(adaptableOptions).then((api: AdaptableApi) => {
    // do run-time stuff with the api
  });
 ```

## UI Elements

There are a number of key UI elements in AdapTable:

### Dashboard

The Dashboard is the area above the Grid designed to give quick access to commonly used AdapTable Functions.

It is fully configurable both at Design-Time (through Predefined Config) and at run-time through config screens.

The Dashboard contains 2 main elements:

1. **Tabs**: These contain Toolbars - small controls containing buttons and dropdown relevant to a single Function, often avoiding the need to access the Function popup directly.  The Dashboard can also include Custom Toolbars

2. **Shortcut Buttons**: a group of Buttons that provide ready access to frequently used functions.

The Dashboard can be viewed in collapsed / expanded / floating state as required.


### Tool Panel

An alternative to using the Dashboard for ag-Grid users is the AdapTable Tool Panel.

This is the collapsible area to the right of the Grid.

The AdapTable Tool Panel has many of the same features as the Dashboard (except for Custom Toolbars) and is ideal for when screen estate is at a premium.

### Menus

AdapTable provides 2 menus each of which contains menu entries appropriate to the current column or cell:

- **Column Header Menu**: accessed by clicking on the image in the right corner of a column header

    > The options in the menu vary depending on the data type of column and the current state of that column. For example, only numeric columns have a Flashing Cell menu item, and if the column is already set to display flashing cells, the Turn Flashing Cell On option is replaced by Turn Flashing Cell Off.

- **Context Menu**: accessed by right-clicking in any cell inside the Grid.

    The context menu options will vary according to what other cells are selected.

    > If you are using a trackpad you might not be able to access the ag-Grid context menu (which AdapTable uses when ag-Grid is the vendor grid); if that is the case then set allowContextMenuWithControlKey to true in gridOptions.

Developers can add their own items to the Column and Context Menus through [User Interface Predefined Config](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_userinterfacestate_.userinterfacestate.html)

Additionally, they can choose not to display some (or all) of the shipped Column and Context Menu items through the `showAdaptableColumnMenu` and `showAdaptableContextMenu` properties / functions. 


### Wizards

Many of the forms to create Adaptable Objects have wizards. 

These make it easy to create and edit Adaptable Objects step by step by clicking the Forward, Back or Finish buttons as appropriate.

> Wizards also contain a legend that tells you where you are positioned in the Wizard at one time; if editing an existing object, the links in the legend are activated to make it easy to jump forward to a later wizard stage.

Note: many of the wizards include a step to build a **query**. This step is quite complex and itself can involve numerous iterations (if required). (For more information see the [Adaptable Expression Guide](./adaptable-expression-guide)).

### Selection Tool

Many functions (e.g. Column Chooser or Custom Sort) in AdapTable use the Selection Tool. 

This allows users easily to manage both order and visibility of items in a collection.

All Selection Tools have the source list in the left hand side listbox and the result list (showing ordered, visible values) in the right hand side listbox.

> Users can  use the buttons to move items between lists and within the result list, or they can use Drag and Drop.

### Help

Many of the screens in AdapTable have context-sensitive help, where appropriate, displaying an information icon. 

When the cursor hovers over the icon, the help information appears in a pop-up dialog.


### More Information

- [Dashboard Function Read Me](../functions/dashboard-function.md)
- [Dashboard Demos](https://demo.adaptabletools.com/dashboard)
- [User Interface State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_userinterfacestate_.userinterfacestate.html)
- [User Interface Demos](https://demo.adaptabletools.com/userinterface)


## Demo

To see AdapTable in action visit our [Demo Site](https://demo.adaptabletools.com).  Here you can see a large number of AdapTable demos each showing a different feature, function or option in AdapTable (using dummy data sets).

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us/articles/360007083017-Help-) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
