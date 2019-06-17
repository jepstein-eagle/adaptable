# Adaptable Blotter Code Docs

Read me for the Adaptable Blotter Code Documentation.

There are 3 main ways that developers / users 'interact' with the code in the Adaptable Blotter:

- Setting **Blotter Options** when first instantianting the Adaptable Blotter

- Providing the Adaptable Blotter at startup with **Predefined Configuration**

- Using the **Blotter API** (at runtime) which gives full access to all the Adaptable Blotter functionality and state through code.

## Blotter Options

[Blotter Options Code](./interfaces/_blotteroptions_adaptableblotteroptions_.adaptableblotteroptions.html)

You use the Blotter Options to set up the Adaptabble Blotter at design time so that it fits your requirements. There are 2 mandatory properties (_primaryKey_ and _vendorGrid_) and a host of optional ones. Where a property is not provided, the Adaptable Blotter provides a default. The code documentation lists all the available properties and their default values.

## Predefined Configuration

[Predefined Configuration Code](./interfaces/_predefinedconfig_predefinedconfig_.predefinedconfig.html)

You can provide the Adaptable Blotter at start-up with _Predefined Configuration_ which ensures that when the Blotter first loads it contains all the objects that users need. This includes entitlements.

## Blotter API

[Adaptable Blotter API Code](interfaces/_api_interface_iblotterapi_.iblotterapi.html)

The Adaptable Blotter API provides full safe, run-time access - through code - to all the functionality and state of the Adaptable Blotter. This allows you to create, save and delete Adaptable Blotter objects in your our screens bypassing the Blotter's UI, or to access the Store in a safe non-mutable manner.

# Additional Help Resources

list them here.
