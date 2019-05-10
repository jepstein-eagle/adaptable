import * as Redux from 'redux';
import { CellValidationState } from './Interface/IState';
import { ICellValidationRule } from '../../Utilities/Interface/BlotterObjects/ICellValidationRule';
import { ActionMode } from '../../Utilities/Enums';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';

export const CELL_VALIDATION_ADD_UPDATE = 'CELL_VALIDATION_ADD_UPDATE';
export const CELL_VALIDATION_DELETE = 'CELL_VALIDATION_DELETE';
export const CELL_VALIDATION_CHANGE_MODE = 'CELL_VALIDATION_CHANGE_MODE';

export interface CellValidationAddUpdateAction extends Redux.Action {
  index: number;
  cellValidationRule: ICellValidationRule;
}

export interface CellValidationDeleteAction extends Redux.Action {
  index: number;
}

export interface CellValidationChangeModeAction extends Redux.Action {
  index: number;
  ActionMode: ActionMode;
}

export const CellValidationAddUpdate = (
  index: number,
  cellValidationRule: ICellValidationRule
): CellValidationAddUpdateAction => ({
  type: CELL_VALIDATION_ADD_UPDATE,
  index,
  cellValidationRule,
});

export const CellValidationDelete = (index: number): CellValidationDeleteAction => ({
  type: CELL_VALIDATION_DELETE,
  index,
});

export const CellValidationChangeMode = (
  index: number,
  ActionMode: ActionMode
): CellValidationChangeModeAction => ({
  type: CELL_VALIDATION_CHANGE_MODE,
  index,
  ActionMode,
});

const initialCellValidationState: CellValidationState = {
  CellValidations: EMPTY_ARRAY,
};

export const CellValidationReducer: Redux.Reducer<CellValidationState> = (
  state: CellValidationState = initialCellValidationState,
  action: Redux.Action
): CellValidationState => {
  let cellValidations: ICellValidationRule[];

  switch (action.type) {
    case CELL_VALIDATION_ADD_UPDATE: {
      let actionTyped = <CellValidationAddUpdateAction>action;
      cellValidations = [].concat(state.CellValidations);
      if (actionTyped.index == -1) {
        cellValidations.push(actionTyped.cellValidationRule);
      } else {
        cellValidations[actionTyped.index] = actionTyped.cellValidationRule;
      }
      return Object.assign({}, state, { CellValidations: cellValidations });
    }

    case CELL_VALIDATION_DELETE: {
      cellValidations = [].concat(state.CellValidations);
      cellValidations.splice((<CellValidationDeleteAction>action).index, 1);
      return Object.assign({}, state, { CellValidations: cellValidations });
    }

    case CELL_VALIDATION_CHANGE_MODE: {
      let actionTyped = <CellValidationChangeModeAction>action;
      cellValidations = [].concat(state.CellValidations);
      let cellValidation = cellValidations[actionTyped.index];
      cellValidations[actionTyped.index] = Object.assign({}, cellValidation, {
        ActionMode: actionTyped.ActionMode,
      });
      return Object.assign({}, state, { CellValidations: cellValidations });
    }

    default:
      return state;
  }
};
