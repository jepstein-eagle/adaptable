import { IUserFilter, IColumnFilter } from '../Api/Interface/AdaptableBlotterObjects';
import { IColumn } from '../Interface/IColumn';
import { KeyValuePair } from '../../View/UIInterfaces';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
export declare module ColumnFilterHelper {
    function CreateColumnFilterFromUserFilter(userFilter: IUserFilter): IColumnFilter;
    function ConvertColumnFiltersToKVPArray(columnFilters: IColumnFilter[], columns: IColumn[]): KeyValuePair[];
    function getColumnFiltersDescription(columnFilters: IColumnFilter[], columns: IColumn[], blotter: IAdaptableBlotter): string;
}
