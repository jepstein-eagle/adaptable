import { IStrategyActionReturn } from '../../Strategy/Interface/IStrategyActionReturn';
import { ReportColumnScope, ReportRowScope } from '../Enums'
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { IColumn } from '../Interface/IColumn';
import { ISelectedCells } from '../Interface/Interfaces';
import { IReport, IUserFilter, Expression } from '../Api/AdaptableBlotterObjects';
import { ExpressionHelper } from './ExpressionHelper';
export module ReportHelper {

    export const ALL_DATA_REPORT = 'All Data'
    export const VISIBLE_DATA_REPORT = 'Visible Data'
    export const SELECTED_CELLS_REPORT = 'Selected Cells'

    function IsSystemReport(Report: IReport): boolean {
        return Report == null || Report.Name == ALL_DATA_REPORT || Report.Name == VISIBLE_DATA_REPORT || Report.Name == SELECTED_CELLS_REPORT;
    }

    export function GetReportColumnsDescription(Report: IReport, cols: IColumn[]): string {
        switch (Report.ReportColumnScope) {
            case ReportColumnScope.AllColumns:
                return "[All Columns]";
            case ReportColumnScope.VisibleColumns:
                return "[Visible Columns]";
            case ReportColumnScope.SelectedColumns:
                return "[Selected Columns]";
            case ReportColumnScope.BespokeColumns:
                return Report.Columns.map(c =>
                    cols.find(col => col.ColumnId == c).FriendlyName).join(', ');
        }
    }

    export function GetReportExpressionDescription(Report: IReport, cols: IColumn[], userFilters: IUserFilter[]): string {
        if (IsSystemReport(Report)) {
            if (Report.Name == ALL_DATA_REPORT) {
                return "[All Blotter Data]";
            } else if (Report.Name == VISIBLE_DATA_REPORT) {
                return "[All Visible Data]";
            } else if (Report.Name == SELECTED_CELLS_REPORT) {
                return "[Selected Cells Data]";
            }
        }
        return ExpressionHelper.ConvertExpressionToString(Report.Expression, cols, userFilters)
    }

    export function ConvertReportToArray(blotter: IAdaptableBlotter, Report: IReport): IStrategyActionReturn<any[]> {
        let ReportColumns: IColumn[] = [];
        let gridColumns: IColumn[] = blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;

        // first get the cols depending on the Column Scope
        switch (Report.ReportColumnScope) {
            case ReportColumnScope.AllColumns:
                ReportColumns = gridColumns;
                break;
            case ReportColumnScope.VisibleColumns:
                ReportColumns = gridColumns.filter(c => c.Visible);
                break;
            case ReportColumnScope.SelectedColumns:
                let selectedCells: ISelectedCells = blotter.getSelectedCells();

                if (selectedCells.Selection.size == 0) {
                    // some way of saying we cannot export anything
                    return { ActionReturn: dataToExport, Error: { ErrorMsg: "No cells are selected" } };
                }

                // first get column names - just look at first entry as colnames will be same for each
                let firstRow: any = selectedCells.Selection.values().next().value
                for (var columnValuePair of firstRow) {
                    ReportColumns.push(gridColumns.find(c => c.ColumnId == columnValuePair.columnID));
                }
                break;
            case ReportColumnScope.BespokeColumns:
                ReportColumns = Report.Columns.map(c => gridColumns.find(col => col.ColumnId == c));
                break;
        }

        // populate the first row
        var dataToExport: any[] = [];
        dataToExport[0] = ReportColumns.map(c => c.FriendlyName);

        // now populate the rest of the rows
        switch (Report.ReportRowScope) {
            case ReportRowScope.AllRows:
                blotter.forAllRecordsDo((row) => {
                    let newRow = getRowValues(row, ReportColumns, blotter);
                    dataToExport.push(newRow);
                })
                break;

            case ReportRowScope.VisibleRows:
                blotter.forAllVisibleRecordsDo((row) => {
                    let newRow = getRowValues(row, ReportColumns, blotter);
                    dataToExport.push(newRow);
                })
                break;

            case ReportRowScope.ExpressionRows:
                let expressionToCheck: Expression = Report.Expression;

                blotter.forAllRecordsDo((row) => {
                    if (ExpressionHelper.checkForExpressionFromRecord(expressionToCheck, row, ReportColumns, blotter)) {
                        let newRow = getRowValues(row, ReportColumns, blotter);
                        dataToExport.push(newRow);
                    }
                })
                break;

            case ReportRowScope.SelectedRows:
                let selectedCells: ISelectedCells = blotter.getSelectedCells();
                let colNames: string[] = ReportColumns.map(c => c.FriendlyName);
                for (var keyValuePair of selectedCells.Selection) {
                    let values: any[] = []
                    if (keyValuePair[1].length != colNames.length) {
                        return { ActionReturn: [], Error: { ErrorMsg: "Reports of selected cells should have the same set of columns" } };
                    }
                    for (var cvPair of keyValuePair[1]) {
                        if (!colNames.find(x => x == ReportColumns.find(c => c.ColumnId == cvPair.columnID).FriendlyName)) {
                            return { ActionReturn: [], Error: { ErrorMsg: "Reports of selected cells should have the same set of columns" } };
                        }
                        //we want the displayValue now
                        values.push(blotter.getDisplayValue(keyValuePair[0], cvPair.columnID));

                    }
                    dataToExport.push(values);
                }
                break;
        }
        return { ActionReturn: dataToExport };
    }

    function getRowValues(row: any, ReportColumns: IColumn[], blotter: IAdaptableBlotter): any[] {
        let newRow: any[] = [];
        ReportColumns.forEach(col => {
            newRow.push(blotter.getDisplayValueFromRecord(row, col.ColumnId));
        })
        return newRow;
    }


    export function CreateSystemReports(): Array<IReport> {

        let _systemReports: IReport[] = [];

        _systemReports.push({
            Name: ALL_DATA_REPORT,
            ReportColumnScope: ReportColumnScope.AllColumns,
            ReportRowScope: ReportRowScope.AllRows,
            Columns: [],
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsReadOnly: true
        });

        _systemReports.push({
            Name: VISIBLE_DATA_REPORT,
            ReportColumnScope: ReportColumnScope.VisibleColumns,
            ReportRowScope: ReportRowScope.VisibleRows,
            Columns: [],
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsReadOnly: true
         });

        _systemReports.push({
            Name: SELECTED_CELLS_REPORT,
            ReportColumnScope: ReportColumnScope.SelectedColumns,
            ReportRowScope: ReportRowScope.SelectedRows,
            Columns: [],
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsReadOnly: true
        });
        return _systemReports;
    }

}