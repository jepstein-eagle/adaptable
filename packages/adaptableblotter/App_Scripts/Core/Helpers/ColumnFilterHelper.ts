import { ExpressionHelper } from './ExpressionHelper'
import { IColumnFilter } from '../Api/Interface/IAdaptableBlotterObjects';
import { IColumn } from '../Interface/IColumn';
import { ColumnHelper } from './ColumnHelper';
import { KeyValuePair } from '../../View/UIInterfaces';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';


export module ColumnFilterHelper {


    export function ConvertColumnFiltersToKVPArray(columnFilters: IColumnFilter[], columns: IColumn[]): KeyValuePair[] {
        let infoBody: KeyValuePair[] = []
        columnFilters.forEach(x => {
            let column: IColumn = columns.find(c => c.ColumnId == x.ColumnId);
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

