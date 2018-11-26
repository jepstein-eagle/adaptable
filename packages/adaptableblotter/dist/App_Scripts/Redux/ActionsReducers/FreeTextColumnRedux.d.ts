import { FreeTextColumnState } from './Interface/IState';
import * as Redux from 'redux';
import { IFreeTextColumn } from '../../Core/Api/Interface/IAdaptableBlotterObjects';
import { FreeTextStoredValue } from '../../View/UIInterfaces';
export declare const FREE_TEXT_COLUMN_ADD = "FREE_TEXT_COLUMN_ADD";
export declare const FREE_TEXT_COLUMN_EDIT = "FREE_TEXT_COLUMN_EDIT";
export declare const FREE_TEXT_COLUMN_DELETE = "FREE_TEXT_COLUMN_DELETE";
export declare const FREE_TEXT_COLUMN_ADD_EDIT_STORED_VALUE = "FREE_TEXT_COLUMN_ADD_EDIT_STORED_VALUE";
export interface FreeTextColumnAddAction extends Redux.Action {
    FreeTextColumn: IFreeTextColumn;
}
export interface FreeTextColumnEditAction extends Redux.Action {
    Index: number;
    FreeTextColumn: IFreeTextColumn;
}
export interface FreeTextColumnDeleteAction extends Redux.Action {
    FreeTextColumn: IFreeTextColumn;
}
export interface FreeTextColumnAddEditStoredValueAction extends Redux.Action {
    FreeTextColumn: IFreeTextColumn;
    FreeTextStoredValue: FreeTextStoredValue;
}
export declare const FreeTextColumnAdd: (FreeTextColumn: IFreeTextColumn) => FreeTextColumnAddAction;
export declare const FreeTextColumnEdit: (Index: number, FreeTextColumn: IFreeTextColumn) => FreeTextColumnEditAction;
export declare const FreeTextColumnDelete: (FreeTextColumn: IFreeTextColumn) => FreeTextColumnDeleteAction;
export declare const FreeTextColumnAddEditStoredValue: (FreeTextColumn: IFreeTextColumn, FreeTextStoredValue: FreeTextStoredValue) => FreeTextColumnAddEditStoredValueAction;
export declare const FreeTextColumnReducer: Redux.Reducer<FreeTextColumnState>;
