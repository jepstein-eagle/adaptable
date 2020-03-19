# AdapTable Getting Started Guide

This guide is designed to help new users get up and running quickly with the key concepts and objects in AdapTable.

## Adaptable State / Predefined Config

to do

## Adaptable Options

to do

## Adaptable API

to do

## UI Elements

There are a number of key UI elements in AdapTable:

Dashboard

The Dashboard is the area at the top of AdapTable interface designed to give you quick access to commonly used Functions. It contains 2 main elements:

A group of Function Toolbars - these are small controls containing buttons and dropdown relevant to a single Function, often avoiding the need to access the Function popup directly.  Each toolbar contains a Config button which gives access the main popup for that Function. You are also able to include your own Custom Toolbars See Custom Toolbars for more information.

A group of Shortcut Buttons - these provide ready access to frequently used functions.

You are able to minimise, maximise, move and hide the Dashboard as required.

See the Dashboard section of Predefined Config for more information.

Tool Panel

An alternative to using the Dashboard for ag-Grid users is the AdapTable Tool Panel.

This is the area to the right of the Grid.

The AdapTable Tool Panel has many of the same features as the Dashboard (except for Custom Toolbars) and is ideal for when screen estate is at a premium.

Menus

AdapTable provides both a Column Header Menu and a Context Menu that provides menu entries appropriate to the current column or cell.

Note
The options in the menu will vary depending on the data type of column and the current state of that column. For example, only numeric columns have a Flashing Cell menu item, and if the column is already set to display flashing cells, the Turn Flashing Cell On option is replaced by Turn Flashing Cell Off.

Tip
Access the Column Header menu by clicking on the image in the right corner of a column header.

As ag-Grid contains its own column header menu, the AdapTable menu items are inserted into that menu.  For other grids, the column menu appears in its own tab.

Warning
If you are using a trackpad you might not be able to access the ag-Grid context menu (which AdapTable uses when ag-Grid is the vendor grid); if that is the case then set allowContextMenuWithControlKey to true in gridOptions.

You can add your own items to the Column and Context Menus through User Interface Predefined Config.

Additionally, you can choose not to display some (or all) of the shipped Column and Context Menu items through the showAdaptableColumnMenu and showAdaptableContextMenu properties / functions.

Wizards

Many of the forms to create Adaptable Objects have wizards. These make it easy to create and edit items step by step by clicking the Forward, Back or Finish buttons as appropriate.

Tip
Wizards also contain a legend that tells you where you are positioned in the Wizard at one time.

If you are editing an existing object the links in the legend are activated to make it easy to jump forward to a later wizard stage.

Note
Many, but not all, wizards include a step to build a query. This step is quite complex and itself can involve numerous iterations (if required). For more see Queries.

Selection Tool

Many functions (e.g. Column Chooser or Custom Sort) in AdapTable use the Selection Tool. This allows you easily to manage both order and visibility.

All Selection Tools have the source list in the left hand side listbox and the result list (showing ordered, visible values) in the right hand side listbox.

Tip
You can use the buttons to move items between lists and within the result list, or you can use Drag and Drop.

Calendars

AdapTable has some date-related functionality that is based on a Calendar. For example, you can filter a date column so that it only shows the Last Working Day, and AdapTable uses the current calendar to figure out when the last working day was.

There are different Calendars available to use - each pre-set with the appropriate national holidays - or you can upload your own.

Help

Many of the screens in AdapTable have context-sensitive help, where appropriate, displaying an information icon. If you hover the cursor over the icon, the help information appears in a pop-up dialog.

Appendix

Column Header Menu Options

Option

Columns

Description

Create Cell Validation Rule

All

Opens Cell Validation wizard

Create Conditional Style

All

Opens Conditional Style wizard

Create User Filter

All

Opens User Filter wizard

Create [or Edit] Custom Sort

All

Opens Custom Sort wizard

Create Plus/Minus Nudge Rule

Number

Opens Plus/Minus wizard

Create [or Edit] Percent Bar

Number

Opens Percent Bar wizard

Select Column

All

Selects all the values in the Column.

Hide Column

All

Hides the column from the grid.

Turn Flashing Cells On / Off

Number

Turns Flashing Cell On or Off for that Column.

Edit Calculated Column

Calculated Column

Opens Calculated Column wizard

Edit FreeText Column

FreeText Column

Opens Free Text Column wizard

Show Column Information

All

Opens Column Information popup

Create [or Edit] Format Column

All

Opens Format Column wizard

Hide [or Show] Dashboard

All

Hides / Shows the Dashboard above the grid.

Clear Column Filter

All

Clears the Filter on a column (if one exists)

Hide [or Show] Quick Filter

All (if filterable)

Hides / Shows Quick Filter bar.

Clear Updated Rows

All

Clears rows that have been styled via Updated Rows function.

Context Menu Options

Option

When Shown

Clear Alerts

If the cell is currently highlighted as the result of an Alert

Show Column Chooser

Always

Clear Updated Row

If the cell is in a row which has been highlighted a different colour after update (via the Updated Rows function).

## How It Fits Together

to do


 
## Demo

To see AdapTable in action visit our [Demo Site](https://demo.adaptabletools.com).  Here you can see a large number of AdapTable demos each showing a different feature, function or option in AdapTable (using dummy data sets).

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).

