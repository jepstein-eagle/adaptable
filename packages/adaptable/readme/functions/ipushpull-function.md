# ipushpull (AdaptableFunction)

The ipushpull([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `ipushpull`) Function connects with [ipushpull](https://www.ipushpull.com).

## UI Elements
ipushpull includes the following UI Elements:

- **Toolbar** - The main way to interact with ipushpull. Includes a login button that opens a login screen asking for username and password. 

If successfully logged in, the user sees a list of folders and pages and available reports.  There are also 2 'action buttons':

1. to send either a one-off 'snapshot' reports
2. to send a live report which will send automatic updates as the data in the report changes

## Entitlements
ipushpull only works if the Functino Entitlement for is set to 'Full' and if the ipushpull object has been provided in Predefined Config.

## FAQ

**Do we need to be an existing ipushpull User to use this?**

Yes. We provide this functionality only for existing ipushpull users.

You will need to provide your username and password in the Login Control.

**How do I provide my ipushpull Credentials?**

As part of ipushpull State. You must inject the ipushpull instance into AdapTable. (This allows us to reduce the size of the bundle so that we only ship core dependencies).

**Can I create a new ipushpull page in AdapTable?**

Yes, you can. This functionality was added in Version 6 (January, 2020).


### Further Information

- [ipushpull State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_ipushpullstate_.ipushpullstate.html)

- [ipushpull Api](https://api.adaptabletools.com/interfaces/_src_api_ipushpullapi_.ipushpullapi.html)

- [ipushpull Demo](https://demo.adaptabletools.com/partners/ipushpulldemo)

- [ipushpull Example App](https://github.com/AdaptableTools/example-adaptable-ipushpull-integration)

