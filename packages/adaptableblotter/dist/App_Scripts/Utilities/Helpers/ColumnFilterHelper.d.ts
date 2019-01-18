import { IColumnFilter } from '../Interface/IAdaptableBlotterObjects';
import { IColumn } from '../Interface/IColumn';
import { IKeyValuePair } from "../Interface/IKeyValuePair";
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
export declare module ColumnFilterHelper {
    function ConvertColumnFiltersToKVPArray(columnFilters: IColumnFilter[], columns: IColumn[]): IKeyValuePair[];
    function getColumnFiltersDescription(columnFilters: IColumnFilter[], columns: IColumn[], blotter: IAdaptableBlotter): string;
}
