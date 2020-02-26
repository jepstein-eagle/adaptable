# AdapTable Plugins Guide

In order to keep the 'core' download a manageable size, Version 6 (released in January 2020) of AdapTable introduced plugins. 

Plugins are additional groupings of functionality relevant to a particular set of users or usage.

We currently offer 3 plugins (though more will be added in the coming months):

- Finance Plugin

- Charting Plugin

- No Code Plugin

### Using Plugins

To use the AdapTable plugins you need to do the following:

1.  Install the packages you need in npm. So to install charting and finance plugins you would do:

```sh
npm install @adaptabletools/adaptable-plugin-charts
npm install @adaptabletools/adaptable-plugin-finance
```

> You must install the same version of the plugin as you use for the 'core' AdapTable package.  AdapTable will send a warning message to the console if these are different.

2.  Import the plugin(s) in your code when instantiating AdapTable:

```ts
import charts from "@adaptabletools/adaptable-plugin-charts";
import finance from "@adaptabletools/adaptable-plugin-finance";
```

3.  Add the plugins to the plugins property in AdaptableOptions:

```ts
const adaptableOptions: AdaptableOptions = {
  primaryKey: "OrderId",
  adaptableId: "Plugin Demo",
  // call the plugins functions and pass them to plugins array
  plugins: [charts(), finance()],
  .....
}
```

### Finance Plugin

This contains functionality that is of particular interest to financial services users.

It includes specialised Cell Summary operations like 'VWap' and 'Only' and will soon also include specialist financial column formatters.

> AdapTable was initially called the Adaptable Blotter to reflect the fact that its early users were in financial services. However it soon became apparent that the data management functionality on offer was of much wider application to a great many other sectors.  Hence the product was renamed AdapTable and the finance-specific functionality was moved to the finance plugin.

### Chart Plugin

The charting plugin allows you to access the rich AdapTable charting set courtesy of Infragistics.

The charts on offer include:

- Category Charts

- Pie Charts

- Sparkline Charts

- Data Charts

> We have made it a plugin so that those users who don't need charting, or have their own charting libraries, can avoid having to download a package that they will not use.

## Demo

Visit the [Charts Demo](https://demo.adaptableblotter.com/charts) to see AdapTable with the Charts plugin.

Visit the [Cell Summary Demo](https://demo.adaptableblotter.com/gridmanagement/aggridcellsummarydemo) to see AdapTable with the Finance plugin.

## Help

Further information about AdapTable is available at our [Website](www.adaptabletools.com) and our [Help Site](https://adaptabletools.zendesk.com/hc/en-us)

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
