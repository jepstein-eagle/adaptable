import { SelectedCellsState } from './Interface/IState';
import { SelectedCellOperation } from '../../Core/Enums';
import * as Redux from 'redux'

export const SELECTED_CELLS_CHANGE_OPERATION = 'SELECTED_CELLS_CHANGE_OPERATION';

export interface SelectedCellsChangeOperationAction extends Redux.Action {
    SelectedCellOperation: SelectedCellOperation
}

export const SelectedCellsChangeOperation = (SelectedCellOperation: SelectedCellOperation): SelectedCellsChangeOperationAction => ({
    type: SELECTED_CELLS_CHANGE_OPERATION,
    SelectedCellOperation
})

const initialSelectedCellsState: SelectedCellsState = {
    SelectedCellOperation: SelectedCellOperation.Sum,
    
}

export const SelectedCellsReducer: Redux.Reducer<SelectedCellsState> = (state: SelectedCellsState = initialSelectedCellsState, action: Redux.Action): SelectedCellsState => {
    switch (action.type) {
        case SELECTED_CELLS_CHANGE_OPERATION:
            return Object.assign({}, state, { SelectedCellOperation: (<SelectedCellsChangeOperationAction>action).SelectedCellOperation })
        default:
            return state
    }
}