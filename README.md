# adaptable

Repository for AdapTable - the market-leading Data Management toolkit developed by Adaptable Tools.

AdapTable (previously known as the Adaptable Blotter) is a powerful HTML5 DataGrid add-on that integrates with the leading datagrid components and provides all the additional, rich functionality that financial and other advanced users expect from their DataGrids and Data Tables.

It offers - out of the box - incredibly powerful searching, filtering, sorting, styling and editing functionality. It also provides unparalleled validation and audit functions, vital in the current regulatory and compliance environment. 

AdapTable supports a number of underlying vendor grid components, and new vendor grids are being added all the time.  Please contact us if you would like us to implement your favourite HTML5 grid control.

AdapTable is fully data agnostic and can work with any data set you provide it with. It is suitable for all data, all asset classes, all grid types, all locations and all use cases.

[Try out AdapTable for yourself](https://demo.adaptableblotter.com).

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

3. Enter your credentions:

  * your login name - use the login that was provided to you by the support team.
  * your email - use the address that you were given by the support team.
  * your password - use the unique alpanumeric password that you were given by the support team.

4. Confirm that you were logged in correctly by using whoami:

```
npm whoami --registry=https://registry.adaptabletools.com
```

This should display the username you received from use as the current login on the private registry

#### Note

This does not affect your username/login session on the public npm registry.

You can now install AdapTable with the npm command:

```
npm install @adaptabletools/adaptable
```

## Using the AdapTable

AdapTable comes in 3 variants:
 
  * 'core' - vanilla javascript version - for using this, install **`@adaptabletools/adaptable`** - for more info, see the [core readme docs](./packages/adaptable/README.md)
  * React version - for using this, install **`@adaptabletools/adaptable-react-aggrid`** - for more info, see the [react version readme docs](./packages/adaptable-react-aggrid/README.md)
  * Angular version - for using this, install **`@adaptabletools/adaptable-angular-aggrid`** - for more info, see the [Angular readme docs](./packages/adaptable-ng-aggrid/README.md)

AdapTable (all versions) also depends on AgGrid - more exactly on `@ag-grid-community/all-modules` (as a peer dependency), so please make sure you install it.

## Plug-Ins

In order to reduce download size and ensure that you only use the components and functionality you require, AdapTable now offers Plug-Ins.

The standard 'core' package that contains everything that most users will ever need.  

However Plug-Ins offer additional sector-specific, or advanced functionality.

These include:

- Finance Plug-In (for Financial Services users) - **`@adaptabletools/adaptable-plugin-finance`**
- Charting Plug-In (a wide range of chart types that leverage Infragistics React charts)  - **`@adaptabletools/adaptable-charts-finance`**


## Upgrade guide

For upgrading from v5 to v6 see the [upgrade-guide.md](./packages/adaptable/upgrade-guide.md)

## Licences

AdapTable is a commercial product and requires a purchased licence for use.

The AdapTable licence covers both Adaptable.NET (WinForms / WPF) and Adaptable (JavaScript) versions, and offers regular updates and full support.

If you wish to evaluate AdapTable before purchase, please contact us requesting a Trial Licence.

Licences are sold to end-users typically in 'bands' so the price per user falls as volumne increases. There is also a Universal option which gives unlimited usage to unlimited users.

Note: AdapTable licences do not include the licence for the underlying grid - if you use a vendor grid that requires a commerical licence, you must purchase that separately.

Please contact the [Adaptable Tools Sales Team](mailto:sales@adaptabletools.com) for more information.

## Help

The [Adaptable Help Site](https://adaptabletools.zendesk.com/hc/en-us) contains lots of useful material including User, Admin and Getting Started Guides, FAQs, Videos and Code Examples.

Full, comprehensive, developer documentation is available at [AdapTable Developer Documentation](https://api.adaptableblotter.com/index.html)

## Further Information

Find out more about AdapTable and the FinTech Adaptable Tools at the [Adaptable Tools Website](http://www.adaptabletools.com).

And you can try out AdapTable for yourself at [Adaptable Demos](https://demo.adaptableblotter.com).

## Support

For all support enquiries please email the [Adaptable Tools Support Team](mailto:support@adaptabletools.com).

[![Build Status](https://travis-ci.org/JonnyAdaptableTools/adaptableblotter.svg?branch=master)](https://travis-ci.org/JonnyAdaptableTools/adaptableblotter)
