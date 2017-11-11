import { Expression } from '../Expression/Expression'
import { ExpressionHelper } from '../Expression/ExpressionHelper'
import { IRangeExpression } from '../Interface/IExpression';
import { IRange } from '../Interface/IExportStrategy';
import { RangeScope } from '../Enums'
import { IAdaptableBlotter, IColumn } from '../Interface/IAdaptableBlotter';
import { StringExtensions } from '../Extensions'
import { ObjectFactory } from '../../Core/ObjectFactory';

export module RangeHelper {

    export const ALL_DATA_RANGE = 'AllData'
    export const ALL_VISIBLE_DATA_RANGE = 'AllVisibleData'

    export function GetRanges(Ranges: IRange[], RangeUids: string[]): IRange[] {
        return Ranges.filter(f => RangeUids.find(uid => uid == f.Uid) != null)
    }

    export function IsSystemRange(range: IRange): boolean {
        return range.Uid == ALL_DATA_RANGE || range.Uid == ALL_VISIBLE_DATA_RANGE;
    }

    export function ConvertRangeToArray(blotter: IAdaptableBlotter, range: IRange, rangeColumns: IColumn[]): any[] {
        if (IsSystemRange(range)) {
            return BuildSystemRange(range, blotter);
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
            newRow.push(blotter.getDisplayValueFromRecord(row,col.ColumnId));
        })
        return newRow;
    }

    export function BuildSystemRange(range: IRange, blotter: IAdaptableBlotter) {
        var dataToExport: any[] = [];
        if (range.Uid == ALL_DATA_RANGE) {
            let cols: IColumn[] = blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
            dataToExport[0] = cols.map(c => c.FriendlyName);
            let rows: any[] = blotter.getAllRows();
            rows.forEach(row => {
                let newRow = getRowValues(row, cols, blotter);
                dataToExport.push(newRow);
            })
        } else if (range.Uid == ALL_VISIBLE_DATA_RANGE) {
            let cols: IColumn[] = blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns.filter(c => c.Visible);
            dataToExport[0] = cols.map(c => c.FriendlyName);
            let rows: any[] = blotter.getAllVisibleRows();
            rows.forEach(row => {
                let newRow = getRowValues(row, cols, blotter);
                dataToExport.push(newRow);
            })
        }
        return dataToExport;
    }

  
    export function CreateSystemRanges(): Array<IRange> {

        let _systemRanges: IRange[] = [];

        _systemRanges.push({
            Uid: ALL_DATA_RANGE,
            Name: "All Data",
            RangeScope: RangeScope.AllColumns,
            Columns: [],
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsPredefined: true
        });

        _systemRanges.push({
            Uid: ALL_VISIBLE_DATA_RANGE,
            Name: "All Visible Data",
            RangeScope: RangeScope.AllColumns,
            Columns: [],
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsPredefined: true
        });
        return _systemRanges;
    }

}

