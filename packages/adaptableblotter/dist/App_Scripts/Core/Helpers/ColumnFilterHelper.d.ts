import { IUserFilter, IColumnFilter } from '../Api/Interface/AdaptableBlotterObjects';
export declare module ColumnFilterHelper {
    function CreateColumnFilterFromUserFilter(userFilter: IUserFilter): IColumnFilter;
}
