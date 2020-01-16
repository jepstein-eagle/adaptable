# AdapTable Upgrade Guide

Version 6 of AdapTable includes many new features, improvements and ways of working that will allow you to do more with the tool than ever before. 

This document will help you migrate to Version 6 of AdapTable and point out some of the more important changes and improvements.

## Package Name Changes

Version 6 of AdapTable reflects the new name of the product; formally known as the 'Adaptable Blotter', it has been renamed 'AdapTable' to reflect the tabular nature of the tool and that it can be, and is, widely used outside of finance.

As a consequence:

The package `@adaptabletools/adaptableblotter` has been renamed to `@adaptabletools/adaptable`

The package `@adaptabletools/adaptableblotter-react-aggrid` has been renamed to `@adaptabletools/adaptable-react-aggrid`

The package `@adaptabletools/adaptableblotter-angular-aggrid` has been renamed to `@adaptabletools/adaptable-angular-aggrid`

## ag-Grid Modularisation

Version 6 depends on ag-Grid v.22.  This included a big change to using [modularization](https://www.ag-grid.com/javascript-grid-modules/), allowing users to select which functionality they wanted.  The distinction between Community (free) and Enterprise (commercial) was maintained.

AdapTable (both 'core' and frameworks wrappers) now depends on `@ag-grid-community/all-modules` (as a peer dependency), so please make sure you install it.

You can, additionally, install as many ag-Grid Enterprise modules as you want; AdapTable will only provide functionality that matches the ag-Grid modules that you provide.

In the vanilla JavaScript version you add the modules as an extra property of vendorGrid:

```ts
 vendorGrid: {
      ...gridOptions,
      modules: [RangeSelectionModule, MenuModule, SideBarModule, RowGroupingModule],
    },
```

In the React Wrapper there is a Modules propery you can use:

```ts
export default () => <AdaptableReactAgGrid
  modules={[SideBarModule, MenuModule, RangeSelectionModule]}
  gridOptions={ ... }
  plugins={plugins}
  adaptableOptions={adaptableOptions}
  onAdaptableReady={(adaptableApi) => { ... }}
/>
```
Similarly in the Angular Wrappers you will do:

```ts
 public agGridModules: Module[] = AllEnterpriseModules;
 ........
 <adaptable-angular-aggrid
      style="width: 100vw; height: 100vh;"
      [adaptableOptions]="adaptableOptions"
      [gridOptions]="gridOptions"
      [modules]="agGridModules"
    >
    </adaptable-angular-aggrid>
```

## Plugins:  Charts & Financial

AdapTable now includes a plugins architecture, which makes the core package much lighter. 

The core package (and react and angular wrappers) no longer includes charting or financial-specific functionality. This means ligher javascript bundles for most users.

Instead, these are available through 2 plugins (though more will be added in the future):

 * `@adaptabletools/adaptable-plugin-charts`
 * `@adaptabletools/adaptable-plugin-finance`

In order to use a plugin, you have to install it via npm or yarn; you need to install the **exact same version** as the `@adaptabletools/adaptable` package you are already using in your app.

See the code example at the bottom of the page for more details.

## Types

We have renamed some of the core 'types' to reflect the product name change.

Instead of 
```ts
import { AdaptableBlotterOptions } from "@adaptabletools/adaptableblotter/types";
```
you now do
```ts
import { AdaptableOptions } from "@adaptabletools/adaptable/types";
```

Also the `blotterId` of `AdaptableOptions`  has been renamed to `adaptableId`.

In the Angular Wrapper, instead of

```ts
import { AdaptableBlotterAngularAgGridModule } from '@adaptabletools/adaptableblotter-angular-aggrid';
```

you now do
```ts
import { AdaptableAngularAgGridModule } from '@adaptabletools/adaptable-angular-aggrid';
```

In the React Wrapper, instead of

```ts
import AdaptableBlotterReact from '@adaptabletools/adaptableblotter-react-aggrid';
```

you now do
```ts
import AdaptableReactAgGrid from '@adaptabletools/adaptable-react-aggrid';
```



## Instantiation

We have made it easier to create an instance of AdapTable by providing a static constructor. 

This comes with the advantage of being able to return an [Adaptable API](https://api.adaptableblotter.com/interfaces/_api_adaptableapi_.adaptableapi) object that you can use to access all features of AdapTable at runtime.  So, instead of:

```ts
const blotter = new AdaptableBlotter(adaptableOptions)
```
you will now do

```ts
const api = Adaptable.init(adaptableOptions)
```
Not only do you get back the public api but you no longer have access to a very large blotter instance, which used to contain a lot private fields, not meant for public use and which caused issues for our users.

## Styling

We've made **no changes** to our styling/css classes/selectors.

Just note that if you used to install ag-Grid styles like this:
```ts
import "ag-grid-community/dist/styles/ag-grid.css";
```
you will now have to do:
```ts
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
```

Similarly you will import the AdapTable styles as:

```ts
import "@adaptabletools/adaptable/index.css";
import "@adaptabletools/adaptable/themes/dark.css";
```


## HTML Rendering

The name of the `div` that hosts AdapTable has changed.  
  
Instead of providing:
```html
<div id="adaptableBlotter"></div>
```
your html should now look like:
```html
<div id="adaptable"></div>
```

Note: the old structure is still working, but we will show a warning in the console.

## Events

In Version 5 of AdapTable there were 2 ways of subscribing to events, one of which was deprecated.  

That method has now been removed and the only way to listen to events is by using the On('eventName').

Note: AdapTable events use FDC3 syntax so you need to drill down to the actual event args.

For example to subscribe to the `ActionColumnClicked` event you will do:

```ts
  api.eventApi.on('ActionColumnClicked', (args: ActionColumnClickedEventArgs) => {
    const actionColumnClickedInfo: ActionColumnClickedInfo = args.data[0].id;
    const rowData: any = actionColumnClickedInfo.rowData;
    api.gridApi.deleteGridData([rowData]);
 });
```

Find out more - and see the full list of AdapTable events at [Event API Documentation](https://api.adaptableblotter.com/interfaces/_api_eventapi_.eventapi.html)


## New Features

We have added a lot of new functionality to AdapTable in version 6.  This includes many more options (and option groups) to [Adaptable Options](https://api.adaptableblotter.com/interfaces/_adaptableoptions_adaptableoptions_.adaptableoptions) (the object you create at design time and provide to the AdapTable constructor), more [API methods](https://api.adaptableblotter.com/interfaces/_api_adaptableapi_.adaptableapi)  and more [Predefined Config](https://api.adaptableblotter.com/interfaces/_predefinedconfig_predefinedconfig_.predefinedconfig.html) properties. 

The result is to give you more complete control over how your instance of AdapTable looks and works. 

There are far too many new features to list here but some of the headlines are:

* [Options to manage state hydration/dehydration](https://api.adaptableblotter.com/interfaces/_adaptableoptions_stateoptions_.stateoptions.html)
* [Application Data Entries to store custom state](https://api.adaptableblotter.com/interfaces/_predefinedconfig_applicationstate_.applicationstate.html)
* [Adaptable Tool Panel](https://api.adaptableblotter.com/interfaces/_predefinedconfig_toolpanelstate_.toolpanelstate.html)
* [Server Validation](https://api.adaptableblotter.com/interfaces/_adaptableoptions_editoptions_.editoptions.html)  
* [Updated Rows](https://api.adaptableblotter.com/interfaces/_predefinedconfig_updatedrowstate_.updatedrowstate.html)
* [Saveable Pivot and Grouped Layouts](https://api.adaptableblotter.com/interfaces/_predefinedconfig_layoutstate_.pivotdetails.html)   
* [Custom Dashboard Toolbars](https://api.adaptableblotter.com/interfaces/_predefinedconfig_dashboardstate_.customtoolbar.html)
* [Column Menu bespoke items](https://api.adaptableblotter.com/interfaces/_predefinedconfig_userinterfacestate_.userinterfacestate.html#columnmenuitems)
* [Context Menu bespoke items](https://api.adaptableblotter.com/interfaces/_predefinedconfig_userinterfacestate_.userinterfacestate.html#contextmenuitems)
* [Quick Search exclude columns](https://api.adaptableblotter.com/interfaces/_adaptableoptions_searchoptions_.searchoptions.html#excludecolumnfromquicksearch)
* [iPushPull improvements](https://api.adaptableblotter.com/interfaces/_predefinedconfig_ipushpullstate_.ipushpullstate.html)


## Basic Installation Example

```tsx
// impport any additional AgGrid module needed and pass to adaptableOptions.vendorGrid.modules
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';

// import Adaptable
import Adaptable from "@adaptabletools/adaptable/agGrid";

// import the Adaptable types
import { AdaptableOptions, AdaptableApi } from "@adaptabletools/adaptable/types";

// import Plugins
import charts from "@adaptabletools/adaptable-plugin-charts";
import finance from "@adaptabletools/adaptable-plugin-finance";

// import AdapTable and vendor grid styles
import "@adaptabletools/adaptable/index.css";
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";

// create column definitions
const columnDefs = [
  { field: "orderId", headerName: 'Order Id', type: "abColDefNumber" },
  { field: "companyName", headerName: 'Company', type: "abColDefString" },
  { field: "contactName", headerName: 'Contact', type: "abColDefString" },
  { field: "employeeName", headerName: 'Employee', type: "abColDefString" },
  { field: "invoicedCost", headerName: 'Invoiced Amount', type: "abColDefNumber" }
];

// create AdaptableOptions
const adaptableOptions: AdaptableOptions = {
  primaryKey: "orderId",
  userName: "Demo User",
  adaptableId: "Version 6 Demo",

  // call the plugins functions and pass them to plugins array
  plugins: [charts(), finance()],

  vendorGrid: {
    columnDefs,
    enableRangeSelection: true,
    columnTypes: {
      abColDefNumber: {},
      abColDefString: {},
      abColDefBoolean: {},
      abColDefDate: {},
      abColDefNumberArray: {},
      abColDefObject: {}
    },
    rowData: [],
    // attach the ag-Grid modules to the new 'modules' property
    modules: [MenuModule, RangeSelectionModule],
  },
  predefinedConfig: {} // supply any config that you need
};

// call Constructor with AdaptableOptions and receive the AdaptableAPI for future use
const api: AdaptableApi = Adaptable.init(adaptableOptions);

// You can now use the API to manage AdapTable and listen to Adaptable events, e.g.
 api.eventApi.on('AdaptableReady', () => {
    // perform anything you need to do when AdapTable is ready
  });
  
```

## Further Information and Help

Read more at:

 * [Developer Documentation](https://api.adaptableblotter.com/index.html)
 * [Help Site](https://adaptabletools.zendesk.com/hc/en-us)
 * [Demo Site](https://demo.adaptableblotter.com/)
 
 ## Example Projects

We have added a few example projects to Github to help you to understand how to use AdapTable.

These include:
 * [Angular Wrapper Example](https://github.com/AdaptableTools/example-adaptable-angular-aggrid)
  * [React Wrapper Example](https://github.com/AdaptableTools/example-adaptable-angular-aggrid)
   * [Parcel JS (quick build) Example](https://github.com/AdaptableTools/example-adaptable-with-parceljs)
    * [iPushpPull Example](https://github.com/AdaptableTools/example-adaptable-ipushpull-integration)
 
 
 

