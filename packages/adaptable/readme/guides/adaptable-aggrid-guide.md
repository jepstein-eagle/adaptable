# AdapTable ag-Grid Guide

AdapTable is designed to integrate and extend with ag-Grid - which is by far the most advanced, powerful, performant and feature-rich HTML5 DataGrid control on the market.

The 2 products are designed to **complement** each other and togther offer [the most advanced DataGrid experience on the market](https://medium.com/ag-grid/getting-more-from-your-datagrid-introducing-adaptable-blotter-2be5debd7e46)

## ag-Grid Framework Wrappers

ag-Grid offers multiple versions for each of the major Frameworks - e.g. React, Angular, Vue, Ember etc.

Currently AdapTable supports the first 2 of these, providinga a [React Wrapper](../../../adaptable-react-aggrid/README.md) and an [Angular Wrapper](../../../adaptable-ng-aggrid/README.md), each of which wraps the equivalent ag-Grid package.

## ag-Grid Enterprise Edition

AdapTable is designed to work seamlessly with ag-grid Enterprise Edition (currently version 23).

In Version 22 ag-Grid introduced modularisation to manage package size.  AdapTable works with this and will check if a required module is present before adding its supporting code.

## ag-Grid Community Edition

Most AdapTable users integrate with ag-Grid Enterprise Edition (or whichever Enterprise modules they require).

However some users prefer to use AdapTable with the free ag-Grid Community Edition.

The good news is that AdapTable still works and all advanced features like Calculated Columns, State Management, Team Sharing, Audit Log etc are entirely unaffected - see the [demo](https://demo.adaptabletools.com/aggridfeatures/aggridcommunityversiondemo).

When working with ag-Grid Community Edition, AdapTable will display its own Column Header Menu (with the full available list of menu options - both Predefined and User-provided), as the ag-Grid Column Menu is available in Enterprise only.

There are some Adaptable Functions that are NOT available in ag-Grid Community edition as they rely on Enterprise features.  These are:

| Function               | Reason                                     |
| ---------------------- | ------------------------------------------ |
| Cell Summary           | Relies on *range-selection* Module         |
| Export (to Excel only) | Requires *excel-export' Module             |
| Pivot Layouts          | Pivoting only available in Enterprise      |
| Row Grouped Layouts    | Row Grouping only available in Enterprise  |
| Tree View Support      | TreeView Data is Enterprise Only           |
| Master-Detail plugin   | Master-Detail only available in Enterprise |


## Licences

See our [Licence Guide](../faqs/licences-faq.md) for information on how to acquire an AdapTable licence.

**Note: You must have a valid ag-Grid licence if using Adaptable with ag-Grid Enterprise edition**

## Demos

Visit the [Demo Site](https://demo.adaptabletools.com/) to see a number of demos of AdapTable with ag-Grid.

In particular see the [ag-Grid section](https://demo.adaptabletools.com/aggridfeatures) to see Adaptable demos using advanced ag-Grid features like [Tree Data View](https://demo.adaptabletools.com/aggridfeatures/aggridtreegriddemo), [Master-Detail](https://demo.adaptabletools.com/aggridfeatures/aggridmasterdetaildemo), [Row Grouping](https://demo.adaptabletools.com/aggridfeatures/aggridrowgroupingdemo), [Pivoting](https://demo.adaptabletools.com/aggridfeatures/aggridpivotingdemo) and [Column Grouping](https://demo.adaptabletools.com/aggridfeatures/aggridcolumngroupingdemo).

To see AdapTable using only the ag-Grid Community Version see [Community Version Demo](https://demo.adaptabletools.com/aggridfeatures/aggridcommunityversiondemo)

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us/articles/360007083017-Help-) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).