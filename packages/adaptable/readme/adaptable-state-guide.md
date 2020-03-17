# AdapTable State Guide

Managing User State is perhaps the most important and valued set of functionality that AdapTable provides.

> This ReadMe provides an **overview** of the core concepts, and objects, involved in Adaptable State management.  For more detailed information follow the links to the Developer Documentation.

Conceptually Adaptable State comprises 2 distinct elements:

- **Predefined Config** - State created at **design-time** and given to AdapTable so that at first-time use of the application, the user has everything he or she needs to get started.

- **State Management** - Ensuring that all changes made by the user at **run-time** are saved and persisted to an appropriate location so they are available the next time the system runs.

## Predefined Config

Typically you will want to "pre-populate" your deployed application with Predefined Config - i.e. the initial state that AdapTable will use when it first loads up.

This ensures that users wont see an empty AdapTable instance but, rather, one full of reports, searches, conditional styles etc that allow them to be productive immediately.


### Predefined Config Contents

Predefined Config consists of a series of (nullable) properties that themselves each implement Config State (e.g. `AdvancedSearch`, `Layouts` etc.

Users only need to provide config for those properties which they want intial state; within each object every object is nullable (with default values) so only those elements which differ from the default implementation need to be provided.

> To prevent users from editing the Adaptable Objects shipped in PredefinedConfig, set the Entitlement for that function to `ReadOnly`.

### How Predefined Config Works
Predefined Config is written at design-time in JSON format.  

It is passed into AdapTable via `predefinedConfig` property in adaptableOptions. 

It can be passed in either as pure JSON or as a url to a file which contains the JSON.

When AdapTable is first loaded, any predefined config (see below) is read into memory and then stored (either locally or remotely - depending on your settings) together with any user state that is created during that session.

Subsequently, each time the application is launched, that User State is retrieved (either from local storage or remote storage) and the particular AdapTable instance is pre-populated with it. 

It is read once and merged into the user's Adaptable State, and then any run-time changes which users make will form part of their State and be continually updated.

> Although you can construct all your config by hand, its often easier when building more "complex" items like Queries to create them in the GUI at design time and then copy and paste the resulting state into your config file.

### Creating Functions

Many objects in AdapTable (e.g. Custom Sorts, User Menus, Action Columns etc.) include 'functions' that developers can provide when it makes sense to use a custom implementation rather than one provided by AdapTable.

But this provides a problem for Predefined Config, because it is stored as JSON which means it can only contain elements which can be 'stringified' (and that excludes functions).

The solution is that Predefined Config contains a named reference to the function but the actual implementation is elsewhere (in the UserFunctions section of AdaptableOptions).

### Revision Property

The concept behind Predefined Config is that it provides - at design-time - the objects, entitlements and theme for initial use of the Application.  


But sometimes developers might want to update a section in Predefined Config while ensuring that the rest of the user's State remains untouched.

This can be accomplished through the Revision property in Config State (the base interface for all User State sections).

Simply put: if you increment (or provide from new) the revision number in a section of Predefined Config, AdapTable will replace that section (but only that section) in the user's State with the new Config.

This is, currently, replace only, so you cannot use Revisions to merge a new Layout section in Predefined Config with the user's Layouts in State.

But you can, for example, provide a new CustomSort section in Predefined Config which will replace the user's Custom Sorts in State while keeping their Layouts and other state elements untouched (see example below).

AdaptableObject

Most objects in PredefinedConfig implement the AdaptableObject interface.

This has a single Uuid property which is used for easy identification of objects and to make it easy for AdapTable instances to share state and inform each other when an item has been created / edited / deleted..

This is included by AdapTable in all base objects and also frequently used objects like Expressions.

Do not set this property when writing objects in your Predefined Config as it will be set by AdapTable at run-tine when the config is first read

Bespoke State

The Application State property of Predefined Config contains an ApplicationDataEntries array.

This is essentially a set of key / value pairs that you can populate with any data that you want and which AdapTable will store in its state.

## State Management

To Do

## Demos

Visit the [AdapTable Demo Site](https://demo.adaptabletools.com/adaptablestate) to see a number of state-related demos

## Help

Further information about AdapTable is available at our [Website](www.adaptabletools.com) and our [Help Site](https://adaptabletools.zendesk.com/hc/en-us)


Where is configuration stored?

By default its stored in the local browser cache. However if the enableConfigServer property is set to true during installation you can choose to store in a different location which is more convenient for you.

Do you provide data adapters to fetch / save configuration?

No we don't, you will need to provide the mechanism to store configuration in a remote location.

Can I preconfigure my AdapTable instance?

Yes you can. You are able to build your own Adaptable Objects which are stored as Predefined Config. You are able to provide this configuration as a JSON object or as a URL (to a .JSON file).

Can I provide different configuration per user?

Yes, that is possible and expected.  AdapTable allows you provide highly configurable and personalised instances.

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
