# AdapTable Version 6 Upgrade Guide

Version 6 of AdapTable includes many new features, improvements and ways of working that will allow you to do more with the tool than ever before. 

This document will help you migrate to the new version and points out some of the more important changes and improvements.

## Package Name Changes

Version 6 of AdapTable reflects the new name of the product; formally known as the *Adaptable Blotter*, it has been renamed **AdapTable** to illustrate the tabular nature of the tool and that it can be, and is, widely used outside of finance.

As a consequence:

- The package `@adaptabletools/adaptableblotter` has been renamed to `@adaptabletools/adaptable`

- The package `@adaptabletools/adaptableblotter-react-aggrid` has been renamed to `@adaptabletools/adaptable-react-aggrid`

- The package `@adaptabletools/adaptableblotter-angular-aggrid` has been renamed to `@adaptabletools/adaptable-angular-aggrid`

## ag-Grid Modularisation

Version 6 depends on ag-Grid v.22 which introduced [modularization](https://www.ag-grid.com/javascript-grid-modules/), allowing users to select which functionality they want.  The distinction between Community (free) and Enterprise (commercial) was maintained.

AdapTable (all packages) now depends on `@ag-grid-community/all-modules` as a **peer dependency**, so please make sure you install it.

You can, additionally, install as many ag-Grid Enterprise modules as you want; AdapTable will only provide functionality that matches the ag-Grid modules that you provide.

In the vanilla JavaScript version you add the modules as an extra property of **vendorGrid** (in *AdaptableOptions*):

```ts
 vendorGrid: {
      ...gridOptions,
      modules: [RangeSelectionModule, MenuModule, SideBarModule, RowGroupingModule],
    },
```

In the React Wrapper there is a **Modules** prop:

```ts
export default () => <AdaptableReactAgGrid
  modules={[SideBarModule, MenuModule, RangeSelectionModule]}
  gridOptions={ ... }
  plugins={plugins}
  adaptableOptions={adaptableOptions}
  onAdaptableReady={({adaptableApi, vendorGrid}) => { ... }}
/>
```
Similarly in the Angular Wrappers there is a **Modules** attribute:

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

AdapTable now includes a plugins architecture to reduce download size. 

The core package (and react and angular wrappers) no longer includes charting or financial-specific functionality as standard. This means much lighter JavaScript bundles for most users.

Instead, these are available through 2 plugins (though more will be added in the future):

- **Charts** (`@adaptabletools/adaptable-charts-finance`)

> courtesy of [Infragistics](https://www.infragistics.com/products/ignite-ui-react) - provides Category, Pie, Doughnut, Sparkline and Financial charts.  

- **Finance** (`@adaptabletools/adaptable-plugin-finance`)

> adds additional functionality of benefit only to advanced financial users.

In order to use a plugin, you have to install it via npm or yarn.

> Note: you need to install the **exact same version** as the `@adaptabletools/adaptable` package you are already using in your app.

See the code example at the bottom of the page for more details.

## Type Changes

We have renamed some of the core 'types' to reflect the product name change.

#### AdaptableOptions

Instead of: 
```ts
import { AdaptableBlotterOptions } from "@adaptabletools/adaptableblotter/types";
```
you will now do:
```ts
import { AdaptableOptions } from "@adaptabletools/adaptable/types";
```
#### adaptableId

The `blotterId` property of `AdaptableOptions` has been renamed to `adaptableId`.

#### AdaptableApi

Instead of: 
```ts
import { BlotterApi } from "@adaptabletools/adaptableblotter/types";
```
you will now do:
```ts
import { AdaptableApi } from "@adaptabletools/adaptable/types";
```

#### Wrapper Types

In the Angular Wrapper, instead of:

```ts
import { AdaptableBlotterAngularAgGridModule } from '@adaptabletools/adaptableblotter-angular-aggrid';
```

you will now do:
```ts
import { AdaptableAngularAgGridModule } from '@adaptabletools/adaptable-angular-aggrid';
```

In the React Wrapper, instead of:

```ts
import AdaptableBlotterReact from '@adaptabletools/adaptableblotter-react-aggrid';
```

you will now do:
```ts
import AdaptableReactAgGrid from '@adaptabletools/adaptable-react-aggrid';
```


## Instantiation

We have made it easier to create an instance of AdapTable by providing a static constructor. 

This comes with the added bonus that the constructor returns an [Adaptable API](https://api.adaptabletools.com/interfaces/_src_api_adaptableapi_.adaptableapi) object that you can use to access all features and state of AdapTable at runtime.  

So, instead of:

```ts
const blotter = new AdaptableBlotter(adaptableOptions)
```
you will now do

```ts
const api: AdaptableApi = Adaptable.init(adaptableOptions)
```
Not only do you get back the public api but you no longer have access to a very large blotter instance, which contains a lot of private fields, not meant for public use and which caused issues for our users.


## React wrapper prop changes

The `blotterOptions` prop has been renamed to `adaptableOptions`

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

> Note: the old structure is still working, but we will show a warning in the console.

## Events

There were previously 2 ways of subscribing to events, one of which was deprecated.  

That has now been removed and the only way to listen to events is by using the On('eventName') syntax.

Note: AdapTable events use FDC3 so you need to drill down to the actual event args.

For example to subscribe to the `ActionColumnClicked` event you will do:

```ts
  api.eventApi.on('ActionColumnClicked', (args: ActionColumnClickedEventArgs) => {
    const actionColumnClickedInfo: ActionColumnClickedInfo = args.data[0].id;
    const rowData: any = actionColumnClickedInfo.rowData;
    api.gridApi.deleteGridData([rowData]);
 });
```

Find out more - and see the full list of AdapTable events at [Event API Documentation](https://api.adaptabletools.com/interfaces/_src_api_eventapi_.eventapi.html)


## New Features

We have added a lot of new functionality to AdapTable in version 6.  This includes many more options (and option groups) to [Adaptable Options](https://api.adaptabletools.com/interfaces/_adaptableoptions_adaptableoptions_.adaptableoptions) (the object you create at design time and provide to the AdapTable constructor), more [API methods](https://api.adaptabletools.com/interfaces/_src_api_adaptableapi_.adaptableapi)  and more [Predefined Config](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_predefinedconfig_.predefinedconfig.html) properties. 

The result is to give you more complete control over how your instance of AdapTable looks and works. 

There are far too many new features to list here but some of the headlines are:

* [Options to manage state hydration/dehydration](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_stateoptions_.stateoptions.html)
* [Application Data Entries to store custom state](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_applicationstate_.applicationdataentry.html)
* [Adaptable Tool Panel](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_toolpanelstate_.toolpanelstate.html)
* [Server Validation](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_editoptions_.editoptions.html)  
* [Updated Rows](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_updatedrowstate_.updatedrowstate.html)
* [Saveable Pivot and Grouped Layouts](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_layoutstate_.pivotdetails.html)   
* [Custom Dashboard Toolbars](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_dashboardstate_.dashboardstate.html#customtoolbars)
* [Column Menu bespoke items](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_userinterfacestate_.userinterfacestate.html#columnmenuitems)
* [Context Menu bespoke items](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_userinterfacestate_.userinterfacestate.html#contextmenuitems)
* [Quick Search exclude columns](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_searchoptions_.searchoptions.html#excludecolumnfromquicksearch)
* [ipushpull improvements](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_ipushpullstate_.ipushpullstate.html)


## Basic Installation Example

This example shows how to set up a basic instance of AdapTable ('core' package) using ag-Grid:

```tsx
// import Adaptable
import Adaptable from "@adaptabletools/adaptable/agGrid";

// import the Adaptable types
import { AdaptableOptions, AdaptableApi } from "@adaptabletools/adaptable/types";

// import Plugins
import charts from "@adaptabletools/adaptable-plugin-charts";
import finance from "@adaptabletools/adaptable-plugin-finance";

// impport any additional AgGrid module needed and pass to adaptableOptions.vendorGrid.modules
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';

// import Adaptable css and themes
import '@adaptabletools/adaptable/index.css';
import '@adaptabletools/adaptable/themes/dark.css';

// import ag-grid css and themes
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css";


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
