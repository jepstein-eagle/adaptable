# Export (AdaptableFunction)

The Export Function provides a way to send data from AdapTable via 'Reports'.

## How Export Works

AdapTable allows you to create **Reports** which you can then send to multiple destinations.  

There are 3 types of reports you can run:

1. System Reports

2. User Reports

3. Custom Reports

### Reports

Each report essentially contains 2 elements:

1. List of Columns which will be exported
2. Expression that will run when export is triggered and which will evaluate which Rows to include

You can specify for each report / column combination whether to export the **DisplayValue** or **RawValue** of the column's cell values.

### System Reports

AdapTable ships with some predefined reports designed for frequently used exports. These include:

- All Data
- Visible Data
- Selected Cells
- Selected Rows

### User Reports

User can provide at design-time (through [Export State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_exportstate_.exportstate.html)) or at run-time (via the Report Wizard) their own reports.

Each User Report will have its own column definition and row query.
  
### Custom Reports

Custom Reports do not need to include data (or columns) currently present in the grid in the exported data set.

Instead the data in the export is fetched each time the report is run via a function provided in UserFunctions (and referenced in [Export State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_exportstate_.exportstate.html)).

This allows developers to provide their own reports but still to leverage AdapTable state, scheduling and report destinations.

### Export Destinations

A report can be sent to a number of different locations including:

- Excel
- CSV
- Clipboard
- JSON
  
and also - depending on whether the appropriate plugin is loaded:

- ipushpull
- OpenFin

### Schedules

You can schedule your exports to run at at time of your choosing or export manually whenever you want, e.g. you can create an 'End of Day' Report to run every weekeday at 17:00.

## UI Elements

Export includes the following UI Elements:

- **Popup** - Shows all the available Reports (both System and User) together with an option to export to a destination of the User's choice.   Plus an *Add* button to start the Export Wizard.

- **Toolbar** - Shows all the available Reports (both System and User) together with an option to export to a destination of the User's choice.  Also includes a Schedule button to enable reports to be run on Schedules.

- **Tool Panel** - Same as Toolbar above.

## Entitlements

Export supports these Entitlement Rules:

- **Full**: All Reports can be run and User Reports can be created / updated / deleted

- **Hidden**: Reports can be run but not edited

- **ReadOnly**: N/A

## FAQ

**Is the export 'live'  - will it update when the grid data changes?**

No - export is a one time only snapshot.  

However AdapTable does have other Functions which do offer Live Data e.g. ipushpull, Glue42 and OpenFin plugins

**Do you include column names in the exported data?**

Yes, column names are always included in the report.

**Is there an option when just copying to the clipboard to exclude column names?**

Not at present but this feature will be added in future releases.

**Is there a limit on the number of reports that I can create?**

No, reports like all other Adaptable Objects are unlimited.

**Can I export the underlying raw value in the column and not the displayed / formatted one?**

Yes, the `exportColumnRawValue` property in [Export Options](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_exportoptions_.exportoptions.html#exportcolumnrawvalue) allows you to choose for each report / column combination whether to export the Display Value (the default) or the Raw Value.

**Why can I not see the *Excel* destination?**

If you are using ag-Grid then you need to be using either ag-Grid Enterprise or have the 'Excel' module loaded for this option to be available.

**Can I run a Report even though it will display data not in AdapTable?**

Yes, use a *Custom Report*.  Simply provide the function that will called each time the function runs and it can include any data you want.

### Further Information

- [Export State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_exportstate_.exportstate.html)

- [Export Api](https://api.adaptabletools.com/interfaces/_src_api_exportapi_.exportapi.html)

- [Export Demos](https://demo.adaptabletools.com/export)