import { BulkUpdateState } from './Interface/IState';
import * as Redux from 'redux';
import { IPreviewInfo } from '../../Core/Interface/IPreviewResult';
export declare const BULK_UPDATE_APPLY = "BULK_UPDATE_APPLY";
export declare const BULK_UPDATE_CHANGE_VALUE = "BULK_UPDATE_CHANGE_VALUE";
export declare const BULK_UPDATE_CHECK_CELL_SELECTION = "BULK_UPDATE_CHECK_CELL_SELECTION";
export declare const BULK_UPDATE_SET_VALID_SELECTION = "BULK_UPDATE_SET_VALID_SELECTION";
export declare const BULK_UPDATE_SET_PREVIEW = "BULK_UPDATE_SET_PREVIEW";
export interface BulkUpdateApplyAction extends Redux.Action {
    bypassCellValidationWarnings: boolean;
}
export interface BulkUpdateChangeValueAction extends Redux.Action {
    value: string;
}
export interface BulkUpdateCheckCellSelectionAction extends Redux.Action {
}
export interface BulkUpdateSetPreviewAction extends Redux.Action {
    PreviewInfo: IPreviewInfo;
}
export interface BulkUpdateSetValidSelectionAction extends Redux.Action {
    IsValidSelection: boolean;
}
export declare const BulkUpdateApply: (bypassCellValidationWarnings: boolean) => BulkUpdateApplyAction;
export declare const BulkUpdateChangeValue: (value: string) => BulkUpdateChangeValueAction;
export declare const BulkUpdateCheckCellSelection: () => BulkUpdateCheckCellSelectionAction;
export declare const BulkUpdateSetValidSelection: (IsValidSelection: boolean) => BulkUpdateSetValidSelectionAction;
export declare const BulkUpdateSetPreview: (PreviewInfo: IPreviewInfo) => BulkUpdateSetPreviewAction;
export declare const BulkUpdateReducer: Redux.Reducer<BulkUpdateState>;
