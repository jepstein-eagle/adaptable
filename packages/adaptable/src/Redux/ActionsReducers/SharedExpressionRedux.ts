import {
  SharedExpressionState,
  SharedExpression,
} from '../../PredefinedConfig/SharedExpressionState';
import * as Redux from 'redux';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../PredefinedConfig/Uuid';

export const SHAREDEXPRESSION_ADD = 'SHAREDEXPRESSION_ADD';
export const SHAREDEXPRESSION_EDIT = 'SHAREDEXPRESSION_EDIT';
export const SHAREDEXPRESSION_DELETE = 'SHAREDEXPRESSION_DELETE';

export interface SharedExpressionAction extends Redux.Action {
  sharedExpression: SharedExpression;
}

export interface SharedExpressionAddAction extends SharedExpressionAction {}

export interface SharedExpressionEditAction extends SharedExpressionAction {}

export interface SharedExpressionDeleteAction extends SharedExpressionAction {}

export const SharedExpressionAdd = (
  sharedExpression: SharedExpression
): SharedExpressionAddAction => ({
  type: SHAREDEXPRESSION_ADD,
  sharedExpression,
});

export const SharedExpressionEdit = (
  sharedExpression: SharedExpression
): SharedExpressionEditAction => ({
  type: SHAREDEXPRESSION_EDIT,
  sharedExpression,
});

export const SharedExpressionDelete = (
  sharedExpression: SharedExpression
): SharedExpressionDeleteAction => ({
  type: SHAREDEXPRESSION_DELETE,
  sharedExpression,
});

const initialSharedExpressionState: SharedExpressionState = {
  SharedExpressions: EMPTY_ARRAY,
};

export const SharedExpressionReducer: Redux.Reducer<SharedExpressionState> = (
  state: SharedExpressionState = initialSharedExpressionState,
  action: Redux.Action
): SharedExpressionState => {
  let sharedExpressions: SharedExpression[];

  switch (action.type) {
    case SHAREDEXPRESSION_ADD: {
      const actionSharedExpression: SharedExpression = (action as SharedExpressionAction)
        .sharedExpression;

      if (!actionSharedExpression.Uuid) {
        actionSharedExpression.Uuid = createUuid();
      }
      sharedExpressions = [].concat(state.SharedExpressions);
      sharedExpressions.push(actionSharedExpression);
      return { ...state, SharedExpressions: sharedExpressions };
    }

    case SHAREDEXPRESSION_EDIT: {
      const actionSharedExpression: SharedExpression = (action as SharedExpressionAction)
        .sharedExpression;
      return {
        ...state,
        SharedExpressions: state.SharedExpressions.map(abObject =>
          abObject.Uuid === actionSharedExpression.Uuid ? actionSharedExpression : abObject
        ),
      };
    }

    case SHAREDEXPRESSION_DELETE: {
      const actionSharedExpression: SharedExpression = (action as SharedExpressionAction)
        .sharedExpression;
      return {
        ...state,
        SharedExpressions: state.SharedExpressions.filter(
          abObject => abObject.Uuid !== actionSharedExpression.Uuid
        ),
      };
    }

    default:
      return state;
  }
};
