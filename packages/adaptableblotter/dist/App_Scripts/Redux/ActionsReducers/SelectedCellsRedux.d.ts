import { SelectedCellsState } from './Interface/IState';
import { SelectedCellOperation } from '../../Core/Enums';
import * as Redux from 'redux';
export declare const SELECTED_CELLS_CHANGE_OPERATION = "SELECTED_CELLS_CHANGE_OPERATION";
export interface SelectedCellsChangeOperationAction extends Redux.Action {
    SelectedCellOperation: SelectedCellOperation;
}
export declare const SelectedCellsChangeOperation: (SelectedCellOperation: SelectedCellOperation) => SelectedCellsChangeOperationAction;
export declare const SelectedCellsReducer: Redux.Reducer<SelectedCellsState>;
