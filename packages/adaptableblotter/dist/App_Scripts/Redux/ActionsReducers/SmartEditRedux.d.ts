import { SmartEditState } from './Interface/IState';
import { MathOperation } from '../../Core/Enums';
import * as Redux from 'redux';
import { IPreviewInfo } from '../../Core/Interface/IPreviewResult';
export declare const SMARTEDIT_APPLY = "SMARTEDIT_APPLY";
export declare const SMARTEDIT_CHANGE_VALUE = "SMARTEDIT_CHANGE_VALUE";
export declare const SMARTEDIT_CHANGE_OPERATION = "SMARTEDIT_CHANGE_OPERATION";
export declare const SMARTEDIT_CHECK_CELL_SELECTION = "SMARTEDIT_CHECK_CELL_SELECTION";
export declare const SMARTEDIT_FETCH_PREVIEW = "SMARTEDIT_FETCH_PREVIEW";
export declare const SMARTEDIT_SET_VALID_SELECTION = "SMARTEDIT_SET_VALID_SELECTION";
export declare const SMARTEDIT_SET_PREVIEW = "SMARTEDIT_SET_PREVIEW";
export interface SmartEditApplyAction extends Redux.Action {
    bypassCellValidationWarnings: boolean;
}
export interface SmartEditChangeValueAction extends Redux.Action {
    value: number;
}
export interface SmartEditChangeOperationAction extends Redux.Action {
    MathOperation: MathOperation;
}
export interface SmartEditCheckCellSelectionAction extends Redux.Action {
}
export interface SmartEditFetchPreviewAction extends Redux.Action {
}
export interface SmartEditSetPreviewAction extends Redux.Action {
    PreviewInfo: IPreviewInfo;
}
export interface SmartEditSetValidSelectionAction extends Redux.Action {
    IsValidSelection: boolean;
}
export declare const SmartEditApply: (bypassCellValidationWarnings: boolean) => SmartEditApplyAction;
export declare const SmartEditChangeValue: (value: number) => SmartEditChangeValueAction;
export declare const SmartEditChangeOperation: (MathOperation: MathOperation) => SmartEditChangeOperationAction;
export declare const SmartEditCheckCellSelection: () => SmartEditCheckCellSelectionAction;
export declare const SmartEditSetValidSelection: (IsValidSelection: boolean) => SmartEditSetValidSelectionAction;
export declare const SmartEditSetPreview: (PreviewInfo: IPreviewInfo) => SmartEditSetPreviewAction;
export declare const SmartEditReducer: Redux.Reducer<SmartEditState>;
