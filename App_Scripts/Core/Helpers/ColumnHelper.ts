import { IColumn } from '../Interface/IColumn';

export module ColumnHelper {
    
    export function isSpecialColumn(columnId: string): boolean {
        return columnId == "ag-Grid-AutoColumn"
    }
}

