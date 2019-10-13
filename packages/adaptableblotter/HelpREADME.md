# Accessing Adaptable Blotter through code

There are 4 main ways that developers / users 'interact' with the code in the Adaptable Blotter:

- Implementing one of the **Blotter Interfaces** when instantianting the Adaptable Blotter

- Setting **Blotter Options** which are then passed in to the Adaptable Blotter implementation

- Providing the Adaptable Blotter at startup with **Predefined Configuration**

- Using the **Blotter API** (at runtime) which gives full access to all the Adaptable Blotter functionality and state through code.

## Blotter Instantiation

There are 2 ways to instantiate a new Adaptable Blotter:

- **By creating an Adaptable Blotter directly** by implementing the IAdaptableBlotter Interface which will return an AdaptableBlotter object suitable for whichever vendor grid you have chosen to use (and previously created yourself).

[See IAdaptableBlotter Interface](https://api.adaptableblotter.com/interfaces/_blotterinterfaces_iadaptableblotter_.iadaptableblotter.html)

- **By using the Adaptable Blotter Wizard** which will accept a JSON file via drag and drop and then create dynamically both the Adaptable Blotter instance and the underlying vendor grid instance.

[See IAdaptableBlotterWizard Interface](https://api.adaptableblotter.com/interfaces/_blotterinterfaces_iadaptableblotterwizard_.iadaptableblotterwizard.html)


## Blotter Options

You use the Blotter Options to set up the Adaptabble Blotter at design time so that it fits your requirements. There are 2 mandatory properties (_primaryKey_ and _vendorGrid_) and a host of optional ones (including _Predefined Config_ - see below). Where a property is not provided, the Adaptable Blotter provides a default. The code documentation lists all the available properties and their default values.

[See Blotter Options Code](./interfaces/_blotteroptions_adaptableblotteroptions_.adaptableblotteroptions.html)

## Predefined Configuration

You can provide the Adaptable Blotter at start-up with _Predefined Configuration_ which ensures that when the Blotter first loads it contains all the objects that users need. This includes entitlements.

[See Predefined Configuration Code](./interfaces/_predefinedconfig_predefinedconfig_.predefinedconfig.html)


## Blotter API

The Adaptable Blotter API provides full safe, run-time access - through code - to all the functionality and state of the Adaptable Blotter. This allows you to create, save and delete Adaptable Blotter objects in your our screens bypassing the Blotter's UI, or to access the Store in a safe non-mutable manner.

[See Adaptable Blotter API Code](interfaces/_api_interface_iblotterapi_.iblotterapi.html)


# Additional Resources

You can find further information about the Adaptable Blotter at these sites:

- [Demo Site](https://demo.adaptableblotter.com)
- [Help Site](https://adaptabletools.zendesk.com/hc/en-us)
- [Web Site](http://www.adaptabletools.com)
