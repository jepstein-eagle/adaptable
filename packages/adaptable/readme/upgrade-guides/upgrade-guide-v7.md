# AdapTable Version 7 Upgrade Guide

Version 7 of AdapTable will be released on Sunday 12 July.

This is a major version release (primarily to cater for changes in the new ag-Grid version) and has a number of changes that will be of interest, including:

* Support for latest ag-Grid Version (23) including Alpine theme 

* React Wrapper Changes

* Angular Wrapper Changes

* Static Constructor now asynchronous

* New Calculated Column Expression Editor and Syntax

* Queries and Shared Queries

* Merged Filters

* Layout Changes

* Column Chooser removed

* Column Category removed

* Scope - Conditional Styles

* Schedule State Changes

* Percent Bars Improvements

* Config Server Removed

* New 'Partner' plugins - ipushpull, OpenFin, Glue42 and Finsemble

* Support for Master / Detail grids

* Additional CSS Variables

> For details of the previous Version see [Version 6 Upgrade Guide](upgrade-guide-v6.md).

## Support for ag-Grid Version 23

Version 7 of AdapTable supports ag-Grid Version 23.

This contains some major changes, particularly around theming but also in other aspects as well, namely:

### Column Filters

By default, column filters looked very similar to aggrid 22 balham theme, since `filterOptions.useVendorFilterFormStyle` was default to `true`. With the transition to v23, even with `filterOptions.useVendorFilterFormStyle` set to `true`, the styles now look more modern and similar to the aggrid `alpine` theme, which aggrid recommends as default.

`filterOptions.useVendorFilterFormStyle` - custom styles are only applied to balham theme, as the alpine theme looks very similar to our default theme

We removed `userInterfaceOptions.useDefaultVendorGridThemes` as it was no longer used.

### Quick Filter

The `floatingFilter` property is deprecated in gridOptions - `gridOptions.floatingFilter` - you now have to specify it at column level (or in a default column definition).  

Consequently, AdapTable will only show the Quick Filter bar if at least one column has this set to true - and will activate it only for those columns.

### Themes

ag-Grid have introduced a new Alpine theme.  

This has neceesistated some slight changes to AdapTable theming as a result.

Make sure you specify your theme in your html, on the grid container element - it should be either `ag-theme-alpine` or `ag-theme-balham` (since they are the only themes that have a dark variant). We then detect this theme, and apply the corresponding dark theme, when it is selected from theme theme toolbar.

## React Wrapper Changes

In order to work seamlessly with agGrid 23, the React Wrapper was updated.

Here is a quick summary of the changes - for fuller information see the [React Wrapper Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable-react-aggrid/README.md):

* The `<AgGridReact>` component now needs to be rendered explicitly.  Note: although most ag-grid properties can be passed into the component via props, **you have to make sure you pass the `gridOptions` object** as a prop to the `<AgGridReact>` component

* **The same `gridOptions` object must be passed to the `<AdaptableReactAggrid>` component as well**: in this way, `<AdaptableReactAggrid>` and `<AgGridReact>` are connected to the same agGrid instance.
  
* Theming now needs to be set expliclity (and not via a prop to `<AdaptableReactAggrid>` as before).  This will typically be done by wrapping the `<AgGridReact>` component in a `div` element with the class set to that of the required ag-Grid theme (e.g. 'ag-theme-apline').

```jsx

<div
  style={{
    height: '100vh',
    display: 'flex',
    flexFlow: 'column',
  }}
>
  <AdaptableReactAggrid
    adaptableOptions={adaptableOptions}
    gridOptions={gridOptions}
    onAdaptableReady={({ adaptableApi, vendorGrid}) => { ... }}
  >
  </AdaptableReactAggrid>
  <div className="ag-theme-alpine" style={{ flex: 1 }>
    <AgGridReact
      gridOptions={gridOptions}
      modules={[SideBarModule, MenuModule, RangeSelectionModule, ClientSideRowModelModule]}
    />
  </div>
</div>
```

### AdapTable Tool Panel Component

One consequence of the new ag-Grid version is that if you want to use the AdapTable Tool Panel while using the React Wrapper, it needs to be explicitly imported in your code, e.g.:

```js
import { AdaptableToolPanelAgGridComponent } from '@adaptabletools/adaptable/src/AdaptableComponents';
````

### Deprecated props

 - `agGridTheme` - no longer supported - see above example for how to specify the agGrid theme - add the corresponding `className` prop on the `div` wrapping `<AgGridReact />`
 - `modules` - specify agGrid modules directly on the `<AgGridReact />` component.
 - `render` fn - place the `<AdaptableReactAggrid />` and `<AgGridReact />` components in your jsx wherever you want - they will be connected

## Angular Wrapper Changes

In order to work seamlessly with agGrid 23, the Angular Wrapper was also updated.

Here is a quick summary of the changes (for full information see the [Angular Wrapper](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable-ng-aggrid/README.md):

 * The`<ag-grid-angular>` component needs to be provided explicitly.  Although most ag-grid properties can be passed into the component via inputs, **you have to make sure you pass the `"gridOptions"` object** as an input to the `<ag-grid-angular>` component.  The ag-Grid theme is set via the `class` property.

 * The same `"gridOptions"` object must be passed into the `<adaptable-angular-aggrid>` component as well - in this way, `<adaptable-angular-aggrid>` and `<ag-grid-angular>` are guaranteed to be connected to the same agGrid instance.
 
 * The `onAdaptableReady` input is removed from the `<adaptable-angular-aggrid>` component; instead this functionality is exposed as an event, named `adaptableReady` - see example below

```html
<!-- component.html >

<adaptable-angular-aggrid
  [adaptableOptions]="adaptableOptions"
  [gridOptions]="gridOptions"
  (adaptableReady)="onAdaptableReady($event)"
>
</adaptable-angular-aggrid>
<ag-grid-angular
  [gridOptions]="gridOptions"
  [modules]="..."
  style="height: 90vh"
  class="ag-theme-alpine"
>
</ag-grid-angular>
```

```js
// component.ts

onAdaptableReady({
    adaptableApi,
    vendorGrid,
  }: {
    adaptableApi: AdaptableApi;
    vendorGrid: GridOptions;
  }) {
    adaptableApi.eventApi.on('SelectionChanged', selection => {
      console.warn('selection changed', selection);
    });
  }
````

### AdapTable Tool Panel Component

One consequence of the new ag-Grid version is that if you want to use the AdapTable Tool Panel while using the Angular Wrapper, it needs to be explicitly imported in your code, e.g.:
```js
import { AdaptableToolPanelAgGridComponent } from '@adaptabletools/adaptable/src/AdaptableComponents';
````

## Async Static Constructor (for 'core' AdapTable)

The static constructor used for instantiating AdapTable outside of a Wrapper has become asynchronous.

It still returns an `AdaptableApi` object but now does so via a Promise.

So instead of:

```js
const api: AdaptableApi = Adaptable.init(adaptableOptions)
````

You now do:

```js
const api: AdaptableApi = await Adaptable.init(adaptableOptions)
````

## New Calculated Column Expression Syntax and UI

Previously Calculated Column Expressions were created using an external library (Math.js).

Now we use an internally-built parser to create the Expression.  

This brings many advantages as the Expression can be more powerful than before e.g. by allowing for multiple columns, enabling mixing columns and static values and (coming soon) by allowing users to add their own custom functions.

We have also introduced a much more usable UI for creating Expressions with drag and drop features, multiple functions, dummy data and provision of help-based information about each of the available functions.

We have removed formatting from inside the Calculated Column Expression and instead this can be done through our new, improved [Format Column Function](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/format-column-function.md); this separation of concerns allows the Expression to be just a computation and the formatting to be handled exactly the same way as it is for other columns.

**This is a breaking change**.

The required syntax is very similar to previous versions of AdapTable, and in most cases existing Calculated Columns will just run normally; however this cannot be guaranteed, particularly if they were using some of the more estoric features of math.js or its formatting.

> One effect of this change is that the download size of AdapTable has been greatly reduced as the math.js folder was the single largest element in the downloaded package.

For more information see the [Calculated Column ReadMe](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/calculated-column-function.md)

## Layout Changes

TODO

## Schedule State Changes

In previous versions of AdapTable, each Function that had a Schedule persisted details of the Schedule in its own section of Adaptable State (e.g. Export, Reminder, ipushpull etc).

This has been changed, and now there is a dedicated Schedule section of AdapTable State which contains all the Schedules i.e. for Export, Reminder, ipushpull etc.

One consequence of this is that the `Reminder` section of AdapTable State has been removed as it is no longer required.

For more information see the [Schedule Function ReadMe](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/schedule-function.md)

## Percent Bar Improvements

Percent Bars now include **Ranges**.

These are sets of values with an associated colour (e.g. 1 - 50, Blue).

This allows you, for example, to create a traffic light effect (1-30: Red, 31-60: Amber, 61-100: Green).

AdapTable will automatically update any existing Percent Bars for you; if there are only positive or negative numbers then it will create one range, if there are both then it will create a range for each.

We have also introduced new properties including (optional) back colour, show column value, show value as % and more.

For full information on all these changes see the [Percent Bar ReadMe](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/percent-bar-function.md)

## Config Server Removed


In Version 7 Config Server has finally been removed.

## New 'Partner' plugins

We continue to move non-core functionality out of the main package and into Plugins. 

This allows us to reduce the size of the core package and enables users to choose just those additional plugins which meet their requirements.

In Version 7 we have created 4 new plugins which contain bespoke functionality for each of our partners.

These are:

* [ipushpull](https://github.com/AdaptableTools/adaptable/blob/master/packages/plugins/ipushpull/README.md) 

* [Glue42](https://github.com/AdaptableTools/adaptable/blob/master/packages/plugins/glue42/README.md) 

* [OpenFin](https://github.com/AdaptableTools/adaptable/blob/master/packages/plugins/openfin/README.md) 

* [Finsemble](https://github.com/AdaptableTools/adaptable/blob/master/packages/plugins/finsemble/README.md) 

In each case any configuration that was previously stored in the partner's section of Predefined Config in AdapTable State is now provided through an xxxPluginOptions object injected into the Plugin.

For example to use the ipushpull plugin you will do something like:

```js

const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'ipushpull Demo',
     plugins: [
      ipp({
        username: process.env.IPUSHPULL_USERNAME,
        password: process.env.IPUSHPULL_PASSWORD,
        throttleTime: 5000,
        includeSystemReports: true,
        ippConfig: {
          api_url: 'https://www.ipushpull.com/api/1.0',
          ws_url: 'https://www.ipushpull.com',
          web_url: 'https://www.ipushpull.com',
          docs_url: 'https://docs.ipushpull.com',
          storage_prefix: 'ipp_local',
          transport: 'polling',
          hsts: false, // strict cors policy
        },
      }),
    ],
    predefinedConfig: demoConfig,
    vendorGrid: { ...gridOptions, modules: AllEnterpriseModules },
  };
  
 ```` 
Please read the [Plugin ReadMe](https://github.com/AdaptableTools/adaptable/blob/master/packages/plugins/README.md) for more information - this has links to more detailed information for each Plugin.

## Support for Master / Detail grids

Version 7 of AdapTable provides support for Master / Detail grids in ag-Grid.

Users are able to create a definition not only for the Master Grid but also for the Detail Grids (one Adaptable Options which is shared by all the grids). 

This allows you to create searches, alerts, conditional styles etc to be used by any Detail Grid.

To use this functionality you need to use the new `master-detail-aggrid Plugin` - full details in the [Master Detail Plugin ReadMe](https://github.com/AdaptableTools/adaptable/blob/master/packages/plugins/master-detail-aggrid/README.md)

## Additional CSS Variables

Added `--ab-cmp-field-wrap__border-radius` css variable


## Breaking changes

* LayoutApi.restoreLayout was removed
* LayoutApi.clearLayout was removed
* LayoutApi.restorelayout was removed
* GridApi.isSpecialColumn was renamed to isRowGroupColumn


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
