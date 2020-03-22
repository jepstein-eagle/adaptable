# Export (AdaptableFunction)

The Export([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `Export`) Function provides a way to export data from AdapTable via 'Reports'.

You can use AdapTable to export data dynamically from your grid into other formats through the use of reports (essentially named queries).

Tip
You don't need to first filter the grid before you export; if you have for example, an End of Day report, you need to define it only once and it will evaluate automatically each time you run it. irrespective of how the Grid is currently filtered.

You can export data from AdapTable to a number of locations including CSV, Clipboard, JSON, to iPushPull, Excel (via Glue42 or OpenFin).

You can specify for each report / column combination whether to export the DisplayValue or RawValue of the column.

Tip
The last 3 of these will not always be available depending on how your grid is set up and which options have been configured.

Note
You can schedule your exports to run at at time of your choosing or export manually whenever you want.

If scheduling then you can choose between running on a one time date only or as a regular recurrence (e.g. Every Day at 17:30).

AdapTable ships with some predefined reports for frequent queries that you might use. These include: All Data, Visible Data, Selected Cells and Selected Rows.



## UI Elements
To Do

## Entitlements
To Do

## FAQ

Where can we export data to?

Currently you can export reports to the following destinations (though more are being added all the time):

CSV

Clipboard

JSON

Excel - if using OpenFin

iPushPull - an iPushPull account is required

Can we have Live Updates if not using either OpenFin or iPushPull?

No.  You will need to be either running in the OpenFin container or have an iPushPull account to benefit from Live Updates.

Do you include column names in the exported data?

Yes, column names are always included in the report.

Is there an option when just copying to the clipboard to exclude column names?

Not at present but this feature will be added in future releases.

Is there a limit on the number of reports that I can create?

No, reports like all other Adaptable Objects are unlimited.

Can I export the underlying raw value in the column and not the displayed / formatted one?

Yes, the exportColumnRawValue property in Export Options allows you to choose for each report / column combination whether to export the Display Value (the default) or the Raw Value.

### Further Information

To Do

