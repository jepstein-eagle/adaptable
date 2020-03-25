# AdapTable Server Functionality Guide

AdapTable is a client-side tool and designed to run on the client - either directly in the browser or in related environments like Electron, OpenFin, Finsemble, Glue42 etc.

Out of the box all the functionality in AdapTable will run purely in the client.

However there are frequent cases where our users want to perform some actions on the server.  These include:

- Validation - sometimes its preferable that proposed data edits are externally validated before being 'allowed'

- Look up functions - often users will want to do external lookups (e.g. for Entitlements)

- Searching and Filtering - perhaps the most common request, where users want to perform searches on the server but using AdapTable's rich 'Expression' / Querying capabilities

- Getting Distinct Column Values - many functions (e.g. Column Filters) require a list of distinct column values and these might want to be sourced from a server

- Infinite scrolling - getting new data each time the user scrolls or 'pages'

What AdapTable can do for each of these use cases is detailed below in turn.

### Server Validation

### Server Searching & Filtering

### Getting Distinct Column Values

### Getting Data (infinite scrolling)


## FAQ
To do

## Demos

The following demos all relate to the use cases in this Read Me:

- [Server Lookups](https://demo.adaptabletools.com/lookups/aggridserverlookupsdemo)
- [Server Validation](https://demo.adaptabletools.com/edit/aggridservervalidationdemo)


## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

The other source for Help is our collection of 'Read Me' Docs ([full list here](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/readme-list.md)).

> Previously the main source of AdapTable Help was our [Zendesk Pages](https://adaptabletools.zendesk.com/hc/en-us) but these have been replaced by these 'Read Me' docs and the Developer Documentation that is automatically produced and therefore always up to date.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
