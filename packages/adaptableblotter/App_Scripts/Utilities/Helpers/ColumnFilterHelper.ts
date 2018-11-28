import { ExpressionHelper } from './ExpressionHelper'
import { IColumnFilter } from '../../Api/Interface/IAdaptableBlotterObjects';
import { IColumn } from '../../Core/Interface/IColumn';
import { IKeyValuePair } from '../../Core/Interface/Interfaces';
import { ColumnHelper } from './ColumnHelper';
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';

export module ColumnFilterHelper {


    export function ConvertColumnFiltersToKVPArray(columnFilters: IColumnFilter[], columns: IColumn[]): IKeyValuePair[] {
        let infoBody: IKeyValuePair[] = []
        columnFilters.forEach(x => {
            let column: IColumn = ColumnHelper.getColumnFromId(x.ColumnId, columns);
            if (column) {
                let expression: string = ExpressionHelper.ConvertExpressionToString(x.Filter, columns, false)
                infoBody.push({ Key: ColumnHelper.getFriendlyNameFromColumnId(x.ColumnId, columns), Value: expression })
            }
        })
        return infoBody;
    }

 export function   getColumnFiltersDescription(columnFilters: IColumnFilter[], columns: IColumn[], blotter: IAdaptableBlotter): string {
        if (blotter && !blotter.isFilterable()) {
            return "Grid is not filterable"
        }

       if (ArrayExtensions.IsNullOrEmpty(columnFilters)) {
            return "No Column Filter Active"
        }
        let stringarr:string[]= ColumnFilterHelper.ConvertColumnFiltersToKVPArray(columnFilters, columns).map(kvp => {
            return kvp.Key + ": " + kvp.Value
        })
       return stringarr.join("; ")
    }
}

