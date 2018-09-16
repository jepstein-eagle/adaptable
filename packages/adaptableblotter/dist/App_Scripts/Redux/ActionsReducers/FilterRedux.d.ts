import { FilterState } from './Interface/IState';
import * as Redux from 'redux';
import { IUserFilter, IColumnFilter } from '../../Core/Api/Interface/AdaptableBlotterObjects';
import { InputAction } from '../../Core/Interface/IMessage';
export declare const USER_FILTER_ADD_UPDATE = "USER_FILTER_ADD_UPDATE";
export declare const USER_FILTER_DELETE = "USER_FILTER_DELETE";
export declare const COLUMN_FILTER_ADD_UPDATE = "COLUMN_FILTER_ADD_UPDATE";
export declare const COLUMN_FILTER_CLEAR_ALL = "COLUMN_FILTER_CLEAR_ALL";
export declare const COLUMN_FILTER_CLEAR = "COLUMN_FILTER_CLEAR";
export declare const HIDE_FILTER_FORM = "HIDE_FILTER_FORM";
export declare const SYSTEM_FILTER_SET = "SYSTEM_FILTER_SET";
export declare const CREATE_USER_FILTER_FROM_COLUMN_FILTER = "CREATE_USER_FILTER_FROM_COLUMN_FILTER";
export interface UserFilterAddUpdateAction extends Redux.Action {
    Index: number;
    UserFilter: IUserFilter;
}
export interface UserFilterDeleteAction extends Redux.Action {
    UserFilter: IUserFilter;
}
export interface HideFilterFormAction extends Redux.Action {
}
export interface ColumnFilterAddUpdateAction extends Redux.Action {
    columnFilter: IColumnFilter;
}
export interface ColumnFilterClearAllAction extends Redux.Action {
}
export interface ColumnFilterClearAction extends Redux.Action {
    columnId: string;
}
export interface SystemFilterSetAction extends Redux.Action {
    SystemFilters: string[];
}
export interface CreateUserFilterFromColumnFilterAction extends InputAction {
    ColumnFilter: IColumnFilter;
}
export declare const UserFilterAddUpdate: (Index: number, UserFilter: IUserFilter) => UserFilterAddUpdateAction;
export declare const UserFilterDelete: (UserFilter: IUserFilter) => UserFilterDeleteAction;
export declare const HideFilterForm: () => HideFilterFormAction;
export declare const ColumnFilterAddUpdate: (columnFilter: IColumnFilter) => ColumnFilterAddUpdateAction;
export declare const ColumnFilterClearAll: () => ColumnFilterClearAllAction;
export declare const ColumnFilterClear: (columnId: string) => ColumnFilterClearAction;
export declare const SystemFilterSet: (SystemFilters: string[]) => SystemFilterSetAction;
export declare const CreateUserFilterFromColumnFilter: (ColumnFilter: IColumnFilter, InputText: string) => CreateUserFilterFromColumnFilterAction;
export declare const FilterReducer: Redux.Reducer<FilterState>;
