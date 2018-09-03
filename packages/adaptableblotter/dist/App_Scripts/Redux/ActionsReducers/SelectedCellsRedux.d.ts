import { SelectedCellsState } from './Interface/IState';
import { SelectedCellOperation } from '../../Core/Enums';
import * as Redux from 'redux';
import { ISelectedCellSummmary } from '../../Strategy/Interface/ISelectedCellsStrategy';
export declare const SELECTED_CELLS_CHANGE_OPERATION = "SELECTED_CELLS_CHANGE_OPERATION";
export declare const SELECTED_CELLS_CREATE_SUMMARY = "SELECTED_CELLS_CREATE_SUMMARY";
export declare const SELECTED_CELLS_SET_SUMMARY = "SELECTED_CELLS_SET_SUMMARY";
export interface SelectedCellsChangeOperationAction extends Redux.Action {
    SelectedCellOperation: SelectedCellOperation;
}
export interface SelectedCellsCreateSummaryAction extends Redux.Action {
}
export interface SelectedCellsSetSummaryAction extends Redux.Action {
    SelectedCellSummary: ISelectedCellSummmary;
}
export declare const SelectedCellsChangeOperation: (SelectedCellOperation: SelectedCellOperation) => SelectedCellsChangeOperationAction;
export declare const SelectedCellCreateSummary: () => SelectedCellsCreateSummaryAction;
export declare const SelectedCellSetSummary: (SelectedCellSummary: ISelectedCellSummmary) => SelectedCellsSetSummaryAction;
export declare const SelectedCellsReducer: Redux.Reducer<SelectedCellsState>;
