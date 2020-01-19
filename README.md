# adaptable

Repository for AdapTable - the market-leading Data Management toolkit developed by [Adaptable Tools](www.adaptabletools.com).

AdapTable (previously known as the Adaptable Blotter) is a powerful HTML5 DataGrid add-on that integrates with the leading  components and provides all the additional, rich functionality that financial and other advanced users expect from their DataGrids and Data Tables.

AdapTable offers - out of the box - incredibly powerful searching, filtering, sorting, styling and editing functionality. It also provides unparalleled validation and audit functions, vital in the current regulatory and compliance environment. 

AdapTable supports a number of underlying vendor grid components, and new vendor grids are being added all the time.  Please contact us if you would like us to implement your favourite HTML5 grid control.

AdapTable is fully data agnostic and can work with any data set you provide it with. It is suitable for all data, all asset classes, all grid types, all locations and all use cases.


![AdapTable image](./images/adaptable.png)

## Upgrade Guide

Version 6 of AdapTable has introduced many new functionality changes and upgrades and also some new, exciting, ways of interacting with the product.  

For more information please see the [Version 6 Upgrade Guide](./packages/adaptable/upgrade-guide.md)

## Using AdapTable

AdapTable comes in 3 variants:
 
  * 'core' (vanilla) javascript version
  
  To use this install **`@adaptabletools/adaptable`** 
  
  > For more info, see the [Adaptable Core 'readme;](./packages/adaptable/README.md)
  
  * React Wrapper
  
  To use this install **`@adaptabletools/adaptable-react-aggrid`**
  
  > For more info, see the [React Wrapper 'readme'](./packages/adaptable-react-aggrid/README.md)
  
  * Angular Wrapper
  
  To use this, install **`@adaptabletools/adaptable-angular-aggrid`**
  
  > For more info, see the [Angular Wrapper Wrapper 'readme'](./packages/adaptable-ng-aggrid/README.md)
  
  Each of these packages has its own initialisation requirements so please read the appropriate documentation

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

5.  Install the relevant AdapTable package you need.

For core it will be:

```
npm i @adaptabletools/adaptable
```

and for the ag-Grid React Wrapper it will be:

```
npm i @adaptabletools/adaptable-react-aggrid
```

and for the ag-Grid Angular Wrapper it will be:

```
npm i @adaptabletools/adaptable-angular-aggrid
```

## Plugins
AdapTable now includes plugins to reduce the download size of the 'core' project and to allow you to select only the functionality you want.  

There are currently two plugins:

- **Charts** (`@adaptabletools/adaptable-charts-finance`)

> Courtesy of [Infragistics](https://www.infragistics.com/products/ignite-ui-react) - provides Category, Pie, Doughnut, Sparkline and Financial charts.  

- **Finance** (`@adaptabletools/adaptable-plugin-finance`)

> Adds additional functionality of benefit only to advanced financial users.


## Licences
A licence for AdapTable provides access to all product features as well as quarterly updates and enhancements through the lifetime of the licence, comprehensive support, and access to all 3rd party libraries.

Licences can be purchased individually, for a team (minimum 30 end-users), for an organisation or for integration into software for onward sale.

We can make a trial licence available for a short period of time to allow you to try out AdapTable for yourself.

Please contact [`sales@adaptabletools.com`](mailto:sales@adaptabletools.com) for more information.

## Demo

To see AdapTable in action visit our [Demo Site](https://demo.adaptableblotter.com).  Here you can see a large number of AdapTable demos each showing a different feature, function or option in AdapTable (using dummy data sets).

 ## Example Projects

We have added a few example projects to Github to help you to understand how to use AdapTable.

These include:
* [Angular Wrapper Example](https://github.com/AdaptableTools/example-adaptable-angular-aggrid)
 
* [React Wrapper Example](https://github.com/AdaptableTools/example-adaptable-angular-aggrid)
  
* [Parcel JS (quick build) Example](https://github.com/AdaptableTools/example-adaptable-with-parceljs)
   
* [iPushpPull Example](https://github.com/AdaptableTools/example-adaptable-ipushpull-integration)
 
 
## Help

Further information about AdapTable is available at our [Website](www.adaptabletools.com) and our [Help Site](https://adaptabletools.zendesk.com/hc/en-us)

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptableblotter.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com).
