import {
  CellSummaryState,
  CellSummaryOperationDefinition,
} from '../../PredefinedConfig/CellSummaryState';
import { CellSummaryOperation } from '../../PredefinedConfig/Common/Enums';
import * as Redux from 'redux';
import {
  CELL_SUMMARY_DEFAULT_OPERATION,
  EMPTY_ARRAY,
} from '../../Utilities/Constants/GeneralConstants';

export const CELL_SUMMARY_CHANGE_OPERATION = 'CELL_SUMMARY_CHANGE_OPERATION';

export const CELL_SUMMARY_OPERATION_DEFINITIONS_SET = 'CELL_SUMMARY_OPERATION_DEFINITIONS_SET';

export interface CellSummaryChangeOperationAction extends Redux.Action {
  SummaryOperation: CellSummaryOperation | string;
}

export interface CellSummaryOperationDefinitionssSetAction extends Redux.Action {
  operationDefinitions: CellSummaryOperationDefinition[];
}

export const CellSummaryChangeOperation = (
  SummaryOperation: CellSummaryOperation | string
): CellSummaryChangeOperationAction => ({
  type: CELL_SUMMARY_CHANGE_OPERATION,
  SummaryOperation,
});

export const CellSummaryOperationDefinitionsSet = (
  operationDefinitions: CellSummaryOperationDefinition[]
): CellSummaryOperationDefinitionssSetAction => ({
  type: CELL_SUMMARY_OPERATION_DEFINITIONS_SET,
  operationDefinitions,
});

const initialCellSummaryState: CellSummaryState = {
  SummaryOperation: CELL_SUMMARY_DEFAULT_OPERATION,
  CellSummaryOperationDefinitions: EMPTY_ARRAY,
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

    case CELL_SUMMARY_OPERATION_DEFINITIONS_SET: {
      return {
        ...state,
        CellSummaryOperationDefinitions: (action as CellSummaryOperationDefinitionssSetAction)
          .operationDefinitions,
      };
    }

    default:
      return state;
  }
};
