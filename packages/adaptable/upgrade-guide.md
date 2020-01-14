# Upgrade guide

This document will help you migrate from v5 to v6 of the blotter

## Package name change

The package `@adaptabletools/adaptableblotter` has been renamed to `@adaptabletools/adaptable`

## AgGrid update

v6 now depends on AgGrid >=22, which included a big shift in modularization when transitioning from AgGrid 21.

AdapTable (all versions) now depend on `@ag-grid-community/all-modules` (as a peer dependency), so please make sure you install it.

## Charts and financial

AdapTable how has a plugins architecture, which makes the package ligher. The core package (and react and angular wrappers) no longer includes charting and financial specific cell operations. This means ligher javascript bundles for most users.

For now, we offer 2 plugins:

 * `@adaptabletools/adaptable-plugin-charts`
 * `@adaptabletools/adaptable-plugin-finance`

In order to use a plugin, you have to install it via npm or yarn, and you need to install the EXACT SAME version as the `@adaptabletools/adaptable` you are already using in your app.

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
  { field: "InvoicedCost", type: "abColDefNumber", valueFormatter: "x.toLocaleString()" }
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


## Type changes

Instead of 
```ts
import { AdaptableBlotterOptions } from "@adaptabletools/adaptableblotter/types";
```
you now do
```ts
import { AdaptableOptions } from "@adaptabletools/adaptable/types";
```

Also, `AdaptableOptions` `blotterId` has been renamed to `adaptableId`.

## Instantiation changes

Instead of

```ts
const blotter = new AdaptableBlotter(adaptableOptions)
```
you have to do
```ts
const api = AdaptableBlotter.init(adaptableOptions)
```
Now you only get back the public api, no longer the whole blotter instance, which used to contain a lot private fields, not meant for public use.

## Styling changes

We've made no changes to our styling/css classes/selectors.

Just note that if you used to do
```ts
import "ag-grid-community/dist/styles/ag-grid.css";
```
You now have to do
```ts
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
```

## HTML rendering changes

Instead of having
```html
<div id="adaptableBlotter"></div>
```
Your html should now look like
```html
<div id="adaptable"></div>
```

The old structure is still working, but showing a warning in the console
