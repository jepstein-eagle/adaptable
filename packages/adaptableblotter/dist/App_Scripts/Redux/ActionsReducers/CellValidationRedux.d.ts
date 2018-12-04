import * as Redux from 'redux';
import { CellValidationState } from './Interface/IState';
import { ICellValidationRule } from '../../Api/Interface/IAdaptableBlotterObjects';
import { ActionMode } from '../../Utilities/Enums';
export declare const CELL_VALIDATION_ADD_UPDATE = "CELL_VALIDATION_ADD_UPDATE";
export declare const CELL_VALIDATION_DELETE = "CELL_VALIDATION_DELETE";
export declare const CELL_VALIDATION_CHANGE_MODE = "CELL_VALIDATION_CHANGE_MODE";
export interface CellValidationAddUpdateAction extends Redux.Action {
    Index: number;
    CellValidationRule: ICellValidationRule;
}
export interface CellValidationDeleteAction extends Redux.Action {
    Index: number;
}
export interface CellValidationChangeModeAction extends Redux.Action {
    Index: number;
    ActionMode: ActionMode;
}
export declare const CellValidationAddUpdate: (Index: number, CellValidationRule: ICellValidationRule) => CellValidationAddUpdateAction;
export declare const CellValidationDelete: (Index: number) => CellValidationDeleteAction;
export declare const CellValidationChangeMode: (Index: number, ActionMode: ActionMode) => CellValidationChangeModeAction;
export declare const CellValidationReducer: Redux.Reducer<CellValidationState>;
