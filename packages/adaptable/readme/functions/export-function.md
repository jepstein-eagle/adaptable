# Export (AdaptableFunction)

The Export([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `Export`) Function provides a way to send data from AdapTable via 'Reports'.

## How Export Works

AdapTable allows you to create **Reports** which you can then send to multiple destinations.  

### Reports

Each report essentially contains 2 elements:

1. List of Columns which will be exported
2. Expression that will run when export is triggered and which will evaluate which Rows to include

You can specify for each report / column combination whether to export the **DisplayValue** or **RawValue** of the column's cell values.

> You can schedule your exports to run at at time of your choosing or export manually whenever you want, e.g. you can create an 'End of Day' Report to run every weekeday at 17:00.

#### System Reports

AdapTable ships with some predefined reports designed for frequently used exports. These include:

- All Data
- Visible Data
- Selected Cells
- Selected Rows

### Export Destinations

A report can be sent to a number of different locations including:

- Excel
- CSV
- Clipboard
- JSON
  
and also - depending on whether the appropriate plugin is loaded:

- ipushpull
- OpenFin
- Glue42

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

Yes, the `exportColumnRawValue` property in Export Options allows you to choose for each report / column combination whether to export the Display Value (the default) or the Raw Value.

### Further Information

- [Export State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_exportstate_.exportstate.html)

- [Export Api](https://api.adaptabletools.com/interfaces/_src_api_exportapi_.exportapi.html)

- [Export Demo](https://demo.adaptabletools.com/gridmanagement/aggridexportdemo)