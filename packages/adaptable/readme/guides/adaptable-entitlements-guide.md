# AdapTable Entitlements Guide

AdapTable enables developers to manage permissions, i.e. which Adaptable Functions are available **in the UI** for which users and in which form.

This is done through the `Entitlements` section of Predefined Config (in [Adaptable State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_entitlementstate_.entitlementstate.html)).

## How Entitlements Work

Entitlements operate at the **AdaptableFunction Level**.  

Each Entitlement has 3 potential `AccessLevel` values:

-**Full** - the AdaptableFunction is fully visible and editable

-**Hidden** - the function is completely hidden from the user - it does not appear in any menus, toolbars, tool panels etc.

-**ReadOnly** - the function is visible and preconfigured items can be used but they cannot be edited, nor new ones created.

>ReadOnly is designed for when developers want to let users access the reports or layouts they have pre-configured but not to be allowed to create their own.  As a result it is typically used for AdaptableFunctions which can pre-load objects like 'AdavancedSearch', 'Export', 'ConditionalStyle' etc.

## Default Access Level

By default every AdaptableFunction has the Entitlement of **Full**.  

However this behaviour can be changed through setting the `DefaultAccessLevel` property.  

For instance, it can be set to 'Hidden' and then only AdaptableFunctions explicity permissioned in Entitlements will be available.

> If you set the `DefaultAccessLevel` to 'Hidden' then make sure to enable the Dashboard if you want access to the Toolbars and the Home Dropdown.

## Setting Entitlements

There are 2 ways to provide Entitlements in Predefined Config:

1. **a 'hard-coded' list** provided in the `FunctionEntitlements` property

2. **a function** the name of the function is referenced in Predefined Config and the implementation is provided in the [UserFunctions](https://api.adaptabletools.com/modules/_src_adaptableoptions_userfunctions_.html) section of AdaptableOptions).

  > This function will be called each time an Entitlement is checked allowing developers to store entitlements on a remote permission server that can update in real time.

--------------

### Example: Setting Entitlements via FunctionEntitlements property

 ```ts
 export default {
 Entitlements: {
   FunctionEntitlements: [
     {
       FunctionName: 'ColumnCategory',
       AccessLevel: 'Hidden',
    },
    {
        FunctionName: 'AdvancedSearch',
        AccessLevel: 'Hidden',
      },
      {
        FunctionName: 'Layout',
        AccessLevel: 'ReadOnly',
     },
      {
        FunctionName: 'Export',
        AccessLevel: 'ReadOnly',
     },
    ],
  },
 } as PredefinedConfig;
 ```
 In this example we have set:

 - **2 ReadOnly Entitlements**: Export and Layout.  This means that users can access any existing layouts and reports but cannot add / edit / delete their own.

 - **2 Hidden Entitlements**: Column Category and Advanced Search.  This means that these AdaptableFunctions wont be available in any menus, and nor will any associated Toolbars and Tool Panel elements.

 --------------

### Example: Setting Entitlements via EntitlementLookUpFunction property

```ts
// Predefined Config
export default {
  Entitlements: {
    DefaultAccessLevel: 'Full',
    EntitlementLookUpFunction: 'serverLookUp',
    },
  },
} as PredefinedConfig;


 // Adaptable Options
 const adaptableOptions: AdaptableOptions = {
 ......
  userFunctions: [
     {
        name: 'EntitlementLookUpFunction',
        type: 'serverLookUp',
        handler(functionName: AdaptableFunctionName, userName: string, adaptableId: string) {
          switch (funcName) {
              case 'BulkUpdate':
              case 'CellValidation':
              case 'PlusMinus':
              case 'SmartEdit':
              case 'Shortcut':
                return 'Hidden';

              case 'AdvancedSearch':
              case 'Filter':
              case 'UserFilter':
              case 'DataSource':
              case 'QuickSearch':
                return getPermissionServerResult(funcName, userName, adaptableId);
          }
      },
    ],
 ```

 In this example we have set:

 - All Ediiting-related AdaptableFunctions to be Hidden (e.g. we have a ReadOnly grid)

 - The Searching-related AdaptableFunctions to be permissioned based on the results from an Entitlements Server we call.

 - All other AdaptableFunctions to be 'Full' (as we have not set the `DefaultAccessLevel` property)

## Additional Rules

Some AdapTable Functions require additional conditions for it to be available in addition to setting the Entitlement.  

These are usually supplied in Predefined Config or Adaptable Options.  These include:

- **Team Sharing**: the `enableTeamSharing` property must be set to true in [TeamSharingOptions](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_teamsharingoptions_.teamsharingoptions.html#enableteamsharing)

- **glue42**: the glue42 Predefined Config must contain the glue42 object

- **ipushpull**: the ipushpull Predefined Config must contain the ipushpull object

## Entitlements Scope

Entitlements worka at the **UI Level only**.  This means that AdapTable will ensure that the user cannot see or access - through AdapTable UI elements like menus, toolbars, popups etc. - Functions to which he is not entitled.

However **the Adaptable AApiPI does not take notice of Entitlements**, so anything that is managed programatically through code will ignore the User's entitlements.

> To ensure that the Adaptable Api is not called for functions to which the user has no access, wrap those calls inside relevant EntitlementApi methods e.g. 

```ts
 if (entitlementApi.isFunctionFullEntitlement('Layout')){
   layoutApi.doSomething....
 } 
 ```

## Demos

Visit the [AdapTable Demo Site](https://demo.adaptabletools.com/entitlements) to see a number of entitlement-related demos

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us/articles/360007083017-Help-) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
