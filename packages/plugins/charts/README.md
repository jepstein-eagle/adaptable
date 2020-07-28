# AdapTable Charts Plugin

Charting in AdapTable is provided courtesy of the [Infragistics Charting Library](https://www.infragistics.com/products/ignite-ui-react/react/components/category-chart.html).  

Charts can be provided either at design-time through Predefined Config or built at run-time.

There are a huge number of options available when creating charts and all charts are automatically persisted as part of Adaptable State.

Charts are 'live' so they will update in real time as the underlying data changes.

## Chart Types

The currently available Charts are:

- Category Charts

- Pie / Doughnut Charts

- Sparkline Charts

- Financial Charts

- Data Charts

In addition AdapTable provides 2 Chart-based Column-related Functions:

- Sparkline Column

- Pie Chart Column

## Using the Charts Plugin

To use the AdapTable plugins you need to do the following:

1. Install the package you need in npm:

  ```sh
  npm install @adaptabletools/adaptable-plugin-charts
   ```

  > You must install the same version of the Plugin as you use for the 'core' AdapTable package.  AdapTable will send a warning message to the console if these are different

2. Import the Plugin in your code when instantiating AdapTable:

  ```ts
  import charts from "@adaptabletools/adaptable-plugin-charts";
  ```

3. Add the Plugin to the plugins property in AdaptableOptions:

```ts
const adaptableOptions: AdaptableOptions = {
  primaryKey: "OrderId",
  adaptableId: "Plugin Demo",
  // call the plugins functions and pass them to plugins array
  plugins: [charts()],
  .....
}
```

## Demo

Visit the [Charts Demos](https://demo.adaptabletools.com/charts) to see AdapTable running with the Charts plugin.

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us/articles/360007083017-Help-) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
