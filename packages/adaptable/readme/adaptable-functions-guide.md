# AdapTable Functions Guide

AdapTable ships with 40 **AdaptableFunctions** - each relating to a discrete 'action' or set of functionality.

Most End-User action in AdapTable will be via AdaptableFunctions.

Many AdaptableFunctions contain an array of Objects that users can create, edit or delete (if their Entitlements allow), e.g. AdvancedSearch, ConditionalStyle, PercentBars etc.

### Functions UI

There are a number of different ways in which end-Users will interact with AdaptableFunctions in the AdapTable UI:

- Most AdaptableFunctions have a dedicated **popup screen**.  AdaptableFunctions that contain an array of items (e.g. AdvancedSearch) will typically display these in a table with buttons to add / edit.  AdaptableFunctions which perform actions (e.g SmartEdit, BulkUpdate) will contain UI controls to allow the AdaptableFunction to be used.

- Some AdaptableFunctions provide **Toolbars** which can be displayed in the Dashboard (via Tabs).  These provide easy access to commonly used AdaptableFunctions e.g. Layouts, Reports, Quick Search.  You are able to stipulate which Toolbars are visible through the *Dashboard* AdaptableFunction.

- AdaptableFunctions can also provide **ToolPanels** to be hosted in the AdapTable ToolPanel (at the side of the grid). Like toolbars, these provide ready access to common functionality (the same AdaptableFunctions generally provide both).

- AdaptableFunctions which offer objects that can be created / edited / deleted do so via **AdaptableFunction Wizards**.  These provide a step-by-step way to edit the sometimes complex objects that can be created.

- Many AdaptableFunctions also provide Menu Items for both the **Column Menu** (available through clicking a Column Header) and **Context Menu** (available through right-clicking on a grid cell, or group of cells).

This table lists all the AdaptableFunctions and which UI elements they support.

Click on a link to go to a dedicated ReadMe for that AdaptableFunction.

| AdaptableFunction  	                                         | Wizard | Toolbar | Tool Panel | Column Menu | Context Menu |
| --------  	                                                 | ------ | ------- | ---------  | ----------- | ------------ |
| [AdvancedSearch](./Functions/adavanced_search_function.md)     | Yes    | Yes     | Yes        | No          | No           |
| [Alert](./Functions/alert_function.md)                         | Yes    | Yes     | Yes        | No          | Yes          | 
| [BulkUpdate](./Functions/bulk_update_function.md)              | No     | Yes     | Yes        | No          | Yes          | 
| [CalculatedColumn](./Functions/calculated_column_function.md)  | Yes    | No      | No         | Yes         | No           | 
| Calendar                                                       | No     | No      | No         | No          | No           | 
| [CellSummary](./Functions/cell_summary_function.md)            | No     | Yes     | Yes        | No          | Yes          | 
| [CellValidation](./Functions/cell_validation_function.md)      | Yes    | No      | No         | Yes         | No           | 
| [ColumnCategory](./Functions/column_category_function.md)      | No     | No      | No         | No          | No           | 
| [ColumnChooser](./Functions/column_chooser_function.md)        | No     | No      | No         | Yes         | Yes          | 
| Column Filter            | No        | Yes      | Yes        | Yes         | Yes           | 
| Column Info              | No        | No       | No         | Yes         | Yes           | 
| Conditional Style        | Yes       | No       | No         | Yes         | No            | 
| Custom Sort              | Yes       | No       | No         | Yes         | No            | 
| Dashboard                | No        | No       | No         | Yes         | No            | 
| Data Source              | Yes       | Yes      | Yes        | No          | No            | 
| Export                   | Yes       | Yes      | Yes        | No          | No            | 
| Flashing Cell            | No        | No       | No         | Yes         | No            | 
| Format Column            | Yes       | No       | No         | Yes         | No            | 
| Free Text                | Yes       | No       | No         | Yes         | No            | 
| Glue42                   | No        | Yes      | Yes        | No          | No            |
| Gradient Column          | Yes       | No       | No         | Yes         | Yes           |
| Grid Info                | No        | No       | No         | Yes         | Yes           |
| Layout                   | Yes       | Yes      | Yes        | No          | No            |
| Percent Bar              | Yes       | No       | No         | Yes         | Yes           |
| Plus Minus               | Yes       | No       | No         | Yes         | No            |
| PushPull                 | No        | Yes      | Yes        | No          | No            |
| Quick Search             | No        | Yes      | Yes        | No          | No            |
| Reminder                 | No        | No       | No         | No          | No            |
| Schedule                 | Yes       | No       | No         | No          | No            |
| Shortcut                 | Yes       | No       | No         | No          | No            |
| Smart Edit               | No        | Yes      | Yes        | No          | Yes           |
| System Status            | No        | Yes      | Yes        | Yes         | Yes           |
| Team Sharing             | No        | No       | No         | No          | No            |
| Theme                    | No        | Yes      | Yes        | No          | No            |
| Updated Row              | No        | No       | No         | Yes         | Yes           |
| User Filter              | Yes       | No       | No         | Yes         | No            |

#### Chart AdaptableFunctions (plugin)

| AdaptableFunction        | Wizard    | Toolbar  | Tool Panel | Column Menu | Context Menu  |
| --------  	             | ------    | -------  | ---------  | ----------- | ------------  |
| Chart                    | Yes       | Yes      | Yes        | No          | No            |
| Pie Chart (View As)      | No        | No       | No         | Yes         | Yes           |
| Sparkline (View As)      | No        | No       | No         | Yes         | Yes           |
| Sparkline Column         | No        | No       | No         | Yes         | Yes           |


### Entitlements

All AdaptableFunctions are subject to Entitlements.  

This means that end-users will only be able to access a AdaptableFunction according to their permissions.

Each AdaptableFunction can be given an Entitlement of *Full*, *ReadOnly* or *Hidden*. 

See Entitlements State in the Developer Documentation for more information.

### Predefined Config / State

Design-time Users are able to pre-populate AdapTable with Predefined Config - this is the *Adaptable State* that will be available when the application first loads.

There are a huge number of sections in Predefined Config, the majority of which are AdaptableFunction-related.

Nearly every AdaptableFunctions has its own section / property in PredefinedConfig, and it will always have the same name.  

For example, you can ship AdapTable with pre-created Custom Sorts for use in the Custom Sort AdaptableFunction through the 'CustomSort' section of Predefined Config.


## Demo

Visit our [Demo Site](https://demo.adaptabletools.com) to see many of the AdaptableFunctions in AdapTable in action.

## Help

Further information about AdapTable is available at our [Website](www.adaptabletools.com) and our [Help Site](https://adaptabletools.zendesk.com/hc/en-us)

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
