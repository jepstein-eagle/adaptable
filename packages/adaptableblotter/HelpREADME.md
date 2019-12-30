# Accessing Adaptable through code

There are 3 primary ways that developers / users 'interact' with the code in the Adaptable:

- **Setting up** the Adaptable through configuring [Blotter Options](./interfaces/_adaptableOptions_adaptableOptions_.adaptableOptions.html) which are passed in to the Adaptable instance when constructed.

- **Pre-populating** the Adaptable with the objects it requires at startup with all the objects it requires through writing [Predefined Configuration](./interfaces/_predefinedconfig_predefinedconfig_.predefinedconfig.html)

- **Accessing all the functionality and state** in the Adaptable through code (at runtime) via the [Adaptable API](interfaces/_api_adaptableApi_.adaptableApi.html).

These 3 objects are linked as follows: 
**Predefined Configuration** is a property of **adaptableOptions** which is passed into the Adaptable constructor, that returns the **Blotter Api**

```tsx
// Create an Adaptable Options object to pass in to the constructor
 const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId', // a unique column
    vendorGrid: gridOptions, // the underlying vendor DataGrid
    predefinedConfig: predefinedConfig, // the predefined config we created
  };

  // the Adaptable constructor returns an API object that we can use
 const adaptableApi = Adaptable.init(adaptableOptions);
```

## Blotter Options

You use the Blotter Options to set up the Adaptabble Blotter at design time so that it fits your requirements. There are 2 mandatory properties (_primaryKey_ and _vendorGrid_) and a host of optional ones (including _Predefined Config_ - see below). Where a property is not provided, the Adaptable provides a default. The code documentation lists all the available properties and their default values.

[See Blotter Options Code](./interfaces/_adaptableOptions_adaptableOptions_.adaptableOptions.html)

## Predefined Configuration

You can provide the Adaptable at start-up with _Predefined Configuration_ which ensures that when the Blotter first loads it contains all the objects that users need. This includes *Entitlements*.

[See Predefined Configuration Code](./interfaces/_predefinedconfig_predefinedconfig_.predefinedconfig.html)


## Blotter API

The Adaptable API provides full safe, run-time access - through code - to all the functionality and state of the Adaptable. This allows you to create, save and delete Adaptable objects in your our screens bypassing the Blotter's UI, or to access the Store in a safe non-mutable manner.

[See Adaptable API Code](interfaces/_api_adaptableApi_.adaptableApi.html)


# Additional Resources

You can find further information about the Adaptable at these sites:

- [Demo Site](https://demo.adaptableblotter.com)
- [Help Site](https://adaptabletools.zendesk.com/hc/en-us)
- [Web Site](http://www.adaptabletools.com)
