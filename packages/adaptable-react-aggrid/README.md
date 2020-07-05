# adaptable-react-aggrid

Repository for the **AdapTable React ag-Grid Wrapper** which allows you to install, instantiate and reference AdapTable (using ag-Grid) in a "React-friendly" manner.

## Upgrade Guide

Version 7 of AdapTable has introduced many new functionality and upgrades and also some new, exciting, ways of interacting with the product.  

For more information please see the [Version 7 Upgrade Guide](../../packages/adaptable/readme/upgrade-guides/upgrade-guide-v7.md)

## Installation

The React wrapper of AdapTable is distributed via the private npm registry [https://registry.adaptabletools.com](https://registry.adaptabletools.com).

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

4. Enter your credentials that was provided to you by the AdapTable support team:

  * login name
  * email
  * password
  
5. Check you are logged-in correctly by using whoami:

  ```
  npm whoami --registry=https://registry.adaptabletools.com
  ```

  This should display the username you received as the current login on the private registry

  **note: this does not affect your username/login session on the public npm registry**

6. Install the AdapTable React Wrapper

  ```npm i @adaptabletools/adaptable-react-aggrid```

  **note: you do not need to install the core AdapTable package also**

7. Make sure that all the Peer Dependencies are installed. These are currently:

  ```
  "peerDependencies": {
      "@ag-grid-community/all-modules": "^23.2.1",
      "@ag-grid-community/react": "^23.2.1",
      "react": "=>16.8.6",
      "react-dom": ">=16.8.6",
  }
  ```
  **note: you must  install *@ag-grid-community/all-modules* and *@ag-grid-community/react* packages**

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

  ```
  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    adaptableId: 'react demo',
    ....
    plugins: [charts()]
  };

  ```

## agGrid Enterprise Modules
AdapTable uses ag-Grid v.23.  In Version 22 ag-Grid introduced [modularization](https://www.ag-grid.com/javascript-grid-modules/), giving users more control over which functionality they want to use.  AdapTable fully supports this new way of working.

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

3. Add them to the **modules** prop of the AgGridReact Component:

  ```
   <AgGridReact
     gridOptions={gridOptions}
     modules={[...RangeSelectionModule, MenuModule, ClientSideRowModelModule]}
   />
  ```
  
## Components

[Version 7](../../packages/adaptable/readme/upgrade-guides/upgrade-guide-v7.md) of the AdapTable React Wrapper introduces a big change.  You now need to provide 2 components:

- **AgGridReact** This is the ag-Grid React component.  You should pass as props the GridOptions objects and any Modules (see above)

- **AdaptableReact** This is the AdapTable React component. See below for a list of the props required.


## AdaptableReact Props

### Mandatory:

- **gridOptions**: 

  The standard ag-Grid *GridOptions* object used for building column schema and setting key grid properties.
  
  **This must be the same ag-Grid *GridOptions* object that you pass into the AgGridReact component**

  > Unlike in the 'vanilla' version, you do not need to set the `modules` property of *GridOptions* as you will provide this through the `modules` prop of the AgGridReact component.

- **adaptableOptions**: 

  The *AdaptableOptions* object that contains all the settings and options required for managing AdapTable. 
See [Developer Documentation](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_adaptableoptions_.adaptableoptions.html) for more details.

  > Do not set the `vendorGrid` property of *AdaptableOptions* as this has been provided in the *gridOptions* prop.


### Optional:

- **onAdaptableReady: ({ adaptableApi: AdaptableApi, vendorGrid: GridOptions })** 

  An event that fires as soon as AdapTable is ready - the callback function is called with an object with `{adaptableApi, vendorGrid}` which provides access to 2 important objects:
  1. The *AdaptableApi* object. The api contains hundreds of methods providing full, safe, runtime access to all the functionality in AdapTable. (See [Developer Documentation](https://api.adaptabletools.com/interfaces/_src_api_adaptableapi_.adaptableapi.html) for more details.)

  2. The underlying VendorGrid instance being used - in this case GridOptions. This is because AdapTable enriches the 'gridOptions' it receives with modules and other properties, so if you want access to the underlying grid then you should use this object.

- **render|children: ({ grid, adaptable}) => ReactNode**  

  Can specify a custom render function that is called with the rendered grid and adaptable, and can be used to change the layout of the component, and render additional elements or change adaptable/grid order

- **modules** 

  Any ag-Grid Enterprise modules that you wish to include (see above)

## Styling and Theming

AdapTable provides 2 default themes ('Light' and 'Dark') but you can easily create your own custom themes (by using [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)).

You **always** have to import the `index.css` file.  This contains the structural styles AdapTable requires and, also, the (default) Light theme:

```tsx
import "@adaptabletools/adaptable-react-aggrid/index.css"
```

If you want to use the Dark theme, you will need, also, to import:

```tsx
import "@adaptabletools/adaptable-react-aggrid/index.css" // always needed
import "@adaptabletools/adaptable-react-aggrid/themes/dark.css"
```

To find out how to your write your custom themes, provide custom icons - and about AdapTable styling generally - please read the [Adaptable Theming and Styling Guide](../../packages/adaptable/readme/guides/adaptable-theming-guide.md)

## Adaptable State

AdapTable will manage the persistence of all Adaptable (ie. User) State.  This takes 2 forms:  

- **Predefined Config** - State created at design-time and given to AdapTable so that at first-time use of the application, the user has everything he or she needs to get started.

- **State Management** - Ensuring that all changes made by the user at run-time are saved and persisted to an appropriate location so they are available the next time the system runs.

For more information please read the [Adaptable State Guide](../../packages/adaptable/readme/guides/adaptable-state-guide.md)

## Demo

For a standalone working example app of the React Wrapper, see the [React Demo](https://github.com/AdaptableTools/example-adaptable-react-aggrid)

To see AdapTable, more generally, in action visit our [Demo Site](https://demo.adaptabletools.com).  Here you can see a large number of AdapTable demos each showing a different feature, function or option in AdapTable (using dummy data sets).

## Basic Example

```jsx

import AdaptableReact from '@adaptabletools/adaptable-react-aggrid';

import '@adaptabletools/adaptable-react-aggrid/index.css'; // this also includes the light theme
import '@adaptabletools/adaptable-react-aggrid/themes/dark.css'

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import "@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-alpine-dark.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css";

// import any AdapTable plugins you require
import charts from '@adaptable/adaptable-plugins-charts'

// import any ag-grid enterprise modules you want to use
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { MenuModule } from '@ag-grid-enterprise/menu';

// create the Adaptable Options object
const adaptableOptions: AdaptableOptions = {
  primaryKey: 'tradeId',
  userName: 'demo user',
  adaptableId: 'react demo',
  plugins: [charts()] // adaptable plugins
};

// Instantiate BOTH the AdaptableReact and the AgGridReact Components
const App: React.FC = () => (
  <div style={{ display: "flex", flexFlow: "column", height: "100vh" }}>
    <AdaptableReact
      style={{ flex: "none" }}
      gridOptions={gridOptions}
      adaptableOptions={adaptableOptions}
      onAdaptableReady={({ adaptableApi }) => {
        console.log("ready!!!!");
        adaptableApi.eventApi.on("SelectionChanged", (args) => {
          console.warn(args);
        });
      }}
    />
    <div className="ag-theme-alpine" style={{ flex: 1 }}>
      <AgGridReact
        gridOptions={gridOptions}
        modules={[...RangeSelectionModule, MenuModule, ClientSideRowModelModule]}
      />
    </div>
  </div>
);

```

## Licences
A licence for AdapTable provides access to all product features as well as quarterly updates and enhancements through the lifetime of the licence, comprehensive support, and access to all 3rd party libraries.

Licences can be purchased individually, for a team (minimum 30 end-users), for an organisation or for integration into software for onward sale.

We can make a trial licence available for a short period of time to allow you to try out AdapTable for yourself.

**Note: The AdapTable licence does not include the underlying grid's licence, so if you plan to use AdapTable with a Grid that requires a commercial licence, you must pay for that separately**.

Please contact [`sales@adaptabletools.com`](mailto:sales@adaptabletools.com) for more information.

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us/articles/360007083017-Help-) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
