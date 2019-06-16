import * as Redux from 'redux';
import {
  CellValidationState,
  CellValidationRule,
} from '../../PredefinedConfig/IUserState/CellValidationState';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../PredefinedConfig/Uuid';

export const CELL_VALIDATION_ADD = 'CELL_VALIDATION_ADD';
export const CELL_VALIDATION_EDIT = 'CELL_VALIDATION_EDIT';
export const CELL_VALIDATION_DELETE = 'CELL_VALIDATION_DELETE';
export const CELL_VALIDATION_CHANGE_MODE = 'CELL_VALIDATION_CHANGE_MODE';

export interface CellValidationAction extends Redux.Action {
  cellValidationRule: CellValidationRule;
}

export interface CellValidationAddAction extends CellValidationAction {}

export interface CellValidationEditAction extends CellValidationAction {}

export interface CellValidationDeleteAction extends CellValidationAction {}

export const CellValidationAdd = (
  cellValidationRule: CellValidationRule
): CellValidationAddAction => ({
  type: CELL_VALIDATION_ADD,
  cellValidationRule,
});

export const CellValidationEdit = (
  cellValidationRule: CellValidationRule
): CellValidationEditAction => ({
  type: CELL_VALIDATION_EDIT,
  cellValidationRule,
});

export const CellValidationDelete = (
  cellValidationRule: CellValidationRule
): CellValidationDeleteAction => ({
  type: CELL_VALIDATION_DELETE,
  cellValidationRule,
});

const initialCellValidationState: CellValidationState = {
  CellValidations: EMPTY_ARRAY,
};

export const CellValidationReducer: Redux.Reducer<CellValidationState> = (
  state: CellValidationState = initialCellValidationState,
  action: Redux.Action
): CellValidationState => {
  let cellValidations: CellValidationRule[];

  switch (action.type) {
    case CELL_VALIDATION_ADD: {
      const actionCellValidationRule: CellValidationRule = (action as CellValidationAction)
        .cellValidationRule;

      if (!actionCellValidationRule.Uuid) {
        actionCellValidationRule.Uuid = createUuid();
      }
      cellValidations = [].concat(state.CellValidations);
      cellValidations.push(actionCellValidationRule);
      return { ...state, CellValidations: cellValidations };
    }
    case CELL_VALIDATION_EDIT: {
      const actionCellValidationRule: CellValidationRule = (action as CellValidationAction)
        .cellValidationRule;

      return {
        ...state,
        CellValidations: state.CellValidations.map(abObject =>
          abObject.Uuid === actionCellValidationRule.Uuid ? actionCellValidationRule : abObject
        ),
      };
    }

    case CELL_VALIDATION_DELETE: {
      const actionCellValidationRule: CellValidationRule = (action as CellValidationAction)
        .cellValidationRule;
      return {
        ...state,
        CellValidations: state.CellValidations.filter(
          abObject => abObject.Uuid !== actionCellValidationRule.Uuid
        ),
      };
    }

    default:
      return state;
  }
};
