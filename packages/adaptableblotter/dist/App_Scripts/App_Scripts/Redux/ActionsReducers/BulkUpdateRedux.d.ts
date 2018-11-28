import { BulkUpdateState } from './Interface/IState';
import * as Redux from 'redux';
export declare const BULK_UPDATE_APPLY = "BULK_UPDATE_APPLY";
export declare const BULK_UPDATE_CHANGE_VALUE = "BULK_UPDATE_CHANGE_VALUE";
export interface BulkUpdateApplyAction extends Redux.Action {
    bypassCellValidationWarnings: boolean;
}
export interface BulkUpdateChangeValueAction extends Redux.Action {
    value: string;
}
export declare const BulkUpdateApply: (bypassCellValidationWarnings: boolean) => BulkUpdateApplyAction;
export declare const BulkUpdateChangeValue: (value: string) => BulkUpdateChangeValueAction;
export declare const BulkUpdateReducer: Redux.Reducer<BulkUpdateState>;
