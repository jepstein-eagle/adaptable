"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../Enums");
const ExpressionHelper_1 = require("./ExpressionHelper");
var ReportHelper;
(function (ReportHelper) {
    ReportHelper.ALL_DATA_REPORT = 'All Data';
    ReportHelper.VISIBLE_DATA_REPORT = 'Visible Data';
    ReportHelper.SELECTED_CELLS_REPORT = 'Selected Cells';
    function IsSystemReport(Report) {
        return Report == null || Report.Name == ReportHelper.ALL_DATA_REPORT || Report.Name == ReportHelper.VISIBLE_DATA_REPORT || Report.Name == ReportHelper.SELECTED_CELLS_REPORT;
    }
    ReportHelper.IsSystemReport = IsSystemReport;
    function GetReportColumnsDescription(Report, cols) {
        switch (Report.ReportColumnScope) {
            case Enums_1.ReportColumnScope.AllColumns:
                return "[All Columns]";
            case Enums_1.ReportColumnScope.VisibleColumns:
                return "[Visible Columns]";
            case Enums_1.ReportColumnScope.SelectedColumns:
                return "[Selected Columns]";
            case Enums_1.ReportColumnScope.BespokeColumns:
                return Report.Columns.map(c => cols.find(col => col.ColumnId == c).FriendlyName).join(', ');
        }
    }
    ReportHelper.GetReportColumnsDescription = GetReportColumnsDescription;
    function GetReportExpressionDescription(Report, cols, userFilters) {
        if (IsSystemReport(Report)) {
            if (Report.Name == ReportHelper.ALL_DATA_REPORT) {
                return "[All Blotter Data]";
            }
            else if (Report.Name == ReportHelper.VISIBLE_DATA_REPORT) {
                return "[All Visible Data]";
            }
            else if (Report.Name == ReportHelper.SELECTED_CELLS_REPORT) {
                return "[Selected Cells Data]";
            }
        }
        return ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(Report.Expression, cols);
    }
    ReportHelper.GetReportExpressionDescription = GetReportExpressionDescription;
    function ConvertReportToArray(blotter, Report) {
        let ReportColumns = [];
        let gridColumns = blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        // first get the cols depending on the Column Scope
        switch (Report.ReportColumnScope) {
            case Enums_1.ReportColumnScope.AllColumns:
                ReportColumns = gridColumns;
                break;
            case Enums_1.ReportColumnScope.VisibleColumns:
                ReportColumns = gridColumns.filter(c => c.Visible);
                break;
            case Enums_1.ReportColumnScope.SelectedColumns:
                let selectedCells = blotter.AdaptableBlotterStore.TheStore.getState().Grid.SelectedCellInfo;
                if (selectedCells.Selection.size == 0) {
                    // some way of saying we cannot export anything
                    return { ActionReturn: dataToExport, Alert: { Header: "Export Error", Msg: "No cells are selected", MessageType: Enums_1.MessageType.Error } };
                }
                // first get column names - just look at first entry as colnames will be same for each
                let firstRow = selectedCells.Selection.values().next().value;
                for (let selectedCellInfo of firstRow) {
                    ReportColumns.push(gridColumns.find(c => c.ColumnId == selectedCellInfo.columnId));
                }
                break;
            case Enums_1.ReportColumnScope.BespokeColumns:
                ReportColumns = Report.Columns.map(c => gridColumns.find(col => col.ColumnId == c));
                break;
        }
        // populate the first row
        var dataToExport = [];
        dataToExport[0] = ReportColumns.map(c => c.FriendlyName);
        // now populate the rest of the rows
        switch (Report.ReportRowScope) {
            case Enums_1.ReportRowScope.AllRows:
                blotter.forAllRecordsDo((row) => {
                    let newRow = getRowValues(row, ReportColumns, blotter);
                    dataToExport.push(newRow);
                });
                break;
            case Enums_1.ReportRowScope.VisibleRows:
                blotter.forAllVisibleRecordsDo((row) => {
                    let newRow = getRowValues(row, ReportColumns, blotter);
                    dataToExport.push(newRow);
                });
                break;
            case Enums_1.ReportRowScope.ExpressionRows:
                let expressionToCheck = Report.Expression;
                blotter.forAllRecordsDo((row) => {
                    if (ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRecord(expressionToCheck, row, ReportColumns, blotter)) {
                        let newRow = getRowValues(row, ReportColumns, blotter);
                        dataToExport.push(newRow);
                    }
                });
                break;
            case Enums_1.ReportRowScope.SelectedRows:
                let selectedCells = blotter.AdaptableBlotterStore.TheStore.getState().Grid.SelectedCellInfo;
                let colNames = ReportColumns.map(c => c.FriendlyName);
                for (var keyValuePair of selectedCells.Selection) {
                    let values = [];
                    if (keyValuePair[1].length != colNames.length) {
                        return { ActionReturn: [], Alert: { Header: "Report Error", Msg: "Selected cells report should have the same set of columns", MessageType: Enums_1.MessageType.Error } };
                    }
                    for (var cvPair of keyValuePair[1]) {
                        if (!colNames.find(x => x == ReportColumns.find(c => c.ColumnId == cvPair.columnId).FriendlyName)) {
                            return { ActionReturn: [], Alert: { Header: "Report Error", Msg: "Selected cells report should have the same set of columns", MessageType: Enums_1.MessageType.Error } };
                        }
                        //we want the displayValue now
                        values.push(blotter.getDisplayValue(keyValuePair[0], cvPair.columnId));
                    }
                    dataToExport.push(values);
                }
                break;
        }
        return { ActionReturn: dataToExport };
    }
    ReportHelper.ConvertReportToArray = ConvertReportToArray;
    function getRowValues(row, ReportColumns, blotter) {
        let newRow = [];
        ReportColumns.forEach(col => {
            newRow.push(blotter.getDisplayValueFromRecord(row, col.ColumnId));
        });
        return newRow;
    }
    function CreateSystemReports() {
        let _systemReports = [];
        _systemReports.push({
            Name: ReportHelper.ALL_DATA_REPORT,
            ReportColumnScope: Enums_1.ReportColumnScope.AllColumns,
            ReportRowScope: Enums_1.ReportRowScope.AllRows,
            Columns: [],
            Expression: ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression()
        });
        _systemReports.push({
            Name: ReportHelper.VISIBLE_DATA_REPORT,
            ReportColumnScope: Enums_1.ReportColumnScope.VisibleColumns,
            ReportRowScope: Enums_1.ReportRowScope.VisibleRows,
            Columns: [],
            Expression: ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression()
        });
        _systemReports.push({
            Name: ReportHelper.SELECTED_CELLS_REPORT,
            ReportColumnScope: Enums_1.ReportColumnScope.SelectedColumns,
            ReportRowScope: Enums_1.ReportRowScope.SelectedRows,
            Columns: [],
            Expression: ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression()
        });
        return _systemReports;
    }
    ReportHelper.CreateSystemReports = CreateSystemReports;
})(ReportHelper = exports.ReportHelper || (exports.ReportHelper = {}));
