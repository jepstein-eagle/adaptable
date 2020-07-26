# AdapTable Menus Guide

This guide explains how best to manage the Column and Context menus in AdapTable.



AdapTable provides 2 menus each of which contains menu entries appropriate to the current column or cell:

- **Column Header Menu**: accessed by clicking on the image in the right corner of a column header

    > The options in the menu vary depending on the data type of column and the current state of that column. For example, only numeric columns have a Flashing Cell menu item, and if the column is already set to display flashing cells, the Turn Flashing Cell On option is replaced by Turn Flashing Cell Off.

- **Context Menu**: accessed by right-clicking in any cell inside the Grid.

    The context menu options will vary according to what other cells are selected.

    > If you are using a trackpad you might not be able to access the ag-Grid context menu (which AdapTable uses when ag-Grid is the vendor grid); if that is the case then set allowContextMenuWithControlKey to true in gridOptions.

Developers can add their own items to the Column and Context Menus through [User Interface Predefined Config](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_userinterfacestate_.userinterfacestate.html)

Additionally, they can choose not to display some (or all) of the shipped Column and Context Menu items through the `showAdaptableColumnMenu` and `showAdaptableContextMenu` properties / functions. 



### More Information

- [User Interface State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_userinterfacestate_.userinterfacestate.html)
- [User Interface Demos](https://demo.adaptabletools.com/userinterface)


## Demos

To see AdapTable in action visit our [Demo Site](https://demo.adaptabletools.com).  Here you can see a large number of AdapTable demos each showing a different feature, function or option in AdapTable (using dummy data sets).

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us/articles/360007083017-Help-) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
