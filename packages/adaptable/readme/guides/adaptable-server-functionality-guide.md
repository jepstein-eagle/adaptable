# AdapTable Server Functionality Guide

AdapTable is a client-side tool and designed to run on the client - either directly in the browser or in related environments like Electron, OpenFin, Finsemble, Glue42 etc.

Out of the box all the functionality in AdapTable will run purely in the client.

However there are frequent cases where our users want to perform some actions on the server.  These include:

- **Validation** - sometimes its preferable that proposed data edits are externally validated before being 'allowed'

- **Look up functions** - often users will want to do external lookups (e.g. for Entitlements)

- **Searching and Filtering** - perhaps the most common request, where users want to perform searches on the server but using AdapTable's rich 'Expression' / Querying capabilities

- **Getting Distinct Column Values** - many functions (e.g. Column Filters) require a list of distinct column values and these might want to be sourced from a server

- **Infinite scrolling** - getting new data each time the user scrolls or 'pages'

What AdapTable can do for each of these use cases is detailed below in turn.

## Server Validation
AdapTable provides a powerful [Cell Validation](../functions/cell-validation-function.md) function which allows for the creation of Validation Rules that run each time a propsosed edit is made and disallow those which break a rule.

But sometimes users require more sophisticated rules that run on the Server that contain complicated calculated or external lookups.

To facilitate this aaa offers Server Validation functionality that works as follows:

In the [Edit Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_editoptions_.editoptions.html) of Adaptable Options developers supply a function that  will run each time a cell is edited.  The function returns a Promise containing a `ValidationResult`. 

This includes a return value which can be:

- nothing (either the edit works - or you want to 'swallow' it)
- the old value (validation failed) 
- a differnt value altogether (in advanced scenarios). 
    
The Promise can additionally include an optional Validation Message which, if present, will be displayed to the user.

### Server Validation Example

In this (slightly contrived) example the logic is that for the 'Amount' column any edit > 100 will return 100, any edit < 20 will return 20 and if edit is 50 its rejected.

> Any edits that dont break those rules - or which are not for the 'amount' column - we ignore (so they will be processed normally)

```ts
adaptableOptions.editOptions = {
    validateOnServer: (dataChangedInfo: DataChangedInfo) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(getServerEditResponse(dataChangedInfo)), 2000);
      });
    },
  };

--------------------

function getServerEditResponse(dataChangedInfo: DataChangedInfo): ValidationResult {
 if (dataChangedInfo.ColumnId == 'amount') {
   if (dataChangedInfo.NewValue == 50) {
    return {
      NewValue: dataChangedInfo.OldValue,
       ValidationMessage: 'Cannot set amount to 50',
     };
   } else if (dataChangedInfo.NewValue > 100) {
     return {
       NewValue: 100,
       ValidationMessage: 'Amount cannot be greater than 100',
     };
   } else if (dataChangedInfo.NewValue < 20) {
     return {
       NewValue: 20,
       ValidationMessage: 'Amount cannot  be less than  20',
     };
   }
 }
return {};
}

 ```


## Server Searching & Filtering

## Getting Distinct Column Values

## Getting Data (infinite scrolling)


## FAQ
To do

## Demos

The following demos all relate to the use cases in this Read Me:

- [Server Validation](https://demo.adaptabletools.com/edit/aggridservervalidationdemo)
- [Server Lookups](https://demo.adaptabletools.com/lookups/aggridserverlookupsdemo)


## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
