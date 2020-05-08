# Application (AdaptableFunction)

The Application ([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `Application`) Function enables Developers to add extra information to the Adaptable State stored as Key / Value pairs.

## Application Data Entries

An `ApplicationDataEntry` is a simple Key / Value pair object.  

The [Application State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_applicationstate_.applicationstate.html) contains an `ApplicationDataEntries` property allowing developers to store as much information as they want for use at run-time.

> The only restriction is that was is stored in the Value can be stringified - as it will be persistd as JSON.

## UI Elements

None

## Entitlements

N/A

## FAQ

**Can we add more Application Entries at run-time?**

Yes, by using the [Application Api](https://api.adaptabletools.com/interfaces/_src_api_applicationapi_.applicationapi.html).

### Further Information

- [Application State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_applicationstate_.applicationstate.html)

- [Application Api](https://api.adaptabletools.com/interfaces/_src_api_applicationapi_.applicationapi.html)

- [Application Demo](https://demo.adaptabletools.com/adaptablestate/aggridapplicationdataentriesdemo)

- [AdapTable State Guide](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-state-guide.md)