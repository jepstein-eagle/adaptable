# adaptable (core)

Repository for the 'Core' AdapTable package - developed by Adaptable Tools.

There are also [React](../../packages/adaptable-react-aggrid/README.md)
and [Angular](../../packages/adaptable-ng-aggrid/README.md) Wrappers available for those who wish to access AdapTable (when running with ag-Grid) using their preferred Framework.

## Upgrade Guide

Version 7 of AdapTable has introduced many new functionality and upgrades and also some new, exciting, ways of interacting with the product.  

For more information please see the [Version 7 Upgrade Guide](../../packages/adaptable/readme/upgrade-guides/upgrade-guide-v7.md)

## Installation

AdapTable is distributed via the private npm registry [https://registry.adaptabletools.com](https://registry.adaptabletools.com).

To gain access to this registry please follow these steps:

1. Acquire a commercial AdapTable License - you can email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) who will provide you with your unique credentials.

2. Point your npm client to the correct registry for packages under the `@adaptabletools` scope

    ```npm config set @adaptabletools:registry https://registry.adaptabletools.com```

    if you're using yarn

    ```yarn config set @adaptabletools:registry https://registry.adaptabletools.com```

3. Login to the AdapTable private registry:

    ```sh
    npm login --registry=https://registry.adaptabletools.com --scope=@adaptabletools
    ```

4. Enter the credentials that were provided to you by the AdapTable support team:

    * login name
    * email
    * password
  
5. Check you are logged-in correctly by using whoami:

    ```
    npm whoami --registry=https://registry.adaptabletools.com
    ```

    This should display the username you received as the current login on the private registry

    **note: this does not affect your username/login session on the public npm registry**

6. Install AdapTable

    ```npm i @adaptabletools/adaptable```

7. Make sure that all the Peer Dependencies are installed. These is currently just **@ag-grid-community/all-modules**:

    ```
    "peerDependencies": {
        "@ag-grid-community/all-modules": "^22.1.1",
    }
    ```
    
## Plugins
AdapTable now includes plugins to reduce the download size of the 'core' project and to allow you to select only the functionality you want.  

There are currently 8 plugins:

- **Charts** (`@adaptabletools/adaptable-charts-finance`)

  > courtesy of Infragistics - provides Category, Pie, Doughnut, Sparkline and Financial charts.  

- **Finance** (`@adaptabletools/adaptable-plugin-finance`)

  > adds additional functionality of benefit only to advanced financial users.

- **NoCode** (`@adaptabletools/adaptable-plugin-nocode-aggrid`)

  > enables the creation of dynamic AdapTable instances by dragging and droppping JSON or Excel files.
  
- **Master Detail** (`@adaptabletools/adaptable-master-detail-aggrid`)

  > Supports Master / Detail grids in ag-Grid by ensuring that the Master and all Detail grids are AdapTable instances with full access to all the rich functionality on offer.
    
- **ipushpull** (`@adaptabletools/adaptable-plugin-ipushpull`)

  > Designed for [ipushpull](https://www.ipushpull.com) users, enabling advanced collaboration scenarios.
    
- **OpenFin** (`@adaptabletools/adaptable-plugin-openfin`)

  > Designed for when AdapTable will be used inside the [OpenFin](https://openfin.co/) container.
    
- **Glue42** (`@adaptabletools/adaptable-plugin-glue42`)

  > Designed for when AdapTable will be used on a desktop also running [Glue42](https://glue42.com/).
    
- **Finsemble** (`@adaptabletools/adaptable-plugin-finsemble`)

  > Designed for when AdapTable is running alongside [Finsemble](https://www.chartiq.com/finsemble/). 

#### Plugins Example
To add a plugin you need to do the following 3 steps (using the `charts` plugin as an example):

1. Install the plugin as a separate package:

    ```npm i @adaptabletools/adaptable-plugin-charts```

2. Import it into your code:

    ```import charts from '@adaptable/adaptable-plugins-charts'```

3. Add it to the `plugins` property of *AdaptableOptions*:

    ```tsx
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

    ```tsx
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

To find out how to your write your custom themes, provide custom icons - and about AdapTable styling generally - please read the [Adaptable Theming and Styling Guide](../../packages/adaptable/readme/guides/adaptable-theming-guide.md)


### Overlay alignment

By default, overlays (lists in dropdown buttons, tooltips) are aligned using a best guess algorithm, but you can modify the horizontal alignment of the overlay by specifying the CSS `--ab-overlay-horizontal-align` either on the overlay target or on one of its parents. Possible values for `--ab-overlay-horizontal-align` are `'left' | 'right' | 'center'`

## HTML Rendering

The core version of AdapTable expects you to create in your HTML 2 `Div`s:

- one for AdapTable (with the id of 'adaptable') 

- one for the underlying grid (with the id of 'grid').

So your HTML should look like this: 
  
```html

<body>
  ......
  <div id="adaptable"></div>
  <div id="grid"></div>
  .....
</body>

```
## Adaptable State

AdapTable will manage the persistence of all Adaptable (ie. User) State.  This takes 2 forms:  

- **Predefined Config** - State created at design-time and given to AdapTable so that at first-time use of the application, the user has everything he or she needs to get started.

- **State Management** - Ensuring that all changes made by the user at run-time are saved and persisted to an appropriate location so they are available the next time the system runs.

For more information please read the [Adaptable State Guide](../../packages/adaptable/readme/guides/adaptable-state-guide.md)

## Instantiation

You create an instance of AdapTable by providing the aysnc static constructor with an [AdaptableOptions](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_adaptableoptions_.adaptableoptions.html) object.

The constructor will return a Promise containning an [Adaptable Api](https://api.adaptabletools.com/interfaces/_src_api_adaptableapi_.adaptableapi) object that you can use to access all features of AdapTable at runtime:

```ts
const api: AdaptableApi = await Adaptable.init(adaptableOptions)
```


## Basic Example

```html
<body>
  ......
  <div id="adaptable"></div>
  <div id="grid" className="ag-theme-balham"></div>
  .....
</body>
```

```tsx

// import Adaptable
import Adaptable from "@adaptabletools/adaptable/agGrid";

// import the Adaptable types
import { AdaptableOptions, AdaptableApi } from "@adaptabletools/adaptable/types";

// import Plugins
import charts from "@adaptabletools/adaptable-plugin-charts";
import finance from "@adaptabletools/adaptable-plugin-finance";

// import any Enterprise ag-Grid modules needed
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';

// import AdapTable styles
import '@adaptabletools/adaptable/index.css'; // includes the light theme, which is the default
import '@adaptabletools/adaptable/themes/dark.css'; // if you want to use the dark theme

// import ag-Grid styles
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

// Create an underlying vendor Grid instance 
// in this example we are using ag-Grid which has a GridOptions object
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
 // Set the vendorGrid property to our gridOptions object and attach any Enterprise modules to modules property
 // Also attach any Predefined Config we need for when AdapTable first starts up
 const adaptableOptions: AdaptableOptions = {
    primaryKey: 'orderId',
    userName: 'Demo User',
    adaptableId: 'readmeDemo',
    vendorGrid: {
      ...gridOptions,
      modules: [MenuModule, RangeSelectionModule],
     },
    predefinedConfig: demoConfig,
  };

  // Instantiate AdapTable with AdaptableOptions and recieve an AdaptableApi object (via a Promise) for later use
  const adaptableApi: AdaptableApi = await Adaptable.init(adaptableOptions);
  
  // We can now use the Api to manage AdapTable and listen to Adaptable events, e.g.
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

To see AdapTable in action visit our [Demo Site](https://demo.adaptabletools.com).  Here you can see a large number of AdapTable demos each showing a different feature, function or option in AdapTable (using dummy data sets).

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us/articles/360007083017-Help-) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 
 
## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).

