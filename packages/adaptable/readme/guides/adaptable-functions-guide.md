# AdapTable Functions Guide

AdapTable ships with 40 **AdapTableFunctions** - each relating to a discrete 'action' or set of functionality.

Most End-User action in AdapTable will be via AdaptableFunctions.

Many AdapTableFunctions contain an array of Objects that users can create, edit or delete (if their Entitlements allow), e.g. AdvancedSearch, ConditionalStyle, PercentBars etc.

## Functions UI

There are a number of different ways in which end-Users will interact with AdapTableFunctions in the AdapTable UI:

- Most AdapTableFunctions have a dedicated **popup screen**.  AdapTableFunctions that contain an array of items (e.g. AdvancedSearch) will typically display these in a table with buttons to add / edit.  AdapTableFunctions which perform actions (e.g SmartEdit, BulkUpdate) will contain UI controls to allow the AdapTableFunction to be used.

- Some AdapTableFunctions provide **Toolbars** which can be displayed in the Dashboard (via Tabs).  These provide easy access to commonly used AdapTableFunctions e.g. Layouts, Reports, Quick Search.  You are able to stipulate which Toolbars are visible through the *Dashboard* AdapTableFunction.

- AdapTableFunctions can also provide **ToolPanels** to be hosted in the AdapTable ToolPanel (at the side of the grid). Like toolbars, these provide ready access to common functionality (the same AdapTableFunctions generally provide both).

- AdapTableFunctions which offer objects that can be created / edited / deleted do so via **AdapTableFunction Wizards**.  These provide a step-by-step way to edit the sometimes complex objects that can be created.

- Many AdapTableFunctions also provide Menu Entries for both the **Column Menu** (available through clicking a Column Header) and **Context Menu** (available through right-clicking on a grid cell, or group of cells). See more at [Adaptable Menus](adaptable-menus-guide.md).

This table lists all the AdapTableFunctions and which UI elements they support.

Click on a link to go to a dedicated ReadMe for that AdapTableFunction.

| AdaptableFunction                                                | Wizard | Toolbar | Tool Panel | Column Menu | Context Menu |
| --------  	                                                   | ------ | ------- | ---------  | ----------- | ------------ |
| [Action Column](../functions/action-column-function.md)          | No     | No      | No         | No          | No           |
| [Advanced Search](../functions/advanced-search-function.md)      | Yes    | Yes     | Yes        | No          | No           |
| [Alert](../functions/alert-function.md)                          | Yes    | Yes     | Yes        | No          | Yes          |
| [Application](../functions/application-function.md)              | No     | No      | No         | No          | No           |
| [Bulk Update](../functions/bulk-update-function.md)              | No     | Yes     | Yes        | No          | Yes          |
| [Calculated Column](../functions/calculated-column-function.md)  | Yes    | No      | No         | Yes         | No           |
| [Calendar](../functions/calendar-function.md)                    | No     | No      | No         | No          | No           |
| [Cell Summary](../functions/cell-summary-function.md)            | No     | Yes     | Yes        | No          | Yes          |
| [Cell Validation](../functions/cell-validation-function.md)      | Yes    | No      | No         | Yes         | No           |
| [Column Filter](../functions/column-filter-function.md)          | No     | Yes     | Yes        | Yes         | Yes          |
| [Column Info](../functions/column-info-function.md)              | No     | No      | No         | Yes         | Yes          |
| [Conditional Style](../functions/conditional-style-function.md)  | Yes    | No      | No         | Yes         | No           |
| [Custom Sort](../functions/custom-sort-function.md)              | Yes    | No      | No         | Yes         | No           |
| [Dashboard](../functions/dashboard-function.md)                  | No     | No      | Yes        | Yes         | No           |
| [Data Source](../functions/data-source-function.md)              | Yes    | Yes     | Yes        | No          | No           |
| [Export](../functions/export-function.md)                        | Yes    | Yes     | Yes        | No          | No           |
| [Flashing Cell](../functions/flashing-cell-function.md)          | No     | No      | No         | Yes         | No           |
| [Format Column](../functions/format-column-function.md)          | Yes    | No      | No         | Yes         | No           |
| [FreeText Column](../functions/freetext-column-function.md)     | Yes    | No      | No         | Yes         | No           |
| [Gradient Column](../functions/gradient-column-function.md)      | Yes    | No      | No         | Yes         | Yes          |
| [Grid Info](../functions/grid-info-function.md)                  | No     | No      | No         | Yes         | Yes          |
| [Layout](../functions/layout-function.md)                        | Yes    | Yes     | Yes        | No          | No           |
| [Percent Bar](../functions/percent-bar-function.md)             | Yes    | No      | No         | Yes         | Yes          |
| [Plus Minus](../functions/plus-minus-function.md)                | Yes    | No      | No         | Yes         | No           |
| [Quick Search](../functions/quick-search-function.md)            | No     | Yes     | Yes        | No          | No           |
| [Reminder](../functions/reminder-function.md)                    | No     | No      | No         | No          | No           |
| [Schedule](../functions/schedule-function.md)                    | Yes    | No      | No         | No          | No           |
| [Shortcut](../functions/shortcut-function.md)                    | Yes    | No      | No         | No          | No           |
| [Smart Edit](../functions/smart-edit-function.md)                | No     | Yes     | Yes        | No          | Yes          |
| [System Status](../functions/system-status-function.md)          | No     | Yes     | Yes        | Yes         | Yes          |
| [Theme](../functions/theme-function.md)                          | No     | Yes     | Yes        | No          | No           |
| [Updated Row](../functions/updated-row-function.md)              | No     | No      | No         | Yes         | Yes          |
| [User Filter](../functions/user-filter-function.md)              | Yes    | No      | No         | Yes         | No           |

### Chart AdapTableFunctions (plugin)

| AdaptableFunction                                                    | Wizard | Toolbar | Tool Panel | Column Menu | Context Menu |
| -------------------------------------------------------------------- | ------ | ------- | ---------- | ----------- | ------------ |
| [Chart](../functions/charts/charts-function.md)                      | Yes    | Yes     | Yes        | No          | No           |
| [Pie Chart (View As)](../functions/charts/piechart-function.md)      | No     | No      | No         | Yes         | Yes          |
| [Sparkline (View As)](../functions/charts/sparkline-function.md)     | No     | No      | No         | Yes         | Yes          |
| [Sparkline Column](../functions/charts/sparkline-column-function.md) | No     | No      | No         | Yes         | Yes          |

### Plugin-based AdapTableFunctions 

| AdaptableFunction                                                                                         | Wizard | Toolbar | Tool Panel | Column Menu | Context Menu |
| --------------------------------------------------------------------------------------------------------- | ------ | ------- | ---------- | ----------- | ------------ |
| [ipushpull](https://github.com/AdaptableTools/adaptable/blob/master/packages/plugins/ipushpull/README.md) | No     | Yes     | No         | No          | No           |
| [Glue42](https://github.com/AdaptableTools/adaptable/blob/master/packages/plugins/glue42/README.md)       | No     | Yes     | No         | No          | No           |
| [OpenFin](https://github.com/AdaptableTools/adaptable/blob/master/packages/plugins/openfin/README.md)     | No     | Yes     | No         | No          | No           |
| [Finsemble](https://github.com/AdaptableTools/adaptable/blob/master/packages/plugins/finsemble/README.md) | No     | No      | No         | No          | No           |

### Entitlements

All AdapTableFunctions are subject to Entitlements.  

This means that end-users will only be able to access a AdapTableFunction according to their permissions.

Each AdapTableFunction can be given an Entitlement of *Full*, *ReadOnly* or *Hidden*. 

See Entitlements State in the Developer Documentation for more information.

### Predefined Config / State

Design-time Users are able to pre-populate AdapTable with Predefined Config - this is the *AdapTable State* that will be available when the application first loads.

There are a huge number of sections in Predefined Config, the majority of which are AdapTableFunction-related.

Nearly every AdapTableFunctions has its own section / property in PredefinedConfig, and it will always have the same name.  

For example, you can ship AdapTable with pre-created Custom Sorts for use in the Custom Sort AdapTableFunction through the 'CustomSort' section of Predefined Config.

## FAQ

**Can we hide particular Functions from our users as they are not relevant (i.e. we are a readonly grid so don't require Smart Edit or Shortcuts Functions)?**

Yes, you can use the Entitlements section of Predefined Config to set which Functions are available to each user, and whether they are hidden, editable or readonly.

**Do you plan to add more Functions?**

Yes, we continue to add more Functions all the time, primarily in response to suggestions and ideas submitted by our Users.

## Demo

Visit our [Demo Site](https://demo.adaptabletools.com) to see many of the AdapTableFunctions in AdapTable in action.

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us/articles/360007083017-Help-) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about AdapTable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
