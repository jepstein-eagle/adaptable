# AdapTable ipushpull Plugin Read Me

The ipushpull plugin connects AdapTable with [ipushpull](https://www.ipushpull.com) the market-leading collaborative software.

It allows user to send Reports - either System Reports shipped by AdapTable or those created via the [Export function](../../adaptable/readme/functions/export-function.md) - to ipushpull and from their to Symphony and other destinations.

## Version 7 
Version 7 of AdapTable made significant changes to how ipushpull is set up, primarily by using this dedicated plugin.

As a consequence, the ipushpull section from Predefined Config was removed and no ipushpull information is provided by users that way.

Similarly all ipushpull state is now transient and **not persisted** when the application ends.

Instead we now use the `ipushpullPluginOptions` object in a similar way to other plugins. 

The actual ipushpull functionality is unchanged, and the information required to be supplied by the user is identical but it now done through Options and not Predefined Config - isolating it in this way enables us to add more ipushpull-related functionality in a much quicker and safer way, isolated from the rest of the application.

## ipushpull Options

The ipushpull plugin contains an [ipushpull Plugin Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_ipushpullpluginoptions_.ipushpullpluginoptions.html) object which allows users to set up their instance.

It contains credential details, useful properties (e.g. `throttleTime`, `autoLogin` etc.) and the ipupshpull config object.

## ipushpull Api

The [ipushpull Api](https://api.adaptabletools.com/interfaces/_src_api_ipushpullapi_.ipushpullapi.html) is available for full runtime programmatic access to ipushpull objects and methods.

> Note: because ipushpull is a plugin, you can get hold of this object through the `getPluginApi` method of [pluginsApi](https://api.adaptabletools.com/interfaces/_src_api_pluginsapi_.pluginsapi.html).

## ipushpull Setup Example
 
  ```ts
  
  // set up AdaptableOptions
  const adaptableOptions: AdaptableOptions = {
     ******
      plugins: [
        ipp({
          username: process.env.IPUSHPULL_USERNAME,
          password: process.env.IPUSHPULL_PASSWORD,
          throttleTime: 5000,
          includeSystemReports: true,
          ippConfig: {
             api_secret: process.env.IPUSHPULL_API_KEY,
             api_key: process.env.IPUSHPULL_API_KEY,
             api_url: 'https://www.ipushpull.com/api/1.0',
             ws_url: 'https://www.ipushpull.com',
             web_url: 'https://www.ipushpull.com',
             docs_url: 'https://docs.ipushpull.com',
             storage_prefix: 'ipp_local',
             transport: 'polling',
             hsts: false, // strict cors policy
         },
       }),
     ],
    ******
   };
   
  // Instantitate AdapTable and get the main Api object 
  adaptableApi = await Adaptable.init(adaptableOptions);
  
  // use the plugins api to get the IPushPullApi object
  const ipushpullApi: IPushPullApi = adaptableApi.pluginsApi.getPluginApi(
    'ipushpull'
  );
  
 ```

## ipushpull Toolbar

The ipushpull plugin includes a dedicated ipushpull Toolbar - the main way to interact with ipushpull inside AdapTable.

At start-up this simply displays a login button that, when clicked, opens a login screen asking for username and password.

> There is a `AutoLogin` property option which will automatically log the user in to ipushpull (if the correct credentials have been provided in ipushpull Plugin Options).

Once the user is successfully logged in, the Toolbar will contain a number of elements (primarily dropdowns and buttons). These include:

### Dropdowns

1. **Reports Dropdown** - this shows all the Reports that have been created via the [Export function](../../adaptable/readme/functions/export-function.md).
    > This dropdown will also include any System Reports that AdapTable ships by default (e.g. Selected Cells); however these can be removed by setting `IncludeSystemReports` to false

2. **Folders Dropdown** - lists all the folders (aka 'Domains') to which the user has access in ipushpull

3. **Pages Dropdown** - lists all the ipushpull pages in the currently selected Folder (in the Folders Dropdown).

### Buttons

1. **Send Snapshot** - this will run the current report and send the data to the currently selected ipushpull page.  This is a **one-off** action.

2. **Run Live Report** - this will run the current report and send the data to the currently selected ipushpull page.  It will also send live updates so as the data in the grid ticks and the report updaes, ipushpull will be updated in real time.
   > The button displays a 'Play' icon; however, when a Live Report is running this changes to a 'Pause' icon.

3. **New ipushpull Page** - alllows the user to create a new ipushpull page in the folder of his choice.

4. **Create Schedule** - enables an ipushpull report to be sent at a schedule of the user's choice
   >This uses the [Schedule function](../../adaptable/readme/functions/schedule-function.md) which enables actions to be performed either at a one off date and time or to be repeated daily at a scheduled time.  

5. **Logout Button** - logs the User out of ipushpull (and displays the login button).

## Entitlements

ipushpull only works if the Function Entitlement for is set to 'Full' and if this plugin has been injected into Adaptable Options.  

See the [Entitlement Guide](../../adaptable/readme/guides/adaptable-entitlements-guide.md) for more information.

## FAQ

**Do we need to be an existing ipushpull User to use this?**

Yes. We provide this functionality only for existing ipushpull users.

You will need to provide your username and password in the Login Control.

**How do I provide my ipushpull Credentials?**

As part of ipushpull Plugin Options.

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
