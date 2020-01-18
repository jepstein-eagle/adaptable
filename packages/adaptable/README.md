# adaptable (core)

Repository for the 'Core' AdapTable package - developed by Adaptable Tools.

There are also [React](../../packages/adaptable-react-aggrid)
and [Angular](../../packages/adaptable-ng-aggrid) Wrappers available for those who wish to access AdapTable (when running with ag-Grid) using their preferred Framework.

## Upgrade Guide

Version 6 of AdapTable has introduced many new functionality and upgrades and also some new, exciting, ways of interacting with the product.  

For more information please see the [Version 6 Upgrade Guide](../../packages/adaptable/upgrade-guide.md)

## Installation

AdapTable is distributed via a private NPM registry - `https://registry.adaptabletools.com`, so getting it installed requires the following steps:

1. Acquire a commercial AdapTable License - you can email [`support@adaptabletools.com`](mailto:support@adaptabletools.com), who will provide you with your unique credentials.

2. Point your npm client to the correct registry for packages under the `@adaptabletools` scope

```npm config set @adaptabletools:registry https://registry.adaptabletools.com```

if you're using yarn

```yarn config set @adaptabletools:registry https://registry.adaptabletools.com```


3. Login to the Adaptable private registry:

```sh
npm login --registry=https://registry.adaptabletools.com --scope=@adaptabletools
```

4. Enter your credentials that was provided to you by the AdapTable support team:

  * login name
  * email
  * password
  
5. Check you are logged-in correctly by using whoami:

```
npm whoami --registry=https://registry.adaptabletools.com
```

This should display the username you received from use as the current login on the private registry

**note: this does not affect your username/login session on the public npm registry**

6. Install daptable

```npm i @adaptabletools/adaptable```

7. Make sure that all the Peer Dependencies are installed. These is currently just **@ag-grid-community/all-modules**:

```
"peerDependencies": {
    "@ag-grid-community/all-modules": "^22.1.1",
}
```
## Plugins
AdapTable now includes plugins to reduce the download size of the 'core' project and to allow you to select only the functionality you want.  

There are currently two plugins:

- **Charts** (`@adaptabletools/adaptable-charts-finance`): courtesy of Infragistics - provides Category, Pie, Doughnut, Sparkline and Financial charts.  

- **Finance** (`@adaptabletools/adaptable-plugin-finance`): adds additional functionality of benefit only to advanced financial users.

#### Plugins Example
To add a plugin you need to do the following 3 steps (using the `charts` plugin as an example):

1. Install the plugin as a separate package:

```npm i @adaptabletools/adaptable-plugin-charts```

2. Import it into your code:

```import charts from '@adaptable/adaptable-plugins-charts'```

3. Add it to the `plugins` property of *AdaptableOptions*:

```
const adaptableOptions: AdaptableOptions = {
  primaryKey: 'tradeId',
  adaptableId: 'Adaptable demo',
  ....
  plugins: [charts()]
};

```

## agGrid Enterprise Modules
AdapTable uses ag-Grid v.22.  This included a big change by introducing [modularization](https://www.ag-grid.com/javascript-grid-modules/), giving users more control over which functionality they want to use.  AdapTable fully supports this new way of working.

**If using any ag-Grid Enterprise modules, please make sure you have a valid ag-Grid licence**

#### Enterprise Modules Example
To add an ag-Grid Enterprise follow these 3 steps (using Menus and RangeSelection as an example):

1. Install the modules in npm:

```
npm i @ag-grid-enterprise/menu
npm i @ag-grid-enterprise/range-selection
```

2. Import them into your code:

```
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
```

3. Add them to the **vendorGrid** propety in *AdaptableOptions* using the **modules** property

```
  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    adaptableId: 'Modules Demo',
    vendorGrid: {
      ...gridOptions,
      modules: [MenuModule, RangeSelectionModule],
    },
    ....
  };

```

## Styling and Theming

AdapTable provides 2 default themes ('Light' and 'Dark') but you can easily create your own custom themes (by using [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)).

You **always** have to import the `index.css` file.  This contains the structural styles AdapTable requires and, also, the (default) Light theme:

```tsx
import "@adaptabletools/adaptable/index.css"
```

If you want to use the Dark theme, you will need, also, to import:

```tsx
import "@adaptabletools/adaptable/index.css" // always needed
import "@adaptabletools/adaptable/themes/dark.css"
```

To find out how to your write your custom themes, provide custom icons - and about AdapTable styling generally - please read the [Adaptable Theming and Styling Guide](../../packages/adaptable/adaptable-theming-guide.md)


## Instantiation

You create an instance of AdapTable by providing a static constructor with an [AdaptableOptions](https://api.adaptableblotter.com/interfaces/_adaptableoptions_adaptableoptions_.adaptableoptions) object.

The constructor will return an [Adaptable API](https://api.adaptableblotter.com/interfaces/_api_adaptableapi_.adaptableapi) object that you can use to access all features of AdapTable at runtime:

```ts
const api: AdaptableApi = Adaptable.init(adaptableOptions)
```


## Basic Example

```jsx

// import Adaptable
import Adaptable from "@adaptabletools/adaptable/agGrid";

// import the Adaptable types
import { AdaptableOptions, AdaptableApi } from "@adaptabletools/adaptable/types";

// import Plugins
import charts from "@adaptabletools/adaptable-plugin-charts";
import finance from "@adaptabletools/adaptable-plugin-finance";

// import any additional AgGrid module needed
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';

// import AdapTable and vendor grid styles
import '@adaptabletools/adaptable/index.css'; // includes the light theme, which is the default
import '@adaptabletools/adaptable/themes/dark.css'; // if you want to use the dark theme
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

// Create an underlying vendor Grid instance 
// in this example lets use ag-Grid which has a GridOptions object
const gridOptions: GridOptions=  {
      columnDefs: columnDefs,
      rowData : [],
      enableRangeSelection: true,
      floatingFilter: true,
      sideBar: 'columns',
      columnTypes: {
        abColDefNumber: {},
        abColDefString: {},
        abColDefBoolean: {},
        abColDefDate: {},
        abColDefNumberArray: {},
        abColDefObject: {},
        abColDefCustom: {},
      },
    };
  }
  
 // Create an AdaptableOptions object which will include some basic properties
 // And also the underlying Vendor Grid object and any Predefined Config we need
 const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'iPushPull Demo',
    vendorGrid: {
      ...gridOptions,
    // attach the ag-Grid modules to the new 'modules' property
    modules: [MenuModule, RangeSelectionModule],
     },
    // ship AdapTable with predefined Config
    predefinedConfig: demoConfig,
  };

  // Instantiate AdapTable with AdaptableOptions and recieve an AdaptableApi object for later use
  const adaptableApi: AdaptableApi = Adaptable.init(adaptableOptions);
  
  // You can now use the API to manage AdapTable and listen to Adaptable events, e.g.
 api.eventApi.on('AdaptableReady', () => {
    // perform anything you need to do when AdapTable is ready
  });
  
```


## Licences
A licence for AdapTable provides access to all product features as well as quarterly updates and enhancements through the lifetime of the licence, comprehensive support, and access to all 3rd party libraries.

Licences can be purchased individually, for a team (minimum 30 end-users), for an organisation or for integration into software for onward sale.

We can make a trial licence available for a short period of time to allow you to try out AdapTable for yourself.

Please contact [`sales@adaptabletools.com`](mailto:sales@adaptabletools.com) for more information.

 
## Demo

To see AdapTable in action visit our [Demo Site](https://demo.adaptableblotter.com) where you can see AdapTable running againt a number of different dummy data sets using various underlying DataGrids.

## Help

Further information about AdapTable is available at our [Website](www.adaptabletools.com) and our [Help Site](https://adaptabletools.zendesk.com/hc/en-us)

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptableblotter.com) 

For all enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com).

