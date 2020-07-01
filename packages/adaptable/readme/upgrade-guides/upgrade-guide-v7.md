# AdapTable Version 7 Upgrade Guide

Version 7 of AdapTable will be released on Sunday 5 July.

This is a major version release (primarily to cater for changes in the new ag-Grid version) and has a number of changes that will be of interest, including:

* Support for latest ag-Grid Version (23) including Alpine theme - necessitating changes to the React and Angular Wrappers.

* Static Constructor now asynchronous

* New Calculated Column Expression Syntax and UI

* Schedule State Changes

* Percent Bars Improvements

* Config Server Removed

* New 'Partner' plugins

* Support for Master / Detail grids

* Additional CSS Variables

## Support for ag-Grid Version 23

Version 7 of AdapTable supports ag-Grid Version 23 which has some major changes, particularly around theming but also in other aspects as well.

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

AdapTable Angular wrapper - introduced `agGridTheme` property - defaults to `"balham"`

### React wrapper

With v7 of `AdapTable`, which works with agGrid 23, the React wrapper was updated - here's a quick summary of the changes:

 * you now have to render `<AgGridReact>` component yourself - although most ag-grid properties can be passed into the component via props, **you have to make sure you pass the `"gridOptions"` object** as a prop to the `<AgGridReact>` component

 * **you have to pass the same `"gridOptions"` object to the `<AdaptableReactAggrid>` component as well** - in this way, `<AdaptableReactAggrid>` and `<AgGridReact>` are connected to the same agGrid instance.
 
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

#### AdapTable Tool Panel Component

One consequence of the new ag-Grid version is that if you want to use the Adaptable Tool Panel while using the React Wrapper, it needs to be explicitly imported in your code, e.g.:

```js
import { AdaptableToolPanelAgGridComponent } from '@adaptabletools/adaptable/src/AdaptableComponents';
````

#### Deprecated props

 - `agGridTheme` - no longer supported - see above example for how to specify the agGrid theme - add the corresponding `className` prop on the `div` wrapping `<AgGridReact />`
 - `modules` - specify agGrid modules directly on the `<AgGridReact />` component.
 - `render` fn - place the `<AdaptableReactAggrid />` and `<AgGridReact />` components in your jsx wherever you want - they will be connected

### Angular wrapper

With v7 of `AdapTable`, which works with agGrid 23, the angular wrapper was updated - here's a quick summary of the changes:

 * you now have to render `<ag-grid-angular>` component yourself - although most ag-grid properties can be passed into the component via inputs, **you have to make sure you pass the `"gridOptions"` object** as an input to the `<ag-grid-angular>` component

 * you have to pass the same `"gridOptions"` object to the `<adaptable-angular-aggrid>` component as well - in this way, `<adaptable-angular-aggrid>` and `<ag-grid-angular>` are connected to the same agGrid instance.
 
 * the `onAdaptableReady` input is removed from the `<adaptable-angular-aggrid>` component; instead this functionality is exposed as an event, named `adaptableReady` - see example below

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

#### AdapTable Tool Panel Component

One consequence of the new ag-Grid version is that if you want to use the Adaptable Tool Panel while using the Angular Wrapper, it needs to be explicitly imported in your code, e.g.:
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

Previously Calculated Columns were created using an external library (Math.js).

Now we use an internally-built parser for the Expression.  

This brings many advantages as the Expression can be more powerful than before e.g. by allowing for multiple columns, for mixing columns and static values and (coming soon) for allowing users to add their own custom functions.

We have also introduced a much more usable UI for creating Expressions with drag and drop features, multiple functions, dummy data and provision of help-based information about the available functions.

We have removed formatting from inside the Calculated Column Expression and instead this can be done through our new, improved Format Column function; this separation of concerns allows the Expression just to be a computation and the formatting to be handled the same way as it is for other columns.

**This is a breaking change**.

The required syntax is very similar to previous versions of AdapTable, and in most cases existing Calculated Columns will just run normally; however this cannot be guaranteed, particularly if they were using some of the more estoric features of math.js or its formatting.

> One effect of this change is that the download size of AdapTable has been greatly reduced as the math.js folder was the single largest element in the downloaded package.

## Schedule State Changes

In previous versions of AdapTable, each Function that had a Schedule persisted details of the Schedule in its own section of Adaptable State (e.g. Export, Reminder, ipushpull etc).

This has been changed, and now there is a dedicated Schedule section of Adaptable State which contains all the Schedules i.e. for Export, Reminder, ipushpull etc.

One consequence of this is that the `Reminder` section of Adaptable State has been removed as it is no longer required.

## Percent Bar Improvements

To Do

## Config Server Removed

Since Version 5 of AdapTable, Config Server (which enabled remote storage of Adaptable State) has been deprecated in favour of the more powerful and flexible [StateOptions](../../../adaptable/src/AdaptableOptions/StateOptions.ts) functions.  

In Version 7 Config Server has finally been removed.

## New 'Partner' plugins

We continue to move non-core functionality out of the main package and into Plugins. 

This allows us to reduce the size of the core package and enables users to choose just those additional plugins which meet their requirements.

In Version 7 we have created 4 new plugins which contain bespoke functionality for each of our partners.

These are:

* ipushpull

* Glue42

* OpenFin

* Finsemble

In each case any configuration that was previously stored in the partner's section of Predefined Config in Adaptable State is now provided through an xxxPluginOptions object injected into the Plugin.

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

To Do

## Additional CSS Variables

Added `--ab-cmp-field-wrap__border-radius` css variable

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
