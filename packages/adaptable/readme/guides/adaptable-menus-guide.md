# AdapTable Menus Guide

This guide explains how best to manage, customise and augment the menus in AdapTable.

AdapTable provides 3 menus: - **Function**, **Column** and **Context**. 

Each menu performs a different task and has different entries and customisation options.

## AdaptableFunction Menu

The Function menu appears in the left corner of the Dashboard (with a 'house' icon).

It contains a list of all the AdapTable Functions to which the current user is [entitled](adaptable-entitlements-guide.md).  

Each menu entry opens a popup window specific to that function.

> Unlike the Column and Context menus, the entries in the Function menu cannot be edited by developers.

## Column Menu

The Column Header Menu is accessed by clicking the 3 horizontal lines in the Column Header.  

> To make the 3 horizontal lines **always visible** in the Column Header set `suppressMenuHide` to true in GridOptions.

The menu contains a mix of entries applicable either to the current Column or to the Grid as a whole.

### System Column Menu Entries

AdapTable, by default, includes a number of entries in the Column Menu.  

Each entry is associated with a different `AdapTableFunction` (to make it easy for devs to exclude those entries they dont wish to appear).

The full list (as of July 2020) is:

| Menu Entry                   | AdaptableFunction                                               | Columns Displayed     |
| ---------------------------- | --------------------------------------------------------------- | --------------------- |
| Edit Calculated Column       | [Calculated Column](../functions/calculated-column-function.md) | Calculated Columns    |
| Create Cell Validation Rule  | [Cell Validation](../functions/cell-validation-function.md)     | All                   |
| Hide Column                  | [Layout](../functions/layout-function.md)                       | All                   |
| Select Column                | [Layout](../functions/layout-function.md)                       | All                   |
| Show / Hide Quick Filter Bar | [Column Filter](../functions/column-filter-function.md)         | All                   |
| Clear Filter                 | [Column Filter](../functions/filter-function.md)                | Currently Filtered    |
| Column Info                  | [Column Info](../functions/column-info-function.md)             | All                   |
| Create Conditional Style     | [Conditional Style](../functions/conditional-style-function.md) | All                   |
| New / Edit Custom Sort       | [Custom Sort](../functions/custom-sort-function.md)             | All                   |
| Expand / Collapse Dashboard  | [Dashboard](../functions/dashboard-function.md)                 | All                   |
| Dock / Float Dashboard       | [Dashboard](../functions/dashboard-function.md)                 | All                   |
| Turn Flashing Cell Off / On  | [Flashing Cells](../functions/flashing-cell-function.md)        | Numeric               |
| New / Edit Format Column     | [Format Column](../functions/format-column-function.md)         | All                   |
| Edit Free Text Column        | [Free Text Column](../functions/freetext-column-function.md)    | Free Text Columns     |
| New / Edit Gradient Column   | [Gradient Column](../functions/gradient-column-function.md)     | Numeric               |
| Show Grid Info               | [Grid Info](../functions/grid-info-function.md)                 | All                   |
| New / Edit Percent Bar       | [Percent Bar](../functions/percent-bar-function.md)             | Numeric               |
| New Plus Minus Rule          | [Plus Minus](../functions/plus-minus-function.md)               | Numeric               |
| Show System Status           | [System Status](../functions/system-status-function.md)         | All                   |
| Clear Updated Rows           | [Updated Row](../functions/updated-row-function.md)             | All (if updated rows) |

If running the [Chart Plugin](../../../plugins/charts/README.md) the following Column Menu Entries are also available:

| Menu Entry            | AdaptableFunction                                                   | Columns Displayed |
| --------------------- | ------------------------------------------------------------------- | ----------------- |
| View as Pie Chart     | [Pie Chart](../functions/charts/piechart-function.md)               | All               |
| View as Sparkline     | [Sparkline](../functions/charts/sparkline-function.md)              | All               |
| Edit Sparkline Column | [Sparkline Coumn](../functions/charts/sparkline-column-function.md) | Sparkline Columns |

#### Hiding System Column Menu Entries

Developers can, at design-time, choose not to display some (or all) of the shipped Column Menu entries.

This is done by providing a custom implementation for the `showAdaptableColumnMenu` function in [User Interface Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_userinterfaceoptions_.userinterfaceoptions.html#showadaptablecolumnmenu).

### User Column Menu Entries

Developers can add their own custom entries to the Column Menu at design-time.  

This is done in 2 steps:

1. Provide a custom, named [UserMenuItemClickedFunction](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_userinterfacestate_.usermenuitemclickedfunction.html) implementation in [User Functions](https://api.adaptabletools.com/modules/_src_adaptableoptions_userfunctions_.html) section of Adaptable Options.

2. Reference the function by name in the [User Interface](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_userinterfacestate_.userinterfacestate.html) section of Predefined Config.

#### Hiding User Column Menu Entries

It might not always make sense for a User Column Menu entry to appear (e.g. it might be applicable only to numeric columns).

For this reason, AdapTable provides a function enabling devs to 'hide' Column Menu entries based on the current context.

This is done in a similar 2 steps:

1. Provide a custom, named [UserMenuItemShowPredicate](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_userinterfacestate_.usermenuitemshowpredicate.html) implementation in [User Functions](https://api.adaptabletools.com/modules/_src_adaptableoptions_userfunctions_.html) section of Adaptable Options.

2. Reference the predicate by name in the [User Interface](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_userinterfacestate_.userinterfacestate.html) section of Predefined Config.

## Context Menu

The Context Menu is accessed by right-clicking any cell in the grid.

> If you are using a trackpad you might not be able to access the ag-Grid context menu (which AdapTable uses when ag-Grid is the vendor grid); if that is the case then set `allowContextMenuWithControlKey` to true in GridOptions.

### System Context Menu Entries

AdapTable, by default, includes a number of entries in the Context Menu.  

> These entries will vary depending on which column the click occurs, which other cells (if any) are selected and in which column(s).

Each entry is associated with a different `AdapTableFunction` (to make it easy for devs to exclude those entries they dont want to appear).

The full list (as of July 2020) is:

| Menu Entry              | AdaptableFunction                                           | When Displayed                           |
| ----------------------- | ----------------------------------------------------------- | ---------------------------------------- |
| Clear Alert             | [Alert](../functions/alert-function.md)                     | If any live Alerts                       |
| Apply Bulk Update       | [Bulk Update](../functions/bulk-update-function.md)         | Single, editable column selected         |
| See Cell Summary        | [Cell Summary](../functions/cell-summary-function.md)       | Any cells selected                       |
| Edit Layout             | [Layout](../functions/layout-function.md)                   | Always                                   |
| Filter on Cell Value(s) | [Column Filter](../functions/column-filter-function.md)     | Always                                   |
| Show Column Info        | [Column Info](../functions/column-info-function.md)         | Single column selected                   |
| Export Selected Cells   | [Export](../functions/export-function.md)                   | Any cells selected                       |
| Edit Gradient Column    | [Gradient Column](../functions/gradient-column-function.md) | Single Gradient Column selected          |
| Show Grid Info          | [Grid Info](../functions/grid-info-function.md)             | Always                                   |
| Edit Percent Bar        | [Percent Bar](../functions/percent-bar-function.md)         | Single Percent Bar Column selected       |
| Apply Smart Edit        | [Smart Edit](../functions/smart-edit-function.md)           | Single, editable numeric column selected |
| Show System Status      | [System Status](../functions/system-status-function.md)     | Always                                   |
| Clear Updated Rows      | [Updated Row](../functions/updated-row-function.md)         | Any live Updated Rows                    |

If running the [Chart Plugin](../../../plugins/charts/README.md) the following Context Menu Entries are also available:

| Menu Entry            | AdaptableFunction                                                   | Columns Displayed                |
| --------------------- | ------------------------------------------------------------------- | -------------------------------- |
| View as Pie Chart     | [Pie Chart](../functions/charts/piechart-function.md)               | All                              |
| View as Sparkline     | [Sparkline](../functions/charts/sparkline-function.md)              | All                              |
| Edit Sparkline Column | [Sparkline Coumn](../functions/charts/sparkline-column-function.md) | Single Sparkline Column selected |

#### Hiding System Context Menu Entries

Developers can, at design-time, choose not to display some (or all) of the shipped Context Menu entries.

This is done by providing a custom implementation for the `showAdaptableContextMenu` function in [User Interface Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_userinterfaceoptions_.userinterfaceoptions.html#showadaptablecontextmenu).

### Custom Context Menu Entries

Developers can add their own custom entries to the Context Menu at design-time.  

This is done in 2 steps:

1. Provide a custom, named [UserMenuItemClickedFunction](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_userinterfacestate_.usermenuitemclickedfunction.html) implementation in [User Functions](https://api.adaptabletools.com/modules/_src_adaptableoptions_userfunctions_.html) section of Adaptable Options.

2. Reference the function in the [User Interface](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_userinterfacestate_.userinterfacestate.html) section of Predefined Config.

#### Hiding User Context Menu Entries

It might not always make sense for a User Context Menu entry to appear (e.g. the menu might require cells from a single Date Column to be selected).

For this reason, AdapTable provides a function enabling devs to 'hide' Context Menu entries based on the current context.

This is done in 2 steps:

1. Provide a custom, named [UserMenuItemShowPredicate](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_userinterfacestate_.usermenuitemshowpredicate.html) implementation in [User Functions](https://api.adaptabletools.com/modules/_src_adaptableoptions_userfunctions_.html) section of Adaptable Options.

2. Reference the predicate by name in the [User Interface](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_userinterfacestate_.userinterfacestate.html) section of Predefined Config.

## Entitlements

All 3 of the AdapTable Menus obey [Entitlement](adaptable-entitlements-guide.md) Rules.

This means that if an AdaptableFunction has an Entitlement of `Hidden` it wont appear in any of the menus.

## Demos

- [Column Menu Demo](https://demo.adaptabletools.com/userinterface/aggridcolumnmenudemo)

- [Context Menu Demo](https://demo.adaptabletools.com/userinterface/aggridcontextmenudemo)

## More Information

- [User Interface State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_userinterfacestate_.userinterfacestate.html)

- [User Interface Api](https://api.adaptabletools.com/interfaces/_src_api_userinterfaceapi_.userinterfaceapi.html)

- [User Functions](https://api.adaptabletools.com/modules/_src_adaptableoptions_userfunctions_.html)

- [User Interface Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_userinterfaceoptions_.userinterfaceoptions.html)

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us/articles/360007083017-Help-) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
