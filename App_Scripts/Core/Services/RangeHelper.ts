import { Expression } from '../Expression/Expression'
import { ExpressionHelper } from '../Expression/ExpressionHelper'
import { IRangeExpression } from '../Interface/IExpression';
import { IRange } from '../Interface/IRangeStrategy';
import { RangeScope } from '../Enums'
import { IAdaptableBlotter, IColumn } from '../Interface/IAdaptableBlotter';
import { StringExtensions } from '../Extensions'
import { ObjectFactory } from '../../Core/ObjectFactory';


export module RangeHelper {

    export function GetRanges(Ranges: IRange[], RangeUids: string[]): IRange[] {
        return Ranges.filter(f => RangeUids.find(uid => uid == f.Uid) != null)
    }

    export function IsSystemRange(range: IRange): boolean {
        return range.Uid == ALL_DATA_RANGE || range.Uid == VISIBLE_DATA_RANGE;
    }

   export function ConvertRangeToArray(blotter: IAdaptableBlotter, range: IRange, rangeColumns: IColumn[]): any[]{
    if (IsSystemRange(range)) {
        return BuildSystemRange(range, blotter);
    }
  
    var dataToExport: any[] = [];
    dataToExport[0] = rangeColumns.map(c => c.FriendlyName);
    let expressionToCheck: Expression = range.Expression;
   
    let rows: any[] = blotter.getAllRows();
    rows.forEach(row  => {
        if (ExpressionHelper.checkForExpressionFromRecord(expressionToCheck, row, rangeColumns, blotter)) {
            let newRow: any[] = [];
            rangeColumns.forEach(col => {
                newRow.push(blotter.getCellValue(col.ColumnId, row));
            })
            dataToExport.push(newRow);
        }
    })
    return dataToExport;
   }

    export function BuildSystemRange(range: IRange, blotter: IAdaptableBlotter) {
        let cols: IColumn[] = blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let colNames: string[] = cols.map(d => d.ColumnId);
        var dataToExport: any[] = [];
        dataToExport[0] = colNames;
        if (range.Uid == ALL_DATA_RANGE) {
            dataToExport.push(...blotter.getAllRows())
        } else if (range.Uid == VISIBLE_DATA_RANGE) {
            dataToExport.push(...blotter.getAllVisibleRows())
        }
        return dataToExport;
    }

    export const ALL_DATA_RANGE = 'AllData'
    export const VISIBLE_DATA_RANGE = 'VisibleData'

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
            Uid: VISIBLE_DATA_RANGE,
            Name: "Visible Data",
            RangeScope: RangeScope.AllColumns,
            Columns: [],
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsPredefined: true
        });
        return _systemRanges;
    }

}

