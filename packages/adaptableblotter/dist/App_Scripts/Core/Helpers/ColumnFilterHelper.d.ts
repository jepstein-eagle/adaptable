import { IColumnFilter } from '../Api/Interface/IAdaptableBlotterObjects';
import { IColumn } from '../Interface/IColumn';
import { KeyValuePair } from '../../View/UIInterfaces';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
export declare module ColumnFilterHelper {
    function ConvertColumnFiltersToKVPArray(columnFilters: IColumnFilter[], columns: IColumn[]): KeyValuePair[];
    function getColumnFiltersDescription(columnFilters: IColumnFilter[], columns: IColumn[], blotter: IAdaptableBlotter): string;
}
