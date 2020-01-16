# adaptable

Repository for AdapTable - the market-leading Data Management toolkit developed by Adaptable Tools.

AdapTable (previously known as the Adaptable Blotter) is a powerful HTML5 DataGrid add-on that integrates with the leading datagrid components and provides all the additional, rich functionality that financial and other advanced users expect from their DataGrids and Data Tables.

It offers - out of the box - incredibly powerful searching, filtering, sorting, styling and editing functionality. It also provides unparalleled validation and audit functions, vital in the current regulatory and compliance environment. 

AdapTable supports a number of underlying vendor grid components, and new vendor grids are being added all the time.  Please contact us if you would like us to implement your favourite HTML5 grid control.

AdapTable is fully data agnostic and can work with any data set you provide it with. It is suitable for all data, all asset classes, all grid types, all locations and all use cases.

[Try out AdapTable for yourself](https://demo.adaptableblotter.com).

## Upgrade Guide

Version 6 of AdapTable has introduced many new functionality and upgrades and also some new, exciting, ways of interacting with the product.  

For more information please see the [Version 6 Upgrade Guide](../../packages/adaptable/upgrade-guide.md)

## Using AdapTable

AdapTable comes in 3 variants:
 
  * 'core' (vanilla) javascript version
  
  To use this install **`@adaptabletools/adaptable`** - for more info, see the [core readme docs](./packages/adaptable/README.md)
  
  * React Wrapper
  
  To use this install **`@adaptabletools/adaptable-react-aggrid`** - for more info, see the [react version readme docs](./packages/adaptable-react-aggrid/README.md)
  
  * Angular Wrapper
  
  To use this, install **`@adaptabletools/adaptable-angular-aggrid`** - for more info, see the [Angular readme docs](./packages/adaptable-ng-aggrid/README.md)

AdapTable (all versions) also depends on AgGrid - more exactly on `@ag-grid-community/all-modules` (as a peer dependency), so please make sure you install it.

## Installing AdapTable

AdapTable is distributed via a [private npm registry - https://registry.adaptabletools.com](https://registry.adaptabletools.com).

#### Note
To gain access to this private registry please email the [Adaptable Tools Support Team](mailto:support@adaptabletools.com) who can advise you on how to get a commercial license.

If you have previously received credentials from the Adaptable Tools Support Team, then to install AdapTable, please follow these steps:

1. Point your npm client to the correct registry for packages under the '@adaptabletools' scope.

```sh
npm config set @adaptabletools:registry https://registry.adaptabletools.com

```
If you are using yarn then it will be:
```sh
yarn config set @adaptabletools:registry https://registry.adaptabletools.com
```

2. Login to the Adaptable private registry:

```sh
npm login --registry=https://registry.adaptabletools.com --scope=@adaptabletools
```

3. Enter your credentials that was provided to you by the AdapTable support team:

  * login name
  * email
  * password

4. Confirm that you were logged in correctly by using whoami:

```
npm whoami --registry=https://registry.adaptabletools.com
```

This should display the username you received from use as the current login on the private registry

**note: this does not affect your username/login session on the public npm registry**

5.  Install the relevant AdapTable package you need, e.g.

```
npm install @adaptabletools/adaptable
```

## Plugins
AdapTable now includes plugins to reduce the download size of the 'core' project and to allow you to select only the functionality you want.  

There are currently two plugins:

- **Charts** (`@adaptabletools/adaptable-charts-finance`): courtesy of Infragistics - provides Category, Pie, Doughnut, Sparkline and Financial charts.  

- **Finance** (`@adaptabletools/adaptable-plugin-finance`): adds additional functionality of benefit only to advanced financial users.


## Licences
AdapTable is a commercial product and requires a purchased licence for use.

An AdapTable licence includes regular updates and full support.

If you wish to evaluate AdapTable before purchase, please contact us requesting a Trial Licence.

Licences are sold to end-users typically in 'bands' so the price per user falls as volumne increases. There is also a Universal option which gives unlimited usage to unlimited users.

Please contact [`sales@adaptabletools.com`](mailto:sales@adaptabletools.com) for more information.

## Demo

To see AdapTable in action visit our [Demo Site](https://demo.adaptableblotter.com) where you can see AdapTable running againt a number of different dummy data sets using various underlying DataGrids.

## Help

Further information about AdapTable is available at our [Website](www.adaptabletools.com) and our [Help Site](https://adaptabletools.zendesk.com/hc/en-us)

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptableblotter.com) 

For all enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com).

## Support

For all support enquiries please email the [Adaptable Tools Support Team](mailto:support@adaptabletools.com).

[![Build Status](https://travis-ci.org/JonnyAdaptableTools/adaptableblotter.svg?branch=master)](https://travis-ci.org/JonnyAdaptableTools/adaptableblotter)
