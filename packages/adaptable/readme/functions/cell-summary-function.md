# Cell Summary (AdaptableFunction)

The Cell Summary Function allows you to see - at a glance - summary information about the cells (and rows) you have selected in AdapTable.

Simply select a group of cells and you can see the summary information about those cells in the Cell Summary Toolbar and / or Tool Panel

> AdapTable ships with a large set of common Summary Operations; if you are running the Finance plug-in then extra finance-related Operations are available. 
> Additionally, you can provide your own Summary Operations (and associated functions) through [Cell Summary Predefined Config](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_cellsummarystate_.cellsummarystate.html)

## AdapTable Summary Operations

The following Cell Summary Operations are shipped with AdapTable:

| Operation | Columns | Description                                |
| --------- | ------- | ------------------------------------------ |
| Sum       | Numeric | Total of all cells                         |
| Average   | Numeric | Average of all cells                       |
| Median    | Numeric | Middle (value) of all cells (when ordered) |
| Mode      | Numeric | Most common value                          |
| Distinct  | All     | Count of distinct cell values              |
| Max       | Numeric | Highest Cell Value                         |
| Min       | Numeric | Lowest Cell Value                          |
| Count     | All     | Number of selected cells                   |

If using the [Finance Plugin](../../../plugins/finance/README.md) the additional Cell Summary Operations are available:

| Operation       | Columns | Description                                                                   |
| --------------- | ------- | ----------------------------------------------------------------------------- |
| Only            | Numeric | Returns true if all selected cells match (single column only)                 |
| VWap            | Numeric | Runs VWAP analysis - requires selection of 2 contiguous columns               |
| WeightedAverage | Numeric | Calculateds the Weighted Average - requires selection of 2 contiguous columns |


## UI Elements

Cell Summary includes the following UI Elements:

- **Popup** - Shows all the Cell Summary Operation results for the selected cells

- **Toolbar** - Displays the result of the curently selected Cell Summary Operation (available through a dropdown).  Choose a different item in the dropdown to see a different operation, or click on the 'info' button to see all the Operations.

- **Tool Panel** - Same as Toolbar above.

- **Context Menu** - `See Cell Summary` Menu Item opens Cell Summary popup (only visible if selected cells are editable).

## Entitlements
Cell Summary supports these Entitlement Rules:

- **Full**: All Cell Summary Operations will be displayed (and can be selected)

- **Hidden**: All Cell Summaries are hidden from the User

- **ReadOnly**: N/A

## FAQ

**Can we add our own Summary Operations?**

Yes, you need to provide a [CellSummaryOperationDefinition](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_cellsummarystate_.cellsummarystate.html#cellsummaryoperationdefinitions) in your Cell Summary Predefined Config.

**Can we see Financial Operations?**

Yes, if you use the AdapTable [Finance Plugin](../../../plugins/finance/README.md).


### Further Information
- [Cell Summary State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_cellsummarystate_.cellsummarystate.html)

- [Cell Summary Api](https://api.adaptabletools.com/interfaces/_src_api_cellsummaryapi_.cellsummaryapi.html)

- [Cell Summary Demo](https://demo.adaptabletools.com/gridmanagement/aggridcellsummarydemo)