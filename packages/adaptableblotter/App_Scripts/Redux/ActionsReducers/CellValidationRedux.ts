import * as Redux from 'redux';
import { CellValidationState } from './Interface/IState';
import { ICellValidationRule } from '../../Utilities/Interface/BlotterObjects/ICellValidationRule';
import { ActionMode } from '../../Utilities/Enums';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../Utilities/Uuid';

export const CELL_VALIDATION_ADD = 'CELL_VALIDATION_ADD';
export const CELL_VALIDATION_EDIT = 'CELL_VALIDATION_EDIT';
export const CELL_VALIDATION_DELETE = 'CELL_VALIDATION_DELETE';
export const CELL_VALIDATION_CHANGE_MODE = 'CELL_VALIDATION_CHANGE_MODE';

export interface CellValidationAction extends Redux.Action {
  cellValidationRule: ICellValidationRule;
}

export interface CellValidationAddAction extends CellValidationAction {}

export interface CellValidationEditAction extends CellValidationAction {}

export interface CellValidationDeleteAction extends CellValidationAction {}

export const CellValidationAdd = (
  cellValidationRule: ICellValidationRule
): CellValidationAddAction => ({
  type: CELL_VALIDATION_ADD,
  cellValidationRule,
});

export const CellValidationEdit = (
  cellValidationRule: ICellValidationRule
): CellValidationEditAction => ({
  type: CELL_VALIDATION_EDIT,
  cellValidationRule,
});

export const CellValidationDelete = (
  cellValidationRule: ICellValidationRule
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
  let cellValidations: ICellValidationRule[];

  switch (action.type) {
    case CELL_VALIDATION_ADD: {
      const actionCellValidationRule: ICellValidationRule = (action as CellValidationAction)
        .cellValidationRule;

      if (!actionCellValidationRule.Uuid) {
        actionCellValidationRule.Uuid = createUuid();
      }
      cellValidations = [].concat(state.CellValidations);
      cellValidations.push(actionCellValidationRule);
      return { ...state, CellValidations: cellValidations };
    }
    case CELL_VALIDATION_EDIT: {
      const actionCellValidationRule: ICellValidationRule = (action as CellValidationAction)
        .cellValidationRule;

      return {
        ...state,
        CellValidations: state.CellValidations.map(abObject =>
          abObject.Uuid === actionCellValidationRule.Uuid ? actionCellValidationRule : abObject
        ),
      };
    }

    case CELL_VALIDATION_DELETE: {
      const actionCellValidationRule: ICellValidationRule = (action as CellValidationAction)
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
