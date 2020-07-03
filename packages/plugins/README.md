# AdapTable Plugins Guide

In order to keep the 'core' download a manageable size, Version 6 (released in January 2020) of AdapTable introduced plugins. 

Plugins are additional groupings of functionality relevant to a particular set of users or usage.

There are currently 8 plugins available (though more are being added all the time):

- [Finance Plugin](./finance)

- [Charting Plugin](./charts)

- [No Code AgGrid Plugin](./nocode-aggrid)

- [Master Detail AgGrid Plugin](./master-detail-aggrid)

- [ipushpull Plugin](./ipushpull)

- [Finsemble Plugin](./finsemble)

- [OpenFin Plugin](./openfin)

- [Glue42 Plugin](./glue42)

## Using Plugins

To use the AdapTable plugins you need to do the following:

1. Install the packages you need in npm. So depending on the plugins you require, you would add some or all of the following:

  ```sh
  npm install @adaptabletools/adaptable-plugin-charts
  npm install @adaptabletools/adaptable-plugin-finance
  npm install @adaptabletools/adaptable-plugin-nocode-aggrid
  npm install @adaptabletools/adaptable-plugin-master-detail-aggrid
  npm install @adaptabletools/adaptable-plugin-ipushpull
  npm install @adaptabletools/adaptable-plugin-finsemble
  npm install @adaptabletools/adaptable-plugin-openfin
  npm install @adaptabletools/adaptable-plugin-glue42
  ```

  > You must install the same version of the plugin as you use for the 'core' AdapTable package.  AdapTable will send a warning message to the console if these are different

2. Import the plugin(s) in your code when instantiating AdapTable:

  ```ts
  import charts from "@adaptabletools/adaptable-plugin-charts";
  import finance from "@adaptabletools/adaptable-plugin-finance";
  import nocode from "@adaptabletools/adaptable-plugin-nocode-aggrid";
  import masterDetail from "@adaptabletools/adaptable-plugin-master-detail-aggrid";
  import ipushpull from "@adaptabletools/adaptable-plugin-ipushpull";
  import finsemble from "@adaptabletools/adaptable-plugin-finsemble";
  import openfin from "@adaptabletools/adaptable-plugin-openfin";
  import glue42 from "@adaptabletools/adaptable-plugin-glue42";
  ```

3. Add the plugins to the plugins property in AdaptableOptions:

```ts
const adaptableOptions: AdaptableOptions = {
  primaryKey: "OrderId",
  adaptableId: "Plugin Demo",
  // call the plugins functions and pass them to plugins array
  plugins: [charts(), finance(), nocode()],
  .....
}
```

## Finance Plugin

This contains functionality that is of particular interest to financial services users.

It includes specialised Cell Summary operations like 'VWap' and 'Only' and will soon also include specialist financial column formatters.

> AdapTable was initially called the Adaptable Blotter to reflect the fact that its early users were in financial services. However it soon became apparent that the data management functionality on offer was of much wider application to a great many other sectors.  Hence the product was renamed AdapTable and the finance-specific functionality was moved to the finance plugin.

## Chart Plugin

The charting plugin allows you to access the rich AdapTable charting set courtesy of Infragistics.

The charts on offer include:

- Category Charts

- Pie Charts

- Financial Charts

- Sparkline Charts

- Data Charts

> Charting was converted into a plugin so that those users who don't need this functionality, or have their own charting libraries, can avoid having to download a package that they will not use.

## No Code Plugin

The No Code plugin enables the creation of new AdapTable instances purely by dragging and dropping existing JSON or Excel files.

An AdapTable wizard will work out the column names and types from the uploaded file - and allow you to set filtering, sorting, and editability as required.

The wizard will also allow you to choose from more advanced options so you can create a dynamic AdapTable instance to meet your particular requirements.

Once built AdapTable will save the state as it does for developer-built instances, so that any filters, searches, reports etc that are created are available the next time that named instance is run.

## Master Detail AgGrid Plugin

For use when ag-Grid has been set to Master / Detail mode.

It allows each detail grid to be an instance of AdapTable.

## ipushpull Plugin

## Finsemble Plugin

## OpenFin Plugin

Designed for when AdapTable will be used inside the [OpenFin](https://openfin.co/) container.

This plugin allows users to take advantage of some additional functionality courtesy of OpenFin, e.g. 'Live Excel' - where data exported to Excel updates in the spreadsheet in real time as the source data in AdapTable itself ticks.

## Glue42 Plugin

Designed for when AdapTable will be used on a desktop also running [Glue42](https://glue42.com/).

This plugin leverages many of the powerful features of Glue42 to offer users additional options such as Audited, Validated 2 way export between AdapTable and Excel.  

## Demo

Visit the [Charts Demo](https://demo.adaptabletools.com/charts) to see AdapTable with the Charts plugin.

Visit the [Cell Summary Demo](https://demo.adaptabletools.com/gridmanagement/aggridcellsummarydemo) to see AdapTable with the Finance plugin.

Visit the [No Code Demo](https://demo.adaptabletools.com/admin/aggridnocodedemo) to see AdapTable with the No Code plugin.

Visit the [Master Detail Demo](https://demo.adaptabletools.com/aggridfeatures/aggridmasterdetaildemo) to see AdapTable with the Master-detail plugin.

Visit the [ipushpull Demo](https://demo.adaptabletools.com/partners/ipushpulldemo) to see AdapTable with the ipushpull plugin.

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us/articles/360007083017-Help-) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
