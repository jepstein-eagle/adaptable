# AdapTable Functions Guide

AdapTable ships with 40 **Functions** - each relating to a discrete 'action' or set of functionality.

Most End-User action in AdapTable will be via Functions.

Some Functions will perform an action (e.g. Quick Search, Smart Edit).

Other Functions will

Many Functions contain an array of Objects that users can create, edit or delete (if their Entitlements allow), e.g. AdvancedSearch, ConditionalStyle, PercentBars etc.

### Functions UI

There are a number of different ways in which end-Users will interact with Functions in the AdapTable UI:

- Most Functions have a dedicated **popup screen**.  Functions that contain an array of items (e.g. AdvancedSearch) will typically show these in a table in the popup with buttons to add / edit.  Functions which perform actions (e.g SmartEdit, BulkUpdate) will enable this.

- Some Functions provide **Toolbars** which can be displayed in the Dashboard (via Tabs).  These provide easy access to commonly used Functions e.g. Layouts, Reports, Quick Search.  You are able to stipulate which Toolbars are visible through the Dashboard Function.

- Functions can also provide **ToolPanels** to be hosted in the AdapTable ToolPanel (at the side of the grid). Like toolbars, these provide ready access to common functionality (the same Functions generally provide both).

- Functions which offer objects that can be created / edited / deleted do so via **Function Wizards**.  These provide a step-by-step way to edit the sometimes complex objects that can be created.

- Many Functions also provide Menu Items for both the **Column Menu** (available through clicking a Column Header) and **Context Menu** (available through right-clicking on a grid cell, or group of cells).


| Function  	             | Wizard    | Toolbar  | Tool Panel | Column Menu | Context Menu  |
| --------  	             | ------    | -------  | ---------  | ----------- | ------------  |
| Advanced Search          | [x]       | [x]      | [ ]        | No          | No            |
| Alert                    | <ul><li>[x] item1</li>       | <ul><li>[] item1</li>      | Yes        | No          | Yes      | 
| Bulk Update              | No        | Yes      | Yes        | No          | Yes           | 
| Calculated Column        | Yes       | No       | No         | Yes         | No            | 
| Calendar                 | No        | No       | No         | No          | No            | 
| Cell Summary             | No        | Yes      | Yes        | No          | Yes           | 
| Cell Validation          | Yes       | No       | No         | Yes         | No            | 
| Calendar                 | No        | No       | No         | No          | No            | 






### Entitlements

All Functions are subject to Entitlements.  

This means that end-users will only be able to access a Function according to their permissions.

Each Function can be given an Entitlement of *Full*, *ReadOnly* or *Hidden*. 

See Entitlements State in the Developer Documentation for more information.

### Predefined Config / State

Design-time Users are able to pre-populate AdapTable with Predefined Config - this is the *Adaptable State* that will be available when the application first loads.

There are a huge number of sections in Predefined Config, the majority of which are Function-related.

Nearly every Function has its own section / property in PredefinedConfig, and it will always have the same name.  

For example, you can ship AdapTable with pre-created Custom Sorts for use in the Custom Sort Function through the 'CustomSort' section of Predefined Config.


### Functions List

These are the Functions currently in AdapTable together with relevant UI-related information.

Scroll down for a detailed summary of each Function together with relevant links.


We list here each Function alphabetically.

### Action Column

Stuff here about Action Column

Links to other resources


## Demo

Visit our [Demo Site](https://demo.adaptabletools.com/theme/aggridcustomthemedemo) to see AdapTable with a custom theme.

## Help

Further information about AdapTable is available at our [Website](www.adaptabletools.com) and our [Help Site](https://adaptabletools.zendesk.com/hc/en-us)

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
