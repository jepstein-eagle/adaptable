# adaptable-angular-aggrid

Repository for the **AdapTable Angular ag-Grid Wrapper** which allows you to install, instantiate and reference AdapTable (using ag-Grid) in an "Angular-friendly" manner.

## Upgrade Guide

Version 6 of AdapTable has introduced many new functionality and upgrades and also some new, exciting, ways of interacting with the product.  

For more information please see the [Version 6 Upgrade Guide](../../packages/adaptable/readme/upgrade-guides/upgrade-guide-v6.md)

## Installation

The Angular wrapper of AdapTable is distributed via the private npm registry [https://registry.adaptabletools.com](https://registry.adaptabletools.com).

To gain access to this registry please follow these steps:

1. Acquire a commercial AdapTable License - you can email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) who will provide you with your unique credentials.


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

    This should display the username you received as the current login on the private registry

    > this does not affect your username/login session on the public npm registry

6. Install the AdapTable Angular Wrapper

    ```npm i @adaptabletools/adaptable-angular-aggrid```

    > you do not need to install the core AdapTable package also

7. Make sure that all the Peer Dependencies are installed. These are currently:

    ```
    "peerDependencies": {
        "@ag-grid-community/all-modules": "^22.1.1",
        "@ag-grid-community/angular": "^22.1.1",
        "mathjs": "^5.1.1",
        "@angular/common": ">=7.0.0",
        "@angular/core": ">=7.0.0",
    }
    ```
    > you must install *@ag-grid-community/all-modules* and *@ag-grid-community/angular* packages

## Plugins
AdapTable now includes plugins to reduce the download size of the 'core' project and to allow you to select only the functionality you want.  

There are currently 3 plugins:

- **Charts** (`@adaptabletools/adaptable-charts-finance`)

  > courtesy of Infragistics - provides Category, Pie, Doughnut, Sparkline and Financial charts.  

- **Finance** (`@adaptabletools/adaptable-plugin-finance`)

  > adds additional functionality of benefit only to advanced financial users.

- **NoCode** (`@adaptabletools/adaptable-plugin-nocode-aggrid`)

  > enables the creation of dynamic AdapTable instances by dragging and droppping JSON or Excel files.

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

3. Add them to the **modules** prop of the Adaptable Angular Component:

    ```
    @Component({
      selector: 'adaptable-root',
      template: `
        <adaptable-angular-aggrid
          style="width: 100vw; height: 100vh;"
          [adaptableOptions]="adaptableOptions"
          [gridOptions]="gridOptions"
          [modules]="agGridModules"
        >
        </adaptable-angular-aggrid>
      `
    })

    export class AppComponent {
      public gridApi: GridApi;
      public agGridModules: Module[] = [MenuModule, RangeSelectionModule];
      ....
    }

    ```

## Angular Attributes

### Mandatory

- **gridOptions**

  The standard ag-Grid *GridOptions* object used for building column schema and setting key grid properties.

  > Unlike in the 'vanilla' version, you do not need to set the `modules` property of *GridOptions* as you will provide this through the `modules` prop

- **adaptableOptions**

  The *AdaptableOptions* object that contains all the settings and options required for managing AdapTable. 
  See [Developer Documentation](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_adaptableoptions_.adaptableoptions.html) for more details.

  > Do not set the `vendorGrid` property of *AdaptableOptions* as this has been provided in the *gridOptions* prop.


### Optional

- **onAdaptableReady: (adaptableApi: AdaptableApi, vendorGrid: GridOptions)** 

  An Adaptable event giving you access to the *AdaptableApi* object.  
  The api contains hundreds of methods providing full, safe, runtime access to all the functionality in AdapTable.  
  Also gives access to the underlying ag-Grid instance object. 
  See [Developer Documentation](https://api.adaptabletools.com/interfaces/_src_api_adaptableapi_.adaptableapi.html) for more details.

- **modules** Any ag-Grid Enterprise modules that you wish to include (see above)


## Usage

In your app module, import AdaptableAngularAgGridModule module

```
import { AdaptableAngularAgGridModule } from '@adaptabletools/adaptable-angular-aggrid';
```

After that, you can use the ecomponent in your app

```html
<adaptable-angular-aggrid
  style="height: 100vh"
  [adaptableOptions]="..."
  [gridOptions]="..."
  [onAdaptableReady]="..."
  [modules]="..."
>
</adaptable-angular-aggrid>
```

## Styling and Theming

AdapTable provides 2 default themes ('Light' and 'Dark') but you can easily create your own custom themes (by using [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)).

> You **always** have to import the `index.css` file.  This contains the structural styles AdapTable requires and, also, the (default) Light theme:

```tsx
import "@adaptabletools/adaptable-angular-aggrid/index.css"
```

If you want to use the Dark theme, you will need, also, to import:

```tsx
import "@adaptabletools/adaptable-angular-aggrid/index.css" // always needed
import "@adaptabletools/adaptable-angular-aggrid/themes/dark.css"
```

To find out how to your write your custom themes, provide custom icons - and about AdapTable styling generally - please read the [Adaptable Theming and Styling Guide](../../packages/adaptable/readme/guides/adaptable-theming-guide.md)

## Adaptable State

AdapTable will manage the persistence of all Adaptable (ie. User) State.  This takes 2 forms:  

- **Predefined Config** - State created at design-time and given to AdapTable so that at first-time use of the application, the user has everything he or she needs to get started.

- **State Management** - Ensuring that all changes made by the user at run-time are saved and persisted to an appropriate location so they are available the next time the system runs.

For more information please read the [Adaptable State Guide](../../packages/adaptable/readme/guides/adaptable-state-guide.md)

## Demo

For a standalone working example app of the Angular Wrapper, see the [Angular Demo](https://github.com/AdaptableTools/example-adaptable-angular-aggrid)

To see AdapTable, more generally, in action visit our [Demo Site](https://demo.adaptabletools.com).  Here you can see a large number of AdapTable demos each showing a different feature, function or option in AdapTable (using dummy data sets).


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
