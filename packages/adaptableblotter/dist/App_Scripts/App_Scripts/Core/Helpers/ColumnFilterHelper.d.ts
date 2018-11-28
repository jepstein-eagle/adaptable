import { IColumnFilter } from '../Api/Interface/IAdaptableBlotterObjects';
import { IColumn } from '../Interface/IColumn';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { IKeyValuePair } from '../Interface/Interfaces';
export declare module ColumnFilterHelper {
    function ConvertColumnFiltersToKVPArray(columnFilters: IColumnFilter[], columns: IColumn[]): IKeyValuePair[];
    function getColumnFiltersDescription(columnFilters: IColumnFilter[], columns: IColumn[], blotter: IAdaptableBlotter): string;
}
