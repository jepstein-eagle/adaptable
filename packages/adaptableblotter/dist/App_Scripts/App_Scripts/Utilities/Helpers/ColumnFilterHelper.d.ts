import { IColumnFilter } from '../../Api/Interface/IAdaptableBlotterObjects';
import { IColumn } from '../../Core/Interface/IColumn';
import { IKeyValuePair } from '../../Core/Interface/Interfaces';
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
export declare module ColumnFilterHelper {
    function ConvertColumnFiltersToKVPArray(columnFilters: IColumnFilter[], columns: IColumn[]): IKeyValuePair[];
    function getColumnFiltersDescription(columnFilters: IColumnFilter[], columns: IColumn[], blotter: IAdaptableBlotter): string;
}
