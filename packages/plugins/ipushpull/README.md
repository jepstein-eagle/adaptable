# AdapTable ipushpull Plugin Read Me

The ipushpull plugin connects AdapTable with [ipushpull](https://www.ipushpull.com) the market-leading collaborative software.

It allows user to send Reports - either System Reports shipped by AdapTable or those created via the [Export function](../../adaptable/readme/functions/export-function.md) - to ipushpull and from their to Symphony and other destinations.

## ipushpull Options

The ipushpull plugin contains an [ipushpull Plugin Options](../ipushpull/src/index.ts) object which allows users to set up their instance - more to follow...

## UI Elements

ipushpull includes the following UI Elements:

- **Toolbar** - The main way to interact with ipushpull.

## Toolbar Contents

At start-up this simply displays a login button that, when clicked, opens a login screen asking for username and password.

> There is a `AutoLogin` property option which will automatically log the user in to ipushpull (if the correct credentials have been provided in Predefined Config).

### Dropdowns

Once successfully logged in, the Toolbar sees 3 dropdowns.  These are:

1. **Reports Dropdown** - this shows all the Reports that have been created via the [Export function](../../adaptable/readme/functions/export-function.md).
    > This dropdown will also include any System Reports that AdapTable ships by default (e.g. Selected Cells); however these can be removed by setting `IncludeSystemReports` to false

2. **Folders Dropdown** - lists all the folders (aka 'Domains') to which the user has access in ipushpull

3. **Pages Dropdown** - lists all the ipushpull pages in the currently selected Folder (in the Folders Dropdown).

### Buttons

The Toolbar also contains 4 buttons (some are only visible if an ipushpull page has been selected):

1. **Send Snapshot** - this will run the current report and send the data to the currently selected ipushpull page.  This is a **one-off** action.

2. **Run Live Report** - this will run the current report and send the data to the currently selected ipushpull page.  It will also send live updates so as the data in the grid ticks and the report updaes, ipushpull will be updated in real time.
   > The button displays a 'Play' icon; however, when a Live Report is running this changes to a 'Pause' icon.

3. **New ipushpull Page** - alllows the user to create a new ipushpull page in the folder of his choice.

4. **Create Schedule** - enables an ipushpull report to be sent at a schedule of the user's choice
   >This uses the [Schedule function](../../adaptable/readme/functions/schedule-function.md) which enables actions to be performed either at a one off date and time or to be repeated daily at a scheduled time.  

5. **Logout Button** - logs the User out of ipushpull (and displays the login button).

## Entitlements

ipushpull only works if the Function Entitlement for is set to 'Full' and if the ipushpull object has been provided in Predefined Config.  

See the [Entitlement Guide](../../adaptable/readme/guides/adaptable-entitlements-guide.md) for more information.

## FAQ

**Do we need to be an existing ipushpull User to use this?**

Yes. We provide this functionality only for existing ipushpull users.

You will need to provide your username and password in the Login Control.

**How do I provide my ipushpull Credentials?**

As part of ipushpull State. You must inject the ipushpull instance into AdapTable. (This allows us to reduce the size of the bundle so that we only ship core dependencies).

**Can I create a new ipushpull page in AdapTable?**

Yes, you can. This functionality was added in Version 6 (January, 2020).


### Further Information

- [ipushpull Api](https://api.adaptabletools.com/interfaces/_src_api_ipushpullapi_.ipushpullapi.html)

- [ipushpull Demo](https://demo.adaptabletools.com/partners/ipushpulldemo)

- [ipushpull Example App](https://github.com/AdaptableTools/example-adaptable-ipushpull-integration)


## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us/articles/360007083017-Help-) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).