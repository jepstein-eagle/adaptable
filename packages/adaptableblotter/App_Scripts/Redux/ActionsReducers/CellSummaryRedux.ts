import { CellSummaryState } from '../../PredefinedConfig/IUserState Interfaces/CellSummaryState';
import {
  CellSummaryOperation,
  CellSummaryOptionalOperation,
} from '../../PredefinedConfig/Common Objects/Enums';
import * as Redux from 'redux';
import { CELL_SUMMARY_DEFAULT_OPERATION } from '../../Utilities/Constants/GeneralConstants';

export const CELL_SUMMARY_CHANGE_OPERATION = 'CELL_SUMMARY_CHANGE_OPERATION';

export interface CellSummaryChangeOperationAction extends Redux.Action {
  SummaryOperation: CellSummaryOperation | CellSummaryOptionalOperation;
}

export const CellSummaryChangeOperation = (
  SummaryOperation: CellSummaryOperation | CellSummaryOptionalOperation
): CellSummaryChangeOperationAction => ({
  type: CELL_SUMMARY_CHANGE_OPERATION,
  SummaryOperation,
});

const initialCellSummaryState: CellSummaryState = {
  SummaryOperation: CELL_SUMMARY_DEFAULT_OPERATION,
  OptionalSummaryOperations: [],
};

export const CellSummaryReducer: Redux.Reducer<CellSummaryState> = (
  state: CellSummaryState = initialCellSummaryState,
  action: Redux.Action
): CellSummaryState => {
  switch (action.type) {
    case CELL_SUMMARY_CHANGE_OPERATION:
      return Object.assign({}, state, {
        SummaryOperation: (<CellSummaryChangeOperationAction>action).SummaryOperation,
      });
    default:
      return state;
  }
};
