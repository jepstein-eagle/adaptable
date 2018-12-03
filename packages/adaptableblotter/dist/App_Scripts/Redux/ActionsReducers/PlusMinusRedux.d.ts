import { PlusMinusState } from './Interface/IState';
import * as Redux from 'redux';
import { ICellInfo } from '../../api/Interface/Interfaces';
import { IPlusMinusRule } from '../../api/Interface/IAdaptableBlotterObjects';
export declare const PLUSMINUS_APPLY = "PLUSMINUS_APPLY";
export declare const PLUSMINUS_ADD_UPDATE_CONDITION = "PLUSMINUS_ADD_UPDATE_CONDITION";
export declare const PLUSMINUS_EDIT_CONDITION = "PLUSMINUS_EDIT_CONDITION";
export declare const PLUSMINUS_DELETE_CONDITION = "PLUSMINUS_DELETE_CONDITION";
export interface PlusMinusApplyAction extends Redux.Action {
    CellInfos: ICellInfo[];
    KeyEventString: string;
}
export interface PlusMinusAddUpdateConditionAction extends Redux.Action {
    Index: number;
    PlusMinusRule: IPlusMinusRule;
}
export interface PlusMinusEditConditionAction extends Redux.Action {
    Index: number;
    ColumnDefaultNudge: {
        ColumnId: string;
        DefaultNudge: number;
    };
}
export interface PlusMinusDeleteConditionAction extends Redux.Action {
    Index: number;
}
export declare const PlusMinusApply: (CellInfos: ICellInfo[], KeyEventString: string) => PlusMinusApplyAction;
export declare const PlusMinusAddUpdateCondition: (Index: number, PlusMinusRule: IPlusMinusRule) => PlusMinusAddUpdateConditionAction;
export declare const PlusMinusEditCondition: (Index: number, ColumnDefaultNudge: {
    ColumnId: string;
    DefaultNudge: number;
}) => PlusMinusEditConditionAction;
export declare const PlusMinusDeleteCondition: (Index: number) => PlusMinusDeleteConditionAction;
export declare const PlusMinusReducer: Redux.Reducer<PlusMinusState>;
