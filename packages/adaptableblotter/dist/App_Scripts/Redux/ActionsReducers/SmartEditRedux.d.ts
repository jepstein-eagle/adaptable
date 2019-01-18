import { SmartEditState } from './Interface/IState';
import { MathOperation } from '../../Utilities/Enums';
import * as Redux from 'redux';
export declare const SMARTEDIT_APPLY = "SMARTEDIT_APPLY";
export declare const SMARTEDIT_CHANGE_VALUE = "SMARTEDIT_CHANGE_VALUE";
export declare const SMARTEDIT_CHANGE_OPERATION = "SMARTEDIT_CHANGE_OPERATION";
export interface SmartEditApplyAction extends Redux.Action {
    bypassCellValidationWarnings: boolean;
}
export interface SmartEditChangeValueAction extends Redux.Action {
    value: number;
}
export interface SmartEditChangeOperationAction extends Redux.Action {
    MathOperation: MathOperation;
}
export declare const SmartEditApply: (bypassCellValidationWarnings: boolean) => SmartEditApplyAction;
export declare const SmartEditChangeValue: (value: number) => SmartEditChangeValueAction;
export declare const SmartEditChangeOperation: (MathOperation: MathOperation) => SmartEditChangeOperationAction;
export declare const SmartEditReducer: Redux.Reducer<SmartEditState>;
