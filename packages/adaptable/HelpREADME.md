# Accessing AdapTable through code

There are 3 primary ways that developers / users 'interact' with the code in AdapTable:

- [AdapTable Options](./interfaces/_adaptableOptions_adaptableOptions_.adaptableOptions.html): **Set up and configure** AdapTable to your requirements

- [Predefined Configuration](./interfaces/_predefinedconfig_predefinedconfig_.predefinedconfig.html): **Pre-populate** your AdapTable instance with the objects required at startup 

- [AdapTable API](interfaces/_api_adaptableApi_.adaptableApi.html): **Access all functionality and state** in AdapTable through code (at runtime) 

These 3 objects are linked as follows: 

**Predefined Configuration** is a property of **AdaptableOptions** which is passed into the AdapTable constructor that returns the **AdaptableApi**

```tsx
// Create an AdaptableOptions object to pass in to the constructor
 const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId', // a unique column
    vendorGrid: gridOptions, // the underlying vendor DataGrid
    predefinedConfig: applicationJSON, // the predefined config we created
  };

// The AdapTable constructor returns an API object that we can use
 const adaptableApi: AdaptableApi = Adaptable.init(adaptableOptions);
```

## AdapTable Options

You use `AdaptableOptions` to set up AdapTable at design time so that it fits your requirements. There are 2 mandatory properties (_primaryKey_ and _vendorGrid_) and a host of optional ones (including _Predefined Config_ - see below). Where a property is not provided, AdapTable provides a default. The developer documentation lists all the available properties and their default values.

[AdapTable Options Developer Documentation](./interfaces/_adaptableOptions_adaptableOptions_.adaptableOptions.html)

## Predefined Configuration

You can provide  AdapTable at start-up with _Predefined Configuration_ which ensures that when AdapTable first loads it contains all the bespoke objects that your users will need. This includes *Entitlements*.

[Predefined Configuration Developer Documentation](./interfaces/_predefinedconfig_predefinedconfig_.predefinedconfig.html)


## AdapTable API

AdapTable's `api` provides full safe, run-time access to all the functionality and state inside AdapTable. This allows you to create, save and delete AdapTable objects in your our screens bypassing AdapTable's UI, or to access the Store in a safe non-mutable manner.

[AdapTable API Developer Documentation](interfaces/_api_adaptableApi_.adaptableApi.html)


# Additional Resources

You can find further information about AdapTable at these sites:

- [Demo Site](https://demo.adaptableblotter.com)
- [Help Site](https://adaptabletools.zendesk.com/hc/en-us)
- [Web Site](http://www.adaptabletools.com)
