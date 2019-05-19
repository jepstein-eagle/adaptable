import { ConditionalStyleState } from './Interface/IState';
import * as Redux from 'redux';
import { IConditionalStyle } from '../../Utilities/Interface/BlotterObjects/IConditionalStyle';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';

export const CONDITIONAL_STYLE_ADD = 'CONDITIONAL_STYLE_ADD';
export const CONDITIONAL_STYLE_EDIT = 'CONDITIONAL_STYLE_EDIT';
export const CONDITIONAL_STYLE_DELETE = 'CONDITIONAL_STYLE_DELETE';

export interface ConditionalStyleAddAction extends Redux.Action {
  conditionalStyle: IConditionalStyle;
}

export const ConditionalStyleAdd = (
  conditionalStyle: IConditionalStyle
): ConditionalStyleAddAction => ({
  type: CONDITIONAL_STYLE_ADD,
  conditionalStyle,
});

export interface ConditionalStyleEditAction extends Redux.Action {
  Index: number;
  conditionalStyle: IConditionalStyle;
}

export const ConditionalStyleEdit = (
  Index: number,
  conditionalStyle: IConditionalStyle
): ConditionalStyleEditAction => ({
  type: CONDITIONAL_STYLE_EDIT,
  Index,
  conditionalStyle,
});

export interface ConditionalStyleDeleteAction extends Redux.Action {
  Index: number;
  conditionalStyle: IConditionalStyle;
}

export const ConditionalStyleDelete = (
  Index: number,
  conditionalStyle: IConditionalStyle
): ConditionalStyleDeleteAction => ({
  type: CONDITIONAL_STYLE_DELETE,
  Index,
  conditionalStyle,
});

const initialConditionalStyleState: ConditionalStyleState = {
  ConditionalStyles: EMPTY_ARRAY,
};

export const ConditionalStyleReducer: Redux.Reducer<ConditionalStyleState> = (
  state: ConditionalStyleState = initialConditionalStyleState,
  action: Redux.Action
): ConditionalStyleState => {
  let conditions: IConditionalStyle[];

  switch (action.type) {
    case CONDITIONAL_STYLE_ADD: {
      let actionTypedAdd = <ConditionalStyleAddAction>action;
      conditions = [].concat(state.ConditionalStyles);
      conditions.push(actionTypedAdd.conditionalStyle);
      return Object.assign({}, state, { ConditionalStyles: conditions });
    }
    case CONDITIONAL_STYLE_EDIT:
      let actionTypedEdit = <ConditionalStyleEditAction>action;
      conditions = [].concat(state.ConditionalStyles);
      conditions[actionTypedEdit.Index] = actionTypedEdit.conditionalStyle;
      return Object.assign({}, state, { ConditionalStyles: conditions });
    case CONDITIONAL_STYLE_DELETE:
      let actionTypedDelete = <ConditionalStyleDeleteAction>action;
      conditions = [].concat(state.ConditionalStyles);
      conditions.splice(actionTypedDelete.Index, 1);
      return Object.assign({}, state, { ConditionalStyles: conditions });
    default:
      return state;
  }
};
