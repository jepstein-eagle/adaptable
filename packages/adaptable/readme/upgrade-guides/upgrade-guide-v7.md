# AdapTable Version 7 Upgrade Guide

Version 7 of AdapTable will be released on 28 June.

This is a major version release (primarily to cater for changes in the new ag-Grid version) and has a number of changes of interest:

* Support for latest ag-Grid Version (23) - necessitating changes to the React and Angular Wrappers.

* New Calculated Column Expression Syntax

* Schedule State Changes

* Percent Bars Improvements

* Config Server Removed

* Additional CSS Variables

## Support for ag-Grid Version 23

Note formatted value expression and column filter dropdown

By default, column filters looked very similar to aggrid 22 balham theme, since `filterOptions.useVendorFilterFormStyle` was default to `true`. With the transition to v23, even with `filterOptions.useVendorFilterFormStyle` set to `true`, the styles now look more modern and similar to the aggrid `alpine` theme, which aggrid recommends as default.

`filterOptions.useVendorFilterFormStyle` - custom styles are only applied to balham theme, as the alpine theme looks very similar to our default theme

We removed `userInterfaceOptions.useDefaultVendorGridThemes` as it was no longer used.

Quick filter property is deprecated in gridOptions - `gridOptions.floatingFilter` - you have to specify it at column level.

Slight changes to theming, to accomodate new aggrid themes. Make sure you specify your theme in your html, on the grid container element - it should be either `ag-theme-alpine` or `ag-theme-balham` (since they are the only themes that have a dark variant). We then detect this theme, and apply the corresponding dark theme, when it is selected from theme theme toolbar.

AdapTable Angular wrapper - introduced `agGridTheme` property - defaults to `"balham"`

### React wrapper 

With v7 of `AdapTable`, which works with agGrid 23, the React wrapper was updated - here's a quick summary of the changes:

 * you now have to render `<AgGridReact>` component yourself - although most ag-grid properties can be passed into the component via props, **you have to make sure you pass the `"gridOptions"` object** as a prop to the `<AgGridReact>` component

 * you have to pass the same `"gridOptions"` object to the `<AdaptableReactAggrid>` component as well - in this way, `<AdaptableReactAggrid>` and `<AgGridReact>` are connected to the same agGrid instance.
 
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



## New Calculated Column Expression Syntax

To Do

## Schedule State Changes

In previous versions of AdapTable, each Function that had a Schedule persisted details of the Schedule in its own section of State.

This has been changed and now there is a Schedule section of State which contains all the Schedules i.e. for Export, Reminder, ipushpull etc.

One consequence of this is that the `Reminder` section of Adaptable State has been removed as it is no longer required.

## Percent Bar Improvements

To Do

## Config Server Removed

Since Version 5 of AdapTable, Config Server (which enabled remote storage of Adaptable State) has been deprecated in favour of the more powerful and flexible [StateOptions](../../../adaptable/src/AdaptableOptions/StateOptions.ts) functions.  

In Version 7 Config Server has finally been removed.

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
