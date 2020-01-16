# Adaptable React ag-Grid

Repository for the AdapTable React ag-Grid Wrapper (adaptable-react-aggrid)

The React Wrapper allows you to install, instantiate and reference AdapTable using ag-Grid in a "React-friendly" manner.

## Upgrade Guide

Version 6 of AdapTable has introduced many new functionality and upgrades and also some new, exciting, ways of interacting with the product.  

For more information please see the [Version 6 Upgrade Guide](../../packages/adaptable/upgrade-guide.md)

## Installation

The React wrapper of AdapTable is distributed via a private NPM registry - `https://registry.adaptabletools.com`, so getting it installed requires the following steps:

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

6. Install the React wrapper of Adaptable

```npm i @adaptabletools/adaptable-react-aggrid```

**note: you do not need to install the core AdapTable package also**

7. Make sure that all the Peer Dependencies are installed. These are currently:

```
"peerDependencies": {
    "@ag-grid-community/all-modules": "^22.1.1",
    "@ag-grid-community/react": "^22.1.1",
    "mathjs": "^5.1.1",
    "react": "=>16.8.6",
    "react-dom": ">=16.8.6",
}
```
**note: you must install *@ag-grid-community/all-modules* and *@ag-grid-community/react* packages**

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
  adaptableId: 'react demo',
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

3. Add them to the **modules** prop of the AdaptableReact Component:

```
export default () => <AdaptableReactAgGrid
  ....
  modules={[SideBarModule, MenuModule, RangeSelectionModule]}
 ....
/>

```


## React Props

### Mandatory:

- **gridOptions**: 

The standard ag-Grid *GridOptions* object used for building column schema and setting key grid properties.

note: Unlike in the 'vanilla' version, you do not need to set the `modules` property of *GridOptions* as you will provide this through the `modules` prop of the component.

- **adaptableOptions**: 

The *AdaptableOptions* object that contains all the settings and options required for managing AdapTable. 
See [Developer Documentation](https://api.adaptableblotter.com/interfaces/_adaptableoptions_adaptableoptions_.adaptableoptions) for more details.

note: Do not set the `vendorGrid` property of *AdaptableOptions* as this has been provided in the *gridOptions* prop.


### Optional:

- **onAdaptableReady: (adaptableApi: AdaptableApi, vendorGrid: GridOptions)** 

An Adaptable event giving you access to the *AdaptableApi* object.  The api contains hundreds of methods providing full, safe, runtime access to all the functionality in AdapTable.  
Also gives access to the underlying ag-Grid instance object.
See [Developer Documentation](https://api.adaptableblotter.com/interfaces/_api_adaptableapi_.adaptableapi) for more details.

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

To find out how to your write your custom themes, provide custom icons - and about AdapTable styling generally - please read the [Adaptable Theming and Styling Guide](../../packages/adaptable/adaptable-theming-guide.md)

## Demo

For a standalone working example app of the React Wrapper, see the [React Demo](https://github.com/AdaptableTools/example-adaptable-react-aggrid)

To see AdapTable, more generally, in action visit our [Demo Site](https://demo.adaptableblotter.com) where you can see AdapTable running againt a number of different dummy data sets using various underlying DataGrids.

## Basic Example

```jsx

import AdaptableReact from '@adaptabletools/adaptable-react-aggrid';

import '@adaptabletools/adaptable-react-aggrid/index.css'; // this also includes the light theme
import '@adaptabletools/adaptable-react-aggrid/themes/dark.css'

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';

// import any AdapTable plugins you require
import charts from '@adaptable/adaptable-plugins-charts'

// import any ag-grid enterprise modules you want to use
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { MenuModule } from '@ag-grid-enterprise/menu';

const adaptableOptions: AdaptableOptions = {
  primaryKey: 'tradeId',
  userName: 'demo user',
  adaptableId: 'react demo',
  plugins: [charts()] // adaptable plugins
};

export default () => <AdaptableReactAgGrid
  style={{ height: '100vh' }}
  modules={[MenuModule, RangeSelectionModule]} // ag-grid modules 
  gridOptions={ ... }
  adaptableOptions={adaptableOptions}
  onAdaptableReady={(adaptableApi) => { ... }}
/>

```

## Licences
AdapTable is a commercial product and requires a purchased licence for use.

An AdapTable licence includes regular updates and full support.

If you wish to evaluate AdapTable before purchase, please contact us requesting a Trial Licence.

Licences are sold to end-users typically in 'bands' so the price per user falls as volumne increases. There is also a Universal option which gives unlimited usage to unlimited users.

Please contact [`sales@adaptabletools.com`](mailto:sales@adaptabletools.com) for more information.
 

## Help

Further information about AdapTable is available at our [Website](www.adaptabletools.com) and our [Help Site](https://adaptabletools.zendesk.com/hc/en-us)

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptableblotter.com) 

For all enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com).

[![Build Status](https://travis-ci.org/JonnyAdaptableTools/adaptableblotter.svg?branch=master)](https://travis-ci.org/JonnyAdaptableTools/adaptableblotter)
