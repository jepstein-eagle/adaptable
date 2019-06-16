import * as Redux from 'redux';
import {
  ConditionalStyleState,
  ConditionalStyle,
} from '../../PredefinedConfig/IUserState/ConditionalStyleState';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../PredefinedConfig/Uuid';

export const CONDITIONAL_STYLE_ADD = 'CONDITIONAL_STYLE_ADD';
export const CONDITIONAL_STYLE_EDIT = 'CONDITIONAL_STYLE_EDIT';
export const CONDITIONAL_STYLE_DELETE = 'CONDITIONAL_STYLE_DELETE';

export interface ConditionalStyleAction extends Redux.Action {
  conditionalStyle: ConditionalStyle;
}
export interface ConditionalStyleAddAction extends ConditionalStyleAction {}
export interface ConditionalStyleEditAction extends ConditionalStyleAction {}
export interface ConditionalStyleDeleteAction extends ConditionalStyleAction {}

export const ConditionalStyleAdd = (
  conditionalStyle: ConditionalStyle
): ConditionalStyleAction => ({
  type: CONDITIONAL_STYLE_ADD,
  conditionalStyle,
});

export const ConditionalStyleEdit = (
  conditionalStyle: ConditionalStyle
): ConditionalStyleAction => ({
  type: CONDITIONAL_STYLE_EDIT,
  conditionalStyle,
});

export const ConditionalStyleDelete = (
  conditionalStyle: ConditionalStyle
): ConditionalStyleAction => ({
  type: CONDITIONAL_STYLE_DELETE,
  conditionalStyle,
});

const initialConditionalStyleState: ConditionalStyleState = {
  ConditionalStyles: EMPTY_ARRAY,
};

export const ConditionalStyleReducer: Redux.Reducer<ConditionalStyleState> = (
  state: ConditionalStyleState = initialConditionalStyleState,
  action: Redux.Action
): ConditionalStyleState => {
  let conditions: ConditionalStyle[];

  switch (action.type) {
    case CONDITIONAL_STYLE_ADD: {
      const actionConditionalStyle: ConditionalStyle = (action as ConditionalStyleAction)
        .conditionalStyle;

      if (!actionConditionalStyle.Uuid) {
        actionConditionalStyle.Uuid = createUuid();
      }
      conditions = [].concat(state.ConditionalStyles);
      conditions.push(actionConditionalStyle);
      return { ...state, ConditionalStyles: conditions };
    }

    case CONDITIONAL_STYLE_EDIT:
      const actionConditionalStyle: ConditionalStyle = (action as ConditionalStyleAction)
        .conditionalStyle;
      return {
        ...state,
        ConditionalStyles: state.ConditionalStyles.map(abObject =>
          abObject.Uuid === actionConditionalStyle.Uuid ? actionConditionalStyle : abObject
        ),
      };

    case CONDITIONAL_STYLE_DELETE: {
      const actionConditionalStyle: ConditionalStyle = (action as ConditionalStyleAction)
        .conditionalStyle;
      return {
        ...state,
        ConditionalStyles: state.ConditionalStyles.filter(
          abObject => abObject.Uuid !== actionConditionalStyle.Uuid
        ),
      };
    }

    default:
      return state;
  }
};
