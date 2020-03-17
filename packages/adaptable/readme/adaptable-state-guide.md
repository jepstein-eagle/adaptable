# AdapTable State Guide

Managing User State is perhaps the most important and valued set of functionality that AdapTable provides.

> This ReadMe provides an **overview** of the core concepts, and objects, involved in Adaptable State management.  For more detailed information follow the links to the Developer Documentation.

Conceptually Adaptable State comprises 2 distinct elements (which this ReadMe will discuss in turn):

- **Predefined Config** - State created at **design-time** and given to AdapTable so that at first-time use of the application, the user has everything he or she needs to get started.

- **State Management** - Ensuring that all changes made by the user at **run-time** are saved and persisted to an appropriate location so they are available the next time the system runs.

## Predefined Config

To Do

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
