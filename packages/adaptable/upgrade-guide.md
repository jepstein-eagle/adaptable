# AdapTable Upgrade Guide

Version 6 of AdapTable includess many new features, improvements and ways of working that will allow you to do more with the tool than ever before. 

This document will help you migrate to Version 6 of AdapTable and point out some of the more important changes and improvements.

## Package name changes

Version 6 of AdapTable reflects the new name of the product; formally known as the 'Adaptable Blotter', it has been renamed 'AdapTable' to reflect the tabular nature of the tool and that it can be, and is, widely used outside of finance.

As a consequence:

The package `@adaptabletools/adaptableblotter` has been renamed to `@adaptabletools/adaptable`

The package `@adaptabletools/adaptableblotter-react-aggrid` has been renamed to `@adaptabletools/adaptable-react-aggrid`

The package `@adaptabletools/adaptableblotter-angular-aggrid` has been renamed to `@adaptabletools/adaptable-angular-aggrid`

## ag-Grid modularisation

Version 6 depends on ag-Grid >=22, which included a big shift in modularization when transitioning from ag-Grid 21.

AdapTable (both 'core' and wrappers) now depend on `@ag-grid-community/all-modules` (as a peer dependency), so please make sure you install it.

You can, additionally, install as many ag-Grid Enterprise modules as you want; AdapTable will only provide functionality that matches the ag-Grid modules that you provide.

## Plugins:  Charts & Financial

AdapTable now includes a plugins architecture, which makes the core package much lighter. 

The core package (and react and angular wrappers) no longer includes charting and financial-specific functionality. This means ligher javascript bundles for most users.

We currently offer 2 plugins (though more will be added in the future):

 * `@adaptabletools/adaptable-plugin-charts`
 * `@adaptabletools/adaptable-plugin-finance`

In order to use a plugin, you have to install it via npm or yarn, and you need to install the **exact same version** as the `@adaptabletools/adaptable` package you are already using in your app.

See the code example below for more details.

## Type changes

We have renamed some of the core types we use to reflect the product name change.

Instead of 
```ts
import { AdaptableBlotterOptions } from "@adaptabletools/adaptableblotter/types";
```
you now do
```ts
import { AdaptableOptions } from "@adaptabletools/adaptable/types";
```

Also the `blotterId` of `AdaptableOptions`  has been renamed to `adaptableId`.

In the Angular version, instead of

```ts
import { AdaptableBlotterAngularAgGridModule } from '@adaptabletools/adaptableblotter-angular-aggrid';
```

you now do
```ts
import { AdaptableAngularAgGridModule } from '@adaptabletools/adaptable-angular-aggrid';
```

## Instantiation changes

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

## Styling changes

We've made **no changes to our styling/css classes/selectors**.

Just note that if you used to install ag-Grid styles like this:
```ts
import "ag-grid-community/dist/styles/ag-grid.css";
```
you will now have to do:
```ts
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
```

## HTML rendering changes

The name of the <div> that hosts AdapTable has changed.  
  
Instead of providing:
```html
<div id="adaptableBlotter"></div>
```
your html should now look like:
```html
<div id="adaptable"></div>
```

The old structure is still working, but we show warning in the console.

## Adaptable Options

The nam

We have also added lots more options to xx in order to give you complete contro


## Basic example

```tsx
// if you need an additional AgGrid module, import it
// and pass it in the adaptableOptions.vendorGrid.modules array
import { MenuModule } from '@ag-grid-enterprise/menu';

import Adaptable from "@adaptabletools/adaptable/agGrid";
import "@adaptabletools/adaptable/index.css";

import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";

import charts from "@adaptabletools/adaptable-plugin-charts";
import finance from "@adaptabletools/adaptable-plugin-finance";

import { AdaptableOptions } from "@adaptabletools/adaptable/types";

const columnDefs = [
  { field: "OrderId", type: "abColDefNumber" },
  { field: "CompanyName", type: "abColDefString" },
  { field: "ContactName", type: "abColDefString" },
  { field: "Employee", type: "abColDefString" },
  { field: "InvoicedCost", type: "abColDefNumber" }
];

const adaptableOptions: AdaptableOptions = {
  primaryKey: "OrderId",
  userName: "Demo User",
  adaptableId: "Simple Demo",

  // call the plugins functions and pass them to the plugins array in the AdaptableOptions object
  plugins: [charts(), finance()],

  vendorGrid: {
    modules: [MenuModule],
    enableRangeSelection: true,
    columnDefs,
    columnTypes: {
      abColDefNumber: {},
      abColDefString: {},
      abColDefBoolean: {},
      abColDefDate: {},
      abColDefNumberArray: {},
      abColDefObject: {}
    },
    rowData: []
  },
  predefinedConfig: {}
};

const api = Adaptable.init(adaptableOptions);
```

