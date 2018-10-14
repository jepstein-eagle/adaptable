import { FreeTextColumnState } from './Interface/IState';
import * as Redux from 'redux';
import { IFreeTextColumn } from '../../Core/Api/Interface/IAdaptableBlotterObjects';
export declare const FreeText_COLUMN_ADD = "FreeText_COLUMN_ADD";
export declare const FreeText_COLUMN_EDIT = "FreeText_COLUMN_EDIT";
export declare const FreeText_COLUMN_DELETE = "FreeText_COLUMN_DELETE";
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
export declare const FreeTextColumnAdd: (FreeTextColumn: IFreeTextColumn) => FreeTextColumnAddAction;
export declare const FreeTextColumnEdit: (Index: number, FreeTextColumn: IFreeTextColumn) => FreeTextColumnEditAction;
export declare const FreeTextColumnDelete: (FreeTextColumn: IFreeTextColumn) => FreeTextColumnDeleteAction;
export declare const FreeTextColumnReducer: Redux.Reducer<FreeTextColumnState>;
