# AdapTable Getting Started Guide

This guide is designed to help new users get up and running quickly with the key concepts and objects in AdapTable.

## Adaptable State / Predefined Config

One of the key functionalities offered by AdapTable is User State Management. This takes 2 forms:

- **Predefined Config**: State created by Developers at Design Time and shipped with Adaptable for first-time use.
Typically you will ship your AdapTable instance with Predefined Configuration so that your users open their application at first use and see it pre-loaded with Searches, Styles, Edit Rules, Reports etc that match their needs.

Additionally Predefined Configuration will include 'Entitlements' - stipulating which AdapTable functions they are allowed to access.

- **Saving State**:  managing changes made to state at Run Time and storing it for future use

AdapTable automatically saves User State as it changes - meaning that the next time the Application is reloaded, the user sees the same state as on the previous visit.

By default User State gets saved to Local Storage which is how most of the demos on this site work.

However we provide State Options Functions which allow developers to store User State in any location of their choosing.
You can provide AdapTable at start-up with Predefined Configuration which ensures that when AdapTable first loads it contains all the bespoke objects that your users will need. This includes Entitlements.

## Adaptable Options

You use AdaptableOptions to set up AdapTable at design time so that it fits your requirements. There are 2 mandatory properties (primaryKey and vendorGrid) and a host of optional ones (including Predefined Config - see below). Where a property is not provided, AdapTable provides a default. The developer documentation lists all the available properties and their default values.

## Adaptable API

AdapTable's api provides full safe, run-time access to all the functionality and state inside AdapTable. This allows you to create, save and delete AdapTable objects in your our screens bypassing AdapTable's UI, or to access the Store in a safe non-mutable manner.

### How It Fits Together

These 3 objects are linked as follows:

**Predefined Configuration** is a property of **AdaptableOptions** .  This is the only object which the AdapTable static constructor requires to initialise everything and it then returns the **AdaptableApi**

```ts

// Create an AdaptableOptions object to pass in to the constructor
 const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId', // a unique column
    vendorGrid: gridOptions, // the underlying vendor DataGrid
    predefinedConfig: applicationJSON, // the predefined config we created
  };

// The AdapTable constructor returns an API object that we can use
 const adaptableApi: AdaptableApi = Adaptable.init(adaptableOptions);
 ```


## UI Elements

There are a number of key UI elements in AdapTable:

### Dashboard

The Dashboard is the area at the top of AdapTable interface designed to give you quick access to commonly used Functions.

It is fully configurable both at Design-Time (through Predefined Config) and at run-time through config screens.

The Dashboard contains 2 main elements:

1. **Tabs**: These contain Toolbars - small controls containing buttons and dropdown relevant to a single Function, often avoiding the need to access the Function popup directly.

Each toolbar contains a Config button which gives access the main popup for that Function. 

The Dashboard can also include Custom Toolbars

2. **Shortcut Buttons**: a group of Buttons that provide ready access to frequently used functions.

The Dashboard can be viewed in collapsed / expanded / floating state as required.

See the [Dashboard Function Read Me](../functions/dashboard-function.md) for more information.


### Tool Panel

An alternative to using the Dashboard for ag-Grid users is the AdapTable Tool Panel.

This is the area to the right of the Grid.

The AdapTable Tool Panel has many of the same features as the Dashboard (except for Custom Toolbars) and is ideal for when screen estate is at a premium.

Menus

AdapTable provides both a Column Header Menu and a Context Menu that provides menu entries appropriate to the current column or cell.

Note
The options in the menu will vary depending on the data type of column and the current state of that column. For example, only numeric columns have a Flashing Cell menu item, and if the column is already set to display flashing cells, the Turn Flashing Cell On option is replaced by Turn Flashing Cell Off.

Tip
Access the Column Header menu by clicking on the image in the right corner of a column header.

As ag-Grid contains its own column header menu, the AdapTable menu items are inserted into that menu.  For other grids, the column menu appears in its own tab.

Warning
If you are using a trackpad you might not be able to access the ag-Grid context menu (which AdapTable uses when ag-Grid is the vendor grid); if that is the case then set allowContextMenuWithControlKey to true in gridOptions.

You can add your own items to the Column and Context Menus through User Interface Predefined Config.

Additionally, you can choose not to display some (or all) of the shipped Column and Context Menu items through the showAdaptableColumnMenu and showAdaptableContextMenu properties / functions.

Wizards

Many of the forms to create Adaptable Objects have wizards. These make it easy to create and edit items step by step by clicking the Forward, Back or Finish buttons as appropriate.

Tip
Wizards also contain a legend that tells you where you are positioned in the Wizard at one time.

If you are editing an existing object the links in the legend are activated to make it easy to jump forward to a later wizard stage.

Note
Many, but not all, wizards include a step to build a query. This step is quite complex and itself can involve numerous iterations (if required). For more see Queries.

Selection Tool

Many functions (e.g. Column Chooser or Custom Sort) in AdapTable use the Selection Tool. This allows you easily to manage both order and visibility.

All Selection Tools have the source list in the left hand side listbox and the result list (showing ordered, visible values) in the right hand side listbox.

Tip
You can use the buttons to move items between lists and within the result list, or you can use Drag and Drop.

Calendars

AdapTable has some date-related functionality that is based on a Calendar. For example, you can filter a date column so that it only shows the Last Working Day, and AdapTable uses the current calendar to figure out when the last working day was.

There are different Calendars available to use - each pre-set with the appropriate national holidays - or you can upload your own.

Help

Many of the screens in AdapTable have context-sensitive help, where appropriate, displaying an information icon. If you hover the cursor over the icon, the help information appears in a pop-up dialog.


## Demo

To see AdapTable in action visit our [Demo Site](https://demo.adaptabletools.com).  Here you can see a large number of AdapTable demos each showing a different feature, function or option in AdapTable (using dummy data sets).

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).

