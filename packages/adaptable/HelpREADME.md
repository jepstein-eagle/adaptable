# Accessing Adaptable through code

There are 3 primary ways that developers / users 'interact' with the code in Adaptable:

- **Setting up** [Adaptable Options](./interfaces/_adaptableOptions_adaptableOptions_.adaptableOptions.html) which are passed to the Adaptable constructor

- **Pre-populating** Adaptable with all the objects it requires at startup through [Predefined Configuration](./interfaces/_predefinedconfig_predefinedconfig_.predefinedconfig.html)

- **Accessing all functionality and state** in Adaptable through code (at runtime) via the [Adaptable API](interfaces/_api_adaptableApi_.adaptableApi.html).

These 3 objects are linked as follows: 
**Predefined Configuration** is a property of **AdaptableOptions** which is passed into the Adaptable constructor that returns the **Adaptable Api**

```tsx
// Create an Adaptable Options object to pass in to the constructor
 const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId', // a unique column
    vendorGrid: gridOptions, // the underlying vendor DataGrid
    predefinedConfig: applicationJSON, // the predefined config we created
  };

  // Adaptable constructor returns an API object that we can use
 const adaptableApi = Adaptable.init(adaptableOptions);
```

## Adaptable Options

You use Adaptable Options to set up Adaptable at design time so that it fits your requirements. There are 2 mandatory properties (_primaryKey_ and _vendorGrid_) and a host of optional ones (including _Predefined Config_ - see below). Where a property is not provided, Adaptable provides a default. The developer documentation lists all the available properties and their default values.

[See Adaptable Options Developer Documentation](./interfaces/_adaptableOptions_adaptableOptions_.adaptableOptions.html)

## Predefined Configuration

You can provide  Adaptable at start-up with _Predefined Configuration_ which ensures that when Adaptable first loads it contains all the bespoke objects that your users will need. This includes *Entitlements*.

[See Predefined Configuration Developer Documentation](./interfaces/_predefinedconfig_predefinedconfig_.predefinedconfig.html)


## Adaptable API

Adaptable API provides full safe, run-time access to all the functionality and state inside Adaptable. This allows you to create, save and delete Adaptable objects in your our screens bypassing Adaptable's UI, or to access the Store in a safe non-mutable manner.

[See Adaptable API Developer Documentation](interfaces/_api_adaptableApi_.adaptableApi.html)


# Additional Resources

You can find further information about Adaptable at these sites:

- [Demo Site](https://demo.adaptableblotter.com)
- [Help Site](https://adaptabletools.zendesk.com/hc/en-us)
- [Web Site](http://www.adaptabletools.com)
