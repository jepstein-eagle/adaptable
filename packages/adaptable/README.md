# adaptable

Repository for the 'Core' AdapTable package - developed by Adaptable Tools.

AdapTable is a powerful DataGrid add-on that integrates with the leading datagrid components and provides all the additional, rich functionality that financial and other advanced users expect from their DataGrids and Data Tables.

It offers - out of the box - incredibly powerful searching, filtering, sorting, styling and editing functionality. It also provides unparalleled validation and audit functions, vital in the current regulatory and compliance environment. Try it out for yourself at https://demo.adaptableblotter.com.

Grid components supported include:

- ag-Grid by ag-Grid
- Hypergrid by OpenFin
- Kendo Grid by Telerik
- Adaptable Grid by Adaptable Tools.

More grid components are being added all the time so contact us if you would like us to implement your favourite HTML5 grid control.

AdapTable is fully data agnostic and can work with any data set you provide it with. It is suitable for all data, all asset classes, all grid types, all locations and all use cases.

There are additional React and Angular wrappers - please see the relevant packages.

## Upgrade guide

For upgrading from v5 to v6 see the [upgrade-guide.md](./upgrade-guide.md)

## Installation

AdapTable is distributed via a private NPM registry - `https://registry.adaptabletools.com`, so getting it installed requires the following steps:

1. get a commercial license - you can email [`support@adaptabletools.com`](mailto:support@adaptabletools.com), so we'll provide you with a username.

2. point your npm client to the correct registry for packages under the `@adaptabletools` scope

```npm config set @adaptabletools:registry https://registry.adaptabletools.com```

if you're using yarn

```yarn config set @adaptabletools:registry https://registry.adaptabletools.com```


3. login with your username for the `@adaptabletools` scope, on the private registry

```npm login --registry=https://registry.adaptabletools.com --scope=@adaptabletools```

4. check you are logged-in correctly via

```npm whoami --registry=https://registry.adaptabletools.com```

it should display the username you received from use as the current login on the private registry. NOTE: this does not affect your username/login session on the public npm registry.

5. install AdapTable

```npm i @adaptabletools/adaptable```

for the React wrapper, use

```npm i @adaptabletools/adaptable-react-aggrid```

for the Angular wrapper, use

```npm i @adaptabletools/adaptable-angular-aggrid```

## Styling and Theming

AdapTable provides 2 default themes ('Light' and 'Dark') but you can easily create your own custom themes (using [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)).

In order for AdapTable to look right, you **always** have to import the `index.css` file which contains the structural styles and, also, the (default) Light theme:

```tsx
import "@adaptabletools/adaptable/index.css"
```

If you want to use the Dark theme, you will need, also, to import:

```tsx
import "@adaptabletools/adaptable/index.css" // always needed
import "@adaptabletools/adaptable/themes/dark.css"
```

To find out how to your write your custom themes, provide custom icons - and about AdapTable styling generally - please read the [Adaptable Theming and Styling Guide](../../packages/adaptable/adaptable-theming-guide.md)



## Licences

AdapTable is a commercial product and requires a purchased licence for use.

An AdapTable licence includes regular updates and full support.

If you wish to evaluate AdapTable before purchase, please contact us requesting a Trial Licence.

Licences are sold to end-users typically in 'bands' so the price per user falls as volumne increases. There is also a Universal option which gives unlimited usage to unlimited users.

Note: AdapTable licences do not include the licence for the underlying grid - if you use a vendor grid that requires a commerical licence, you must purchase that separately.

Please contact [`sales@adaptabletools.com`](mailto:sales@adaptabletools.com) for more information.

## Usage

```js
import Adaptable from '@adaptabletools/adaptable/agGrid';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';

import '@adaptabletools/adaptable/index.css'; // includes the light theme, which is the default
import '@adaptabletools/adaptable/themes/dark.css'; // if you want to use the dark theme
```

## Demo

To see AdapTable in action visit https://demo.adaptableblotter.com where you can see Adaptable running againt a number of different dummy data sets using various underlying DataGrids.

## Help

Further information about Adaptable is available at www.adaptabletools.com. And there is detailed Help at https://adaptabletools.zendesk.com/hc/en-us.

Developers can see how to access Adaptable programmatically at https://api.adaptableblotter.com

For all enquiries please email Adaptable Tools Support Team at support@adaptabletools.com.

[![Build Status](https://travis-ci.org/JonnyAdaptableTools/adaptableblotter.svg?branch=master)](https://travis-ci.org/JonnyAdaptableTools/adaptableblotter)
