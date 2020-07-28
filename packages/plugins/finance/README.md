# AdapTable Finance Plugin

AdapTable is data-agnostic and designed to appeal to users in any sector or industry.

However its genesis is in the financial services industry and many of its users work in the financial sector.

Accordingly, the Finance Plugin was developed in order to keep the core product 'sector-neutral' while providing useful functionality for financial services clients through a dedicated plugin.

For instance, it includes specialised Cell Summary operations useful for Financial Services like *Weighted Average*, *Only* and *VWap*.

## Using the Financial Plugin

To use the Financial Plugin you need to do the following:

1. Install the package in npm:

  ```sh
  npm install @adaptabletools/adaptable-plugin-finance
  ```

  > You must install the same version of the Finance Plugin as you use for the 'core' AdapTable package.  AdapTable will send a warning message to the console if these are different

2. Import the Plugin in your code when instantiating AdapTable:

  ```ts
  import finance from "@adaptabletools/adaptable-plugin-finance";
   ```

3. Add the plugins to the plugins property in AdaptableOptions:

```ts
const adaptableOptions: AdaptableOptions = {
  primaryKey: "OrderId",
  adaptableId: "Plugin Demo",
  plugins: [finance()],
  .....
}
```

## Demo

Visit the [Cell Summary Demo](https://demo.adaptabletools.com/gridmanagement/aggridcellsummarydemo) to see AdapTable with the Finance plugin.

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us/articles/360007083017-Help-) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
