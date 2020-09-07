# AdapTable Version 7 Upgrade Guide

Version 7 of AdapTable was released in September 2020.

This was a **major release** (primarily to cater for changes in the new ag-Grid version) and therefore contained some **breaking changes**.

Details of all the changes are listed here - for more detailed information with examples see the relevant 'Read Me' for that function.

## Summary of Main Changes

These are the main updates to AdapTable in Version 7:

* Support for latest ag-Grid Version (23) including Alpine theme
* Changes to `Layout` (and a new UI) so they get saved automatically
* Re-written 'Expresion' syntax (and Expression Editor) for `Calculated Column` 
* Powerful new `Query` object - expressions that can be shared across AdapTable functions (and which replaces Advanced Search)
* Previous 4 filter-related functions merged into one `Filter` function
* New `Predicate` and `Scope` types - used in multiple functions
* Improvements to `PercentBar` to enable Ranges
* New 'Partner' plugins - ipushpull, OpenFin, Glue42 and Finsemble
* Support for Master / Detail grids
* Framework Wrapper improvements
* A new asynchronous static constructor
* All Schedule-related state consolidated into one object
* Other minor state changes and new CSS Variables
* Reduced package size by 1/3 - due to replaceing large libraries and tree-shaking others

## Support for ag-Grid Version 23

Version 7 of AdapTable supports ag-Grid Version 23 requiring these changes:

### Quick Filter

The `floatingFilter` property is deprecated in gridOptions - you now have to specify it at column level (or in a default column definition).  

Consequently, AdapTable will only show Quick Filter bar **if at least one column** has this set to true (and will activate it only for those columns).

### Themes

ag-Grid introduced a new _Alpine_ theme which has necessitated some slight changes to AdapTable theming:

* If using a dark theme, make sure to specify your theme in your html, on the grid container element - it should be either `ag-theme-alpine` or `ag-theme-balham` (since they are the only themes that have a dark variant).  AdapTable will detect this theme, and apply the corresponding dark theme.

* The `filterOptions.useVendorFilterFormStyle` is only applied (or required) for the 'Balham' theme, as the _Alpine_ theme looks very similar to our default theme

* The `userInterfaceOptions.useDefaultVendorGridThemes` property has been removed as it is no longer used.

## Layout Changes

In Version 7 Layouts have had a makeover.  The main changes are:

* All layouts will get **automatically** updated whenever a relevant change made (unless the `layoutOptions.autoSaveLayouts` option is set to true in which case the user has a 'Save' button to persist any changes).

* If no Layouts are provided in Predefined Config a 'Default Layout' will be created by AdapTable using the column settings in GridOptions; this too will be saved automatically as changes are made.

  > Set `layoutOptions.createDefaultLayout` property to `true` for AdapTable to provide a default layout even if other layouts exist

* This means that there must always be at least one Layout at any time - AdapTable will prevent the last layout from being deleted.

* The previous (confusing) multi-step Layout wizard has been replaced by a single screen which allows the User to set column visibility, order sorting, grouping, aggregation and pivoting.

* The `Layout` object in AdapTable State has been enhanced to include the ability to set column widths and aggregation properties.

* The `restoreLayout` and `clearLayout` methods in LayoutApi have been removed as they are no longer required.

For more information see the [Layout ReadMe](../functions/layout-function.md)

## New Calculated Column Expression Syntax and UI

Previously Calculated Column Expressions were created using an external library (math.js).

Now AdapTable uses an internally-built parser to create the Expression which bring many advantages and improvements:

* The Expression is far more powerful than before e.g. by allowing for multiple columns, enabling mixing columns and static values and (coming soon) by allowing users to add their own custom functions.

* A much more usable UI for creating Expressions has been introduced with drag and drop features, multiple functions, dummy data and provision of help-based information about each of the available functions.

* Formatting has been decoupled from the Calculated Column Expression (which is just a parsed function) and instead this can be done through the improved [Format Column Function](../functions/format-column-function.md) - exactly the same way as it is for other columns.

**This is a breaking change**:  the required syntax is similar to the previous version so in most cases existing Calculated Columns will run normally; however this cannot be guaranteed, particularly if some of the more estoric features of math.js or its formatting were being used.

> One effect of this change is that the download size of AdapTable has been greatly reduced as the math.js folder was the single largest element in the downloaded package.

For more information see the [Calculated Column ReadMe](../functions/calculated-column-function.md)

## Queries

Version 7 introduces the `Query` - a very powerful Expression that returns a Boolean (true/false) value.  

Queries have a number of important features:

* They can be written by hand as the syntax is very succint and easy to learn

* Alternatively they can be created by using the Expression Editor - the same as used for `CalculatedColumn` (as they both use the same underlying parser).

* They can also be **shared** - via the `SharedQueries` property in Query state.  This allows the same Query to be the `CurrentQuery` (for Search), to be used in a report or to form part of a Conditional Style.
  
* The `AdvancedSearch` function has been replaced by `CurrentQuery` which will run (and save) any query as a search.

For more information see the [Query ReadMe](../functions/query-function.md)

## Filter

Filtering has had a huge makeover in Version 7 including:

* The 4 previous Filter functions (System, User, Column and Named) have been merged into one `Filter` object.

* The Filter Dropdown and Quick Filter UI have been heavily updated and are both now fully in sync - so the same Filter can be entered (and be reflected) in each.

* Both will create a Column Filter.  This now contains only a single `Predicate` (see below for more details) - though that can include the 'IN' predicate to filter on multiple values.

* Developers can easily provide their own Custom Filters at design-time through a much improved syntax

* Wildcards can still be used in the Quick Filter bar (but are now less needed due to the improved UI).

For more information see the [Filter ReadMe](../functions/filter-function.md)

## Predicates and Scope

2 important new types have been introduced in AdapTable to promote object re-use and provide greater flexibility:

### Predicate

A type that returns a boolean value.  It incudes a 'handler' function that will run each time the predicate is required.  

Developers can create their own Predicates at DesignTime via the `customPredicateDefs` property of Adaptable Options.

A predicate can be used in as many of the following functions as required:

* Filter
* Alert
* Cell Validation
* Conditional Style

### Scope

Specifies **where** an object or function can be applied.  It has 3 main values:

* All (i.e. everywhere)
* Column(s)
* DataType(s) - e.g. string, number, date etc

The Scope object has been included in a number of functions including:

* Conditional Styles
* Format Column
* Alert
* Cell Validation
* Reports - which columns to include
* Permitted Column Values

This means that it is now possible to create a Conditional Style for all Numeric columns (e.g. Green Font for Positive values) with a single step.

## Percent Bar Improvements

Percent Bars have been redesigned with the following changes:

* They now include a **Range** - a set of values with an associated colour (e.g. 1 - 50, Blue).

* Multiple Ranges are permitted, allowing, for example, the creation of a traffic light effect (e.g. 1-30: Red, 31-60: Amber, 61-100: Green).

 > AdapTable will automatically update any existing Percent Bars; if there are only positive or negative numbers then it will create one range, if there are both then it will create a range for each.

* New properties have been introduced including (optional) back colour, show column value, show value as % and to manage tooltips.

For full information on all these changes see the [Percent Bar ReadMe](../functions/percent-bar-function.md)

## New 'Partner' plugins

The transfer of 'non-core functionality' out of the main package and into Plugins contains in Version 7.

This enables a reduction in the size of the core package and allows users to select just those plugins which meet their requirements.

4 new plugins have been created which contain bespoke functionality for specific AdapTable partners:

* [ipushpull](../../../plugins/ipushpull/README.md)

* [Glue42](../../../plugins/glue42/README.md)

* [OpenFin](../../../plugins/openfin/README.md)

* [Finsemble](../../../plugins/finsemble/README.md)

In each case any configuration that was previously stored in the relevant partner's section of AdapTable State is now provided through an xxxPluginOptions object injected into the Plugin.

For example to use the ipushpull plugin something like this might be provided:

```ts
......
import ipp from '@adaptabletools/adaptable-plugin-ipushpull';
......

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
 ```

For more information see the [Plugin ReadMe](../../../plugins/README.md) which has links to more detailed information for each Plugin.

## Support for Master / Detail grids

Version 7 of AdapTable provides support for Master / Detail grids in ag-Grid.

Users are able to create Predefined Config not only for the Master Grid but also for the Detail Grids (there is one Adaptable Options which is shared by all the grids).

This also enables run-time users to create searches, alerts, conditional styles etc that will automatially be shared by all 'Detail' grids.

To use this functionality you need to use the new `master-detail-aggrid` Plugin - full details in the [Master Detail Plugin ReadMe](../../../plugins/master-detail-aggrid/README.md)

## React Wrapper Changes

In order to work seamlessly with agGrid 23, the React Wrapper was updated.

Below is a quick summary of the changes - for fuller information see the [React Wrapper Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable-react-aggrid/README.md):

* The `<AgGridReact>` component now needs to be rendered explicitly.  Note: although most ag-grid properties can be passed into the component via props, **you have to make sure you pass the `gridOptions` object** as a prop to the `<AgGridReact>` component

* **The same `gridOptions` object must be passed to the `<AdaptableReactAggrid>` component as well**: in this way, `<AdaptableReactAggrid>` and `<AgGridReact>` are connected to the same agGrid instance.
  
* Theming now needs to be set expliclity (and not via a prop to `<AdaptableReactAggrid>` as before).  This will typically be done by wrapping the `<AgGridReact>` component in a `div` element with the class set to that of the required ag-Grid theme (e.g. 'ag-theme-apline').

#### React Wrapper Example

```tsx
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
      modules={[SideBarModule, MenuModule]}
    />
  </div>
</div>
```

### AdapTable Tool Panel Component

One consequence of the new ag-Grid version is that if you want to use the AdapTable Tool Panel while using the React Wrapper, it needs to be explicitly imported in your code, e.g.:

```js
import { AdaptableToolPanelAgGridComponent } from '@adaptabletools/adaptable/src/AdaptableComponents';
```

### Deprecated props

* `agGridTheme` is no longer supported - see above example for how to specify the ag-Grid theme by adding the corresponding `className` prop on the `div` wrapping `<AgGridReact />`
* `modules` - now specify agGrid modules directly on the `<AgGridReact />` component.
* `render` fn - place the `<AdaptableReactAggrid />` and `<AgGridReact />` components in your jsx wherever you want - they will be connected

## Angular Wrapper Changes

In order to work seamlessly with ag-Grid 23, the Angular Wrapper was also updated.

Below is a quick summary of the changes (for full information see the [Angular Wrapper](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable-ng-aggrid/README.md))

 * The`<ag-grid-angular>` component needs to be provided explicitly.  Although most ag-grid properties can be passed into the component via inputs, **you have to make sure you pass the `"gridOptions"` object** as an input to the `<ag-grid-angular>` component.  The ag-Grid theme is set via the `class` property.

 * The same `"gridOptions"` object must be passed into the `<adaptable-angular-aggrid>` component as well - in this way, `<adaptable-angular-aggrid>` and `<ag-grid-angular>` are guaranteed to be connected to the same agGrid instance.
 
 * The `onAdaptableReady` input is removed from the `<adaptable-angular-aggrid>` component; instead this functionality is exposed as an event, named `adaptableReady`

#### Angular Wrapper Example

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
```

### AdapTable Tool Panel Component

One consequence of the new ag-Grid version is that if you want to use the AdapTable Tool Panel while using the Angular Wrapper, it needs to be explicitly imported e.g.:

```js
import { AdaptableToolPanelAgGridComponent } from '@adaptabletools/adaptable/src/AdaptableComponents';
```

## Async Static Constructor (for 'core' AdapTable)

The static constructor used for instantiating AdapTable (outside of a Wrapper) has become asynchronous.

It still returns an `AdaptableApi` object but now does so via a `Promise`.

So instead of:

```js
const api: AdaptableApi = Adaptable.init(adaptableOptions)
```

This is now required:

```js
const api: AdaptableApi = await Adaptable.init(adaptableOptions)
```

## Schedule State Consolidation

In previous versions of AdapTable, each Function that had a Schedule persisted details of the Schedule in its own section of Adaptable State (e.g. Export, Reminder, ipushpull etc).

This has been changed, and now there is a dedicated Schedule section of AdapTable State which contains all the Schedules i.e. for Export, Reminder, ipushpull etc.

One consequence of this is that the `Reminder` section of AdapTable State has been removed as it is no longer required.

For more information see the [Schedule Function ReadMe](../functions/schedule-function.md)

## Other State Changes

A number of small changes have been made to AdapTable State and Adaptable functionaliy other than that listed above.  These include:

* **Config Server**  - which has long been deprecated - has finally been removed.  The only way to manage state remotely is via the `StateOptions` functions in Adaptable Options.

* As a result of the Layout improvements, the **Column Chooser** and **Column Category** functions have been rendered redundant and have both been removed.

* As a result of the Filter and Query updates, **Quick Search** has been reduced in scope. It is a pure 'contains' text search (i.e. it no longer supports wildcards) and only highlights matching cells (it no longer has a filtering option)

* Another consequence is `searchOptions.serverSearchOption` has been renamed to `serverSearchOptions` and become an array (which can take 'Query', 'Filter' or 'Sort')

* **Alert**, **CellValidation** and **ConditionalStyle** now require a `Predicate` and include `Scope` (see above)

* The `userInterfaceOptions.showAdaptableToolPanel` property now defaults to **true**

* **Export** now allows for CustomReports to be created; a function provided by the user is called when the Report is run.

* The `--ab-cmp-field-wrap__border-radius` css variable has been added

* All UI elements now include **semantic class names** to provide easier custom styling

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
