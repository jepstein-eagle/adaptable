import { IColumnFilter } from "../Interface/BlotterObjects/IColumnFilter";
import { IColumn } from '../Interface/IColumn';
import { IKeyValuePair } from "../Interface/IKeyValuePair";
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
export declare module ColumnFilterHelper {
    function convertColumnFiltersToKVPArray(columnFilters: IColumnFilter[], columns: IColumn[]): IKeyValuePair[];
    function getColumnFiltersDescription(columnFilters: IColumnFilter[], columns: IColumn[], blotter: IAdaptableBlotter): string;
}
