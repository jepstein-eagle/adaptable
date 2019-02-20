import { CellSummaryState } from './Interface/IState';
import { CellSumaryOperation, CellSumaryOptionalOperation } from '../../Utilities/Enums';
import * as Redux from 'redux'
import { SELECTED_CELLS_DEFAULT_OPERATION } from '../../Utilities/Constants/GeneralConstants';

export const CELL_SUMMARY_CHANGE_OPERATION = 'CELL_SUMMARY_CHANGE_OPERATION';

export interface CellSummaryChangeOperationAction extends Redux.Action {
    SummaryOperation: CellSumaryOperation | CellSumaryOptionalOperation
}

export const CellSummaryChangeOperation = (SummaryOperation: CellSumaryOperation| CellSumaryOptionalOperation): CellSummaryChangeOperationAction => ({
    type: CELL_SUMMARY_CHANGE_OPERATION,
    SummaryOperation
})

const initialCellSummaryState: CellSummaryState = {
    SummaryOperation: SELECTED_CELLS_DEFAULT_OPERATION,
    SystemSummaryOperations: []

}

export const CellSummaryReducer: Redux.Reducer<CellSummaryState> = (state: CellSummaryState = initialCellSummaryState, action: Redux.Action): CellSummaryState => {
    switch (action.type) {
        case CELL_SUMMARY_CHANGE_OPERATION:
            return Object.assign({}, state, { SummaryOperation: (<CellSummaryChangeOperationAction>action).SummaryOperation })
        default:
            return state
    }
}
