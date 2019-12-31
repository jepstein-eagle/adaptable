import { CellSummaryState } from '../../PredefinedConfig/CellSummaryState';
import { CellSummaryOperation } from '../../PredefinedConfig/Common/Enums';
import * as Redux from 'redux';
import { CELL_SUMMARY_DEFAULT_OPERATION } from '../../Utilities/Constants/GeneralConstants';

export const CELL_SUMMARY_CHANGE_OPERATION = 'CELL_SUMMARY_CHANGE_OPERATION';

export interface CellSummaryChangeOperationAction extends Redux.Action {
  SummaryOperation: CellSummaryOperation | string;
}

export const CellSummaryChangeOperation = (
  SummaryOperation: CellSummaryOperation | string
): CellSummaryChangeOperationAction => ({
  type: CELL_SUMMARY_CHANGE_OPERATION,
  SummaryOperation,
});

const initialCellSummaryState: CellSummaryState = {
  SummaryOperation: CELL_SUMMARY_DEFAULT_OPERATION,
};

export const CellSummaryReducer: Redux.Reducer<CellSummaryState> = (
  state: CellSummaryState = initialCellSummaryState,
  action: Redux.Action
): CellSummaryState => {
  switch (action.type) {
    case CELL_SUMMARY_CHANGE_OPERATION:
      return Object.assign({}, state, {
        SummaryOperation: (action as CellSummaryChangeOperationAction).SummaryOperation,
      });
    default:
      return state;
  }
};
