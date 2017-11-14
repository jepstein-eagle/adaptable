import { Expression } from '../Expression/Expression'
import { ExpressionHelper } from '../Expression/ExpressionHelper'
import { IRangeExpression } from '../Interface/IExpression';
import { IRange } from '../Interface/IExportStrategy';
import { RangeScope } from '../Enums'
import { IAdaptableBlotter, IColumn, ISelectedCells } from '../Interface/IAdaptableBlotter';
import { StringExtensions } from '../Extensions'
import { ObjectFactory } from '../../Core/ObjectFactory';
import { IUserFilter } from '../../Core/Interface/IExpression';

export module RangeHelper {

    export const ALL_DATA_RANGE = 'All Data'
    export const VISIBLE_DATA_RANGE = 'Visible Data'
    export const SELECTED_CELLS_RANGE = 'Selected Cells'

    export function IsSystemRange(range: IRange): boolean {
        return range == null || range.Name == ALL_DATA_RANGE || range.Name == VISIBLE_DATA_RANGE || range.Name == SELECTED_CELLS_RANGE;
    }

    export function GetRangeColumnsDescription(range: IRange, cols: IColumn[]): string {
        if (IsSystemRange(range)) {
            if (range.Name == ALL_DATA_RANGE) {
                return "All Columns";
            } else if (range.Name == VISIBLE_DATA_RANGE) {
                return "Visible Columns";
            } else if (range.Name == SELECTED_CELLS_RANGE) {
                return "Selected Columns";
            }
        }

        return (range.RangeScope == RangeScope.AllColumns) ? "All Columns" :
            range.Columns.map(c =>
                cols.find(col => col.ColumnId == c).FriendlyName).join(', ');
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

    export function ConvertRangeToArray(blotter: IAdaptableBlotter, range: IRange, rangeColumns: IColumn[]): any[] {
        if (IsSystemRange(range)) {
            return buildSystemRange(range, blotter);
        }

        var dataToExport: any[] = [];
        dataToExport[0] = rangeColumns.map(c => c.FriendlyName);
        let expressionToCheck: Expression = range.Expression;

        let rows: any[] = blotter.getAllRows();
        rows.forEach(row => {
            if (ExpressionHelper.checkForExpressionFromRecord(expressionToCheck, row, rangeColumns, blotter)) {
                let newRow = getRowValues(row, rangeColumns, blotter);
                dataToExport.push(newRow);
            }
        })
        return dataToExport;
    }

    function getRowValues(row: any, rangeColumns: IColumn[], blotter: IAdaptableBlotter): any[] {
        let newRow: any[] = [];
        rangeColumns.forEach(col => {
            newRow.push(blotter.getDisplayValueFromRecord(row, col.ColumnId));
        })
        return newRow;
    }

    function buildSystemRange(range: IRange, blotter: IAdaptableBlotter) {
        var dataToExport: any[] = [];
        if (range.Name == ALL_DATA_RANGE) {
            let cols: IColumn[] = blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
            dataToExport[0] = cols.map(c => c.FriendlyName);
            let rows: any[] = blotter.getAllRows();
            rows.forEach(row => {
                let newRow = getRowValues(row, cols, blotter);
                dataToExport.push(newRow);
            })
        } else if (range.Name == VISIBLE_DATA_RANGE) {
            let cols: IColumn[] = blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns.filter(c => c.Visible);
            dataToExport[0] = cols.map(c => c.FriendlyName);
            let rows: any[] = blotter.getAllVisibleRows();
            rows.forEach(row => {
                let newRow = getRowValues(row, cols, blotter);
                dataToExport.push(newRow);
            })
        } else if (range.Name == SELECTED_CELLS_RANGE) {
            let selectedCells: ISelectedCells = blotter.getSelectedCells();
            let cols: IColumn[] = blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;

            if (selectedCells.Selection.size == 0) {
                // some way of saying we cannot export anything
                return dataToExport;
            }

            // first get column names - just look at first entry as colnames will be same for each
            let colNames: string[] = []
            let helpme: any = selectedCells.Selection.values().next().value
            for (var columnValuePair of helpme) {
                colNames.push(cols.find(c => c.ColumnId == columnValuePair.columnID).FriendlyName);
            }
            dataToExport[0] = colNames;


            for (var keyValuePair of selectedCells.Selection) {
                let values: any[] = []
                for (var cvPair of keyValuePair[1]) {
                    values.push(cvPair.value);
                }
                dataToExport.push(values);
            }
        }
        return dataToExport;
    }


    export function CreateSystemRanges(): Array<IRange> {

        let _systemRanges: IRange[] = [];

        _systemRanges.push({
            Name: ALL_DATA_RANGE,
            RangeScope: RangeScope.AllColumns,
            Columns: [],
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsPredefined: true
        });

        _systemRanges.push({
            Name: VISIBLE_DATA_RANGE,
            RangeScope: RangeScope.AllColumns,
            Columns: [],
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsPredefined: true
        });

        _systemRanges.push({
            Name: SELECTED_CELLS_RANGE,
            RangeScope: RangeScope.SelectedColumns,
            Columns: [],
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsPredefined: true
        });
        return _systemRanges;
    }

}

