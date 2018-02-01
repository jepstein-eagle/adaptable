import { IStrategyActionReturn } from '../../Strategy/Interface/IStrategy';
import { Expression } from '../Expression'
import { ExpressionHelper } from '../Helpers/ExpressionHelper'
import { IRangeExpression } from '../Interface/IExpression';
import { IRange } from '../../Strategy/Interface/IExportStrategy';
import { RangeColumnScope, RangeRowScope } from '../Enums'
import { IAdaptableBlotter, IColumn, ISelectedCells } from '../Interface/IAdaptableBlotter';
import { StringExtensions } from '../Extensions'
import { ObjectFactory } from '../../Core/ObjectFactory';
import { IUserFilter } from '../../Core/Interface/IExpression';

export module RangeHelper {

    export const ALL_DATA_RANGE = 'All Data'
    export const VISIBLE_DATA_RANGE = 'Visible Data'
    export const SELECTED_CELLS_RANGE = 'Selected Cells'

    function IsSystemRange(range: IRange): boolean {
        return range == null || range.Name == ALL_DATA_RANGE || range.Name == VISIBLE_DATA_RANGE || range.Name == SELECTED_CELLS_RANGE;
    }

    export function GetRangeColumnsDescription(range: IRange, cols: IColumn[]): string {
        switch (range.RangeColumnScope) {
            case RangeColumnScope.AllColumns:
                return "All Columns";
            case RangeColumnScope.VisibleColumns:
                return "Visible Columns";
            case RangeColumnScope.SelectedColumns:
                return "Selected Columns";
            case RangeColumnScope.BespokeColumns:
                return range.Columns.map(c =>
                    cols.find(col => col.ColumnId == c).FriendlyName).join(', ');
        }
    }

    export function GetRangeExpressionDescription(range: IRange, cols: IColumn[], userFilters: IUserFilter[]): string {
        if (IsSystemRange(range)) {
            if (range.Name == ALL_DATA_RANGE) {
                return "All Blotter Data";
            } else if (range.Name == VISIBLE_DATA_RANGE) {
                return "All Visible Data";
            } else if (range.Name == SELECTED_CELLS_RANGE) {
                return "Selected Cells Data";
            }
        }
        return ExpressionHelper.ConvertExpressionToString(range.Expression, cols, userFilters)
    }

    export function     ConvertRangeToArray(blotter: IAdaptableBlotter, range: IRange): IStrategyActionReturn<any[]> {
        let rangeColumns: IColumn[] = [];
        let gridColumns: IColumn[] = blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;

        // first get the cols depending on the Column Scope
        switch (range.RangeColumnScope) {
            case RangeColumnScope.AllColumns:
                rangeColumns = gridColumns;
                break;
            case RangeColumnScope.VisibleColumns:
                rangeColumns = gridColumns.filter(c => c.Visible);
                break;
            case RangeColumnScope.SelectedColumns:
                let selectedCells: ISelectedCells = blotter.getSelectedCells();

                if (selectedCells.Selection.size == 0) {
                    // some way of saying we cannot export anything
                    return { ActionReturn: dataToExport, Error: { ErrorMsg: "No cells are selected" } };
                }

                // first get column names - just look at first entry as colnames will be same for each
                let firstRow: any = selectedCells.Selection.values().next().value
                for (var columnValuePair of firstRow) {
                    rangeColumns.push(gridColumns.find(c => c.ColumnId == columnValuePair.columnID));
                }
                break;
            case RangeColumnScope.BespokeColumns:
                rangeColumns = range.Columns.map(c => gridColumns.find(col => col.ColumnId == c));
                break;
        }

        // populate the first row
        var dataToExport: any[] = [];
        dataToExport[0] = rangeColumns.map(c => c.FriendlyName);

        // now populate the rest of the rows
        switch (range.RangeRowScope) {
            case RangeRowScope.AllRows:
                blotter.forAllRecordsDo((row) => {
                    let newRow = getRowValues(row, rangeColumns, blotter);
                    dataToExport.push(newRow);
                })
                break;

            case RangeRowScope.VisibleRows:
                blotter.forAllVisibleRecordsDo((row) => {
                    let newRow = getRowValues(row, rangeColumns, blotter);
                    dataToExport.push(newRow);
                })
                break;

            case RangeRowScope.ExpressionRows:
                let expressionToCheck: Expression = range.Expression;

                blotter.forAllRecordsDo((row) => {
                    if (ExpressionHelper.checkForExpressionFromRecord(expressionToCheck, row, rangeColumns, blotter)) {
                        let newRow = getRowValues(row, rangeColumns, blotter);
                        dataToExport.push(newRow);
                    }
                })
                break;

            case RangeRowScope.SelectedRows:
                let selectedCells: ISelectedCells = blotter.getSelectedCells();
                let colNames: string[] = rangeColumns.map(c => c.FriendlyName);
                for (var keyValuePair of selectedCells.Selection) {
                    let values: any[] = []
                    if (keyValuePair[1].length != colNames.length) {
                        return { ActionReturn: [], Error: { ErrorMsg: "Ranges of selected cells should have the same set of columns" } };
                    }
                    for (var cvPair of keyValuePair[1]) {
                        if (!colNames.find(x => x == rangeColumns.find(c => c.ColumnId == cvPair.columnID).FriendlyName)) {
                            return { ActionReturn: [], Error: { ErrorMsg: "Ranges of selected cells should have the same set of columns" } };
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

    function getRowValues(row: any, rangeColumns: IColumn[], blotter: IAdaptableBlotter): any[] {
        let newRow: any[] = [];
        rangeColumns.forEach(col => {
            newRow.push(blotter.getDisplayValueFromRecord(row, col.ColumnId));
        })
        return newRow;
    }


    export function CreateSystemRanges(): Array<IRange> {

        let _systemRanges: IRange[] = [];

        _systemRanges.push({
            Name: ALL_DATA_RANGE,
            RangeColumnScope: RangeColumnScope.AllColumns,
            RangeRowScope: RangeRowScope.AllRows,
            Columns: [],
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsPredefined: true
        });

        _systemRanges.push({
            Name: VISIBLE_DATA_RANGE,
            RangeColumnScope: RangeColumnScope.VisibleColumns,
            RangeRowScope: RangeRowScope.VisibleRows,
            Columns: [],
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsPredefined: true
        });

        _systemRanges.push({
            Name: SELECTED_CELLS_RANGE,
            RangeColumnScope: RangeColumnScope.SelectedColumns,
            RangeRowScope: RangeRowScope.SelectedRows,
            Columns: [],
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsPredefined: true
        });
        return _systemRanges;
    }

}