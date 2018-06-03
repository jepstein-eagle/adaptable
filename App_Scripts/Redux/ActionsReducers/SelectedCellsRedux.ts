import { SmartEditState, SelectedCellsState } from './Interface/IState';
import { MathOperation, SelectedCellOperation } from '../../Core/Enums';
import * as Redux from 'redux'
import { IPreviewInfo } from '../../Core/Interface/IPreviewResult';
import { ISelectedCellsStrategy, ISelectedCellSummmary } from '../../Strategy/Interface/ISelectedCellsStrategy';
import { isNull } from 'util';

export const SELECTED_CELLS_CHANGE_OPERATION = 'SELECTED_CELLS_CHANGE_OPERATION';
export const SELECTED_CELLS_CREATE_SUMMARY = 'SELECTED_CELLS_CREATE_SUMMARY';
export const SELECTED_CELLS_SET_SUMMARY = 'SELECTED_CELLS_SET_SUMMARY';

export interface SelectedCellsChangeOperationAction extends Redux.Action {
    SelectedCellOperation: SelectedCellOperation
}

export interface SelectedCellsCreateSummaryAction extends Redux.Action {
}

export interface SelectedCellsSetSummaryAction extends Redux.Action {
    SelectedCellSummary: ISelectedCellSummmary
}

export const SelectedCellsChangeOperation = (SelectedCellOperation: SelectedCellOperation): SelectedCellsChangeOperationAction => ({
    type: SELECTED_CELLS_CHANGE_OPERATION,
    SelectedCellOperation
})

export const SelectedCellCreateSummary = (): SelectedCellsCreateSummaryAction => ({
    type: SELECTED_CELLS_CREATE_SUMMARY
})

export const SelectedCellSetSummary = (SelectedCellSummary: ISelectedCellSummmary): SelectedCellsSetSummaryAction => ({
    type: SELECTED_CELLS_SET_SUMMARY,
    SelectedCellSummary
})

const initialSelectedCellsState: SelectedCellsState = {
    SelectedCellOperation: SelectedCellOperation.Sum,
    SelectedCellSummary: null
}

export const SelectedCellsReducer: Redux.Reducer<SelectedCellsState> = (state: SelectedCellsState = initialSelectedCellsState, action: Redux.Action): SelectedCellsState => {
    switch (action.type) {
        case SELECTED_CELLS_CHANGE_OPERATION:
            return Object.assign({}, state, { SelectedCellOperation: (<SelectedCellsChangeOperationAction>action).SelectedCellOperation })
        case SELECTED_CELLS_SET_SUMMARY:
            return Object.assign({}, state, { SelectedCellSummary: (<SelectedCellsSetSummaryAction>action).SelectedCellSummary })
        default:
            return state
    }
}