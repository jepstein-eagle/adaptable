# Accessing Adaptable Blotter through code

There are 3 main ways that developers / users 'interact' with the code in the Adaptable Blotter:

- **Setting up** the Adaptable Blotter through configuring [Blotter Options](./interfaces/_blotteroptions_adaptableblotteroptions_.adaptableblotteroptions.html) which are passed in to the Adaptable Blotter implementation

- **Pre-populating** the Adaptable Blotter with the objects it requires at startup with all the objects it requires through writing [Predefined Configuration](./interfaces/_predefinedconfig_predefinedconfig_.predefinedconfig.html)

- **Accessing all the functionality and state** in the Adaptable Blotter through code (at runtime) via the [Adaptable Blotter API](interfaces/_api_blotterapi_.blotterapi.html).


## Blotter Options

You use the Blotter Options to set up the Adaptabble Blotter at design time so that it fits your requirements. There are 2 mandatory properties (_primaryKey_ and _vendorGrid_) and a host of optional ones (including _Predefined Config_ - see below). Where a property is not provided, the Adaptable Blotter provides a default. The code documentation lists all the available properties and their default values.

[See Blotter Options Code](./interfaces/_blotteroptions_adaptableblotteroptions_.adaptableblotteroptions.html)

## Predefined Configuration

You can provide the Adaptable Blotter at start-up with _Predefined Configuration_ which ensures that when the Blotter first loads it contains all the objects that users need. This includes entitlements.

[See Predefined Configuration Code](./interfaces/_predefinedconfig_predefinedconfig_.predefinedconfig.html)


## Blotter API

The Adaptable Blotter API provides full safe, run-time access - through code - to all the functionality and state of the Adaptable Blotter. This allows you to create, save and delete Adaptable Blotter objects in your our screens bypassing the Blotter's UI, or to access the Store in a safe non-mutable manner.

[See Adaptable Blotter API Code](interfaces/_api_blotterapi_.blotterapi.html)


# Additional Resources

You can find further information about the Adaptable Blotter at these sites:

- [Demo Site](https://demo.adaptableblotter.com)
- [Help Site](https://adaptabletools.zendesk.com/hc/en-us)
- [Web Site](http://www.adaptabletools.com)
