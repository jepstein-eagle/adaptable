import * as Redux from 'redux';
import { ConditionalStyleState } from './Interface/IState';
import { IConditionalStyle } from '../../Utilities/Interface/BlotterObjects/IConditionalStyle';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../Utilities/Uuid';

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
      const actionTypedAdd = <ConditionalStyleAddAction>action;
      const actionConditionalStyle: IConditionalStyle = (action as ConditionalStyleAddAction)
        .conditionalStyle;

      if (!actionConditionalStyle.Uuid) {
        actionConditionalStyle.Uuid = createUuid();
      }
      conditions = [].concat(state.ConditionalStyles);
      conditions.push(actionTypedAdd.conditionalStyle);
      return { ...state, ConditionalStyles: conditions };
    }
    case CONDITIONAL_STYLE_EDIT:
      const actionConditionalStyle: IConditionalStyle = (action as ConditionalStyleEditAction)
        .conditionalStyle;

      return {
        ...state,
        ConditionalStyles: state.ConditionalStyles.map(c =>
          c.Uuid === actionConditionalStyle.Uuid ? actionConditionalStyle : c
        ),
      };
    case CONDITIONAL_STYLE_DELETE: {
      const actionTypedDelete = <ConditionalStyleDeleteAction>action;
      const actionConditionalStyle: IConditionalStyle = (action as ConditionalStyleDeleteAction)
        .conditionalStyle;
      conditions = [].concat(state.ConditionalStyles);
      conditions.splice(actionTypedDelete.Index, 1);
      return {
        ...state,
        ConditionalStyles: state.ConditionalStyles.filter(
          c => c.Uuid !== actionConditionalStyle.Uuid
        ),
      };
    }
    default:
      return state;
  }
};
