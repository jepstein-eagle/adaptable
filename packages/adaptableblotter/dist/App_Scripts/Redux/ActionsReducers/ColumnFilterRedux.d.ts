import { ColumnFilterState } from './Interface/IState';
import * as Redux from 'redux';
import { IColumnFilter } from "../../Utilities/Interface/BlotterObjects/IColumnFilter";
export declare const COLUMN_FILTER_ADD_UPDATE = "COLUMN_FILTER_ADD_UPDATE";
export declare const COLUMN_FILTER_CLEAR_ALL = "COLUMN_FILTER_CLEAR_ALL";
export declare const COLUMN_FILTER_CLEAR = "COLUMN_FILTER_CLEAR";
export interface ColumnFilterAddUpdateAction extends Redux.Action {
    columnFilter: IColumnFilter;
}
export interface ColumnFilterClearAllAction extends Redux.Action {
}
export interface ColumnFilterClearAction extends Redux.Action {
    columnId: string;
}
export declare const ColumnFilterAddUpdate: (columnFilter: IColumnFilter) => ColumnFilterAddUpdateAction;
export declare const ColumnFilterClearAll: () => ColumnFilterClearAllAction;
export declare const ColumnFilterClear: (columnId: string) => ColumnFilterClearAction;
export declare const ColumnFilterReducer: Redux.Reducer<ColumnFilterState>;
