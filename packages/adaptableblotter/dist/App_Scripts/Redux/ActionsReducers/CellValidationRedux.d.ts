import * as Redux from 'redux';
import { CellValidationState } from './Interface/IState';
import { ICellValidationRule } from "../../Utilities/Interface/BlotterObjects/ICellValidationRule";
import { ActionMode } from '../../Utilities/Enums';
export declare const CELL_VALIDATION_ADD_UPDATE = "CELL_VALIDATION_ADD_UPDATE";
export declare const CELL_VALIDATION_DELETE = "CELL_VALIDATION_DELETE";
export declare const CELL_VALIDATION_CHANGE_MODE = "CELL_VALIDATION_CHANGE_MODE";
export interface CellValidationAddUpdateAction extends Redux.Action {
    index: number;
    cellValidationRule: ICellValidationRule;
}
export interface CellValidationDeleteAction extends Redux.Action {
    index: number;
}
export interface CellValidationChangeModeAction extends Redux.Action {
    index: number;
    ActionMode: ActionMode;
}
export declare const CellValidationAddUpdate: (index: number, cellValidationRule: ICellValidationRule) => CellValidationAddUpdateAction;
export declare const CellValidationDelete: (index: number) => CellValidationDeleteAction;
export declare const CellValidationChangeMode: (index: number, ActionMode: ActionMode) => CellValidationChangeModeAction;
export declare const CellValidationReducer: Redux.Reducer<CellValidationState>;
