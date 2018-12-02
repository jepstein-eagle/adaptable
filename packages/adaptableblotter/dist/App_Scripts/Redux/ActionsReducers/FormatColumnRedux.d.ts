import { FormatColumnState } from './Interface/IState';
import * as Redux from 'redux';
import { IFormatColumn } from '../../Api/Interface/IAdaptableBlotterObjects';
export declare const FORMAT_COLUMN_ADD = "FORMAT_COLUMN_ADD";
export declare const FORMAT_COLUMN_EDIT = "FORMAT_COLUMN_EDIT";
export declare const FORMAT_COLUMN_DELETE = "FORMAT_COLUMN_DELETE";
export interface FormatColumnAddAction extends Redux.Action {
    FormatColumn: IFormatColumn;
}
export interface FormatColumnEditAction extends Redux.Action {
    FormatColumn: IFormatColumn;
}
export interface FormatColumnDeleteAction extends Redux.Action {
    FormatColumn: IFormatColumn;
}
export declare const FormatColumnAdd: (FormatColumn: IFormatColumn) => FormatColumnAddAction;
export declare const FormatColumnEdit: (FormatColumn: IFormatColumn) => FormatColumnEditAction;
export declare const FormatColumnDelete: (FormatColumn: IFormatColumn) => FormatColumnDeleteAction;
export declare const FormatColumnReducer: Redux.Reducer<FormatColumnState>;
