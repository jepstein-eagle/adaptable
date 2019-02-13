import { CellSummaryState } from './Interface/IState';
import { CellSumaryOperation } from '../../Utilities/Enums';
import * as Redux from 'redux'
import { SELECTED_CELLS_DEFAULT_OPERATION } from '../../Utilities/Constants/GeneralConstants';

export const CELL_SUMMARY_CHANGE_OPERATION = 'CELL_SUMMARY_CHANGE_OPERATION';

export interface CellSummaryChangeOperationAction extends Redux.Action {
    CellSumaryOperation: CellSumaryOperation
}

export const CellSummaryChangeOperation = (CellSumaryOperation: CellSumaryOperation): CellSummaryChangeOperationAction => ({
    type: CELL_SUMMARY_CHANGE_OPERATION,
    CellSumaryOperation
})

const initialCellSummaryState: CellSummaryState = {
    CellSumaryOperation: SELECTED_CELLS_DEFAULT_OPERATION

}

export const CellSummaryReducer: Redux.Reducer<CellSummaryState> = (state: CellSummaryState = initialCellSummaryState, action: Redux.Action): CellSummaryState => {
    switch (action.type) {
        case CELL_SUMMARY_CHANGE_OPERATION:
            return Object.assign({}, state, { CellSumaryOperation: (<CellSummaryChangeOperationAction>action).CellSumaryOperation })
        default:
            return state
    }
}