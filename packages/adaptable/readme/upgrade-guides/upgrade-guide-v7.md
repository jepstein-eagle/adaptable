# AdapTable Version 7 Upgrade Guide

Version 7 of AdapTable will be released end of May.

It has some changes of interest:

## New ag-Grid Version (23)

Note formatted value expression and column filter dropdown 

By default, column filters looked very similar to aggrid 22 balham theme, since `filterOptions.useVendorFilterFormStyle` was default to `true`. With the transition to v23, even with `filterOptions.useVendorFilterFormStyle` set to `true`, the styles now look more modern and similar to the aggrid `alpine` theme, which aggrid recommends as default.

TODO - discuss about `filterOptions.useVendorFilterFormStyle` - what theme should we customize that for?

We removed `userInterfaceOptions.useDefaultVendorGridThemes` as it was no longer used.

Slight changes to theming, to accomodate new aggrid themes. Make sure you specify your theme in your html, on the grid container element - it should be either `ag-theme-alpine` or `ag-theme-balham` (since they are the only themes that have a dark variant). We then detect this theme, and apply the corresponding dark theme, when it is selected from theme theme toolbar.

AdapTable Angular wrapper - introduced `agGridTheme` property - defaults to `"balham"`

```
<adaptable-angular-aggrid
  ...
  [agGridTheme]="'alpine'"
  [onAdaptableReady]="onAdaptableReady"
>
</adaptable-angular-aggrid>

```
## CSS Variables


Added `--ab-cmp-field-wrap__border-radius` css variable

## Display Format Columns

To Do

## Calculated Columns

To Do

## Team Sharing

To Do

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
