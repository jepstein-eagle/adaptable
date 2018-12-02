import { IColumnFilter } from '../../Api/Interface/IAdaptableBlotterObjects';
import { IColumn } from '../../Api/Interface/IColumn';
import { IKeyValuePair } from '../../api/Interface/Interfaces';
import { IAdaptableBlotter } from '../../api/Interface/IAdaptableBlotter';
export declare module ColumnFilterHelper {
    function ConvertColumnFiltersToKVPArray(columnFilters: IColumnFilter[], columns: IColumn[]): IKeyValuePair[];
    function getColumnFiltersDescription(columnFilters: IColumnFilter[], columns: IColumn[], blotter: IAdaptableBlotter): string;
}
