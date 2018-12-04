import { ColumnCategoryState } from './Interface/IState';
import * as Redux from 'redux';
import { IColumnCategory } from '../../Api/Interface/Interfaces';
export declare const COLUMN_CATEGORY_ADD = "COLUMN_CATEGORY_ADD";
export declare const COLUMN_CATEGORY_EDIT = "COLUMN_CATEGORY_EDIT";
export declare const COLUMN_CATEGORY_DELETE = "COLUMN_CATEGORY_DELETE";
export interface ColumnCategoryAddAction extends Redux.Action {
    ColumnCategory: IColumnCategory;
}
export interface ColumnCategoryEditAction extends Redux.Action {
    Index: number;
    ColumnCategory: IColumnCategory;
}
export interface ColumnCategoryDeleteAction extends Redux.Action {
    ColumnCategory: IColumnCategory;
}
export declare const ColumnCategoryAdd: (ColumnCategory: IColumnCategory) => ColumnCategoryAddAction;
export declare const ColumnCategoryEdit: (Index: number, ColumnCategory: IColumnCategory) => ColumnCategoryEditAction;
export declare const ColumnCategoryDelete: (ColumnCategory: IColumnCategory) => ColumnCategoryDeleteAction;
export declare const ColumnCategoryReducer: Redux.Reducer<ColumnCategoryState>;
