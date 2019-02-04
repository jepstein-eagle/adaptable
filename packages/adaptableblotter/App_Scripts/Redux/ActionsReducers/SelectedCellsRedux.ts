import { SelectedCellsState } from './Interface/IState';
import { SelectedCellOperation } from '../../Utilities/Enums';
import * as Redux from 'redux'
import { SELECTED_CELLS_DEFAULT_OPERATION } from '../../Utilities/Constants/GeneralConstants';

export const SELECTED_CELLS_CHANGE_OPERATION = 'SELECTED_CELLS_CHANGE_OPERATION';

export interface SelectedCellsChangeOperationAction extends Redux.Action {
    SelectedCellOperation: SelectedCellOperation
}

export const SelectedCellsChangeOperation = (SelectedCellOperation: SelectedCellOperation): SelectedCellsChangeOperationAction => ({
    type: SELECTED_CELLS_CHANGE_OPERATION,
    SelectedCellOperation
})

const initialSelectedCellsState: SelectedCellsState = {
    SelectedCellOperation: SELECTED_CELLS_DEFAULT_OPERATION

}

export const SelectedCellsReducer: Redux.Reducer<SelectedCellsState> = (state: SelectedCellsState = initialSelectedCellsState, action: Redux.Action): SelectedCellsState => {
    switch (action.type) {
        case SELECTED_CELLS_CHANGE_OPERATION:
            return Object.assign({}, state, { SelectedCellOperation: (<SelectedCellsChangeOperationAction>action).SelectedCellOperation })
        default:
            return state
    }
}