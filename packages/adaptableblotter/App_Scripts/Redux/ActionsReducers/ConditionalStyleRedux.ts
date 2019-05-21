import * as Redux from 'redux';
import { ConditionalStyleState } from './Interface/IState';
import { IConditionalStyle } from '../../Utilities/Interface/BlotterObjects/IConditionalStyle';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../Utilities/Uuid';

export const CONDITIONAL_STYLE_ADD_UPDATE = 'CONDITIONAL_STYLE_ADD_UPDATE';
export const CONDITIONAL_STYLE_DELETE = 'CONDITIONAL_STYLE_DELETE';

export interface ConditionalStyleAddUpdateAction extends Redux.Action {
  Index: number;
  conditionalStyle: IConditionalStyle;
}

export const ConditionalStyleAddUpdate = (
  Index: number,
  conditionalStyle: IConditionalStyle
): ConditionalStyleAddUpdateAction => ({
  type: CONDITIONAL_STYLE_ADD_UPDATE,
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
    case CONDITIONAL_STYLE_ADD_UPDATE: {
      const actionConditionalStyle: IConditionalStyle = (action as ConditionalStyleAddUpdateAction)
        .conditionalStyle;

      if (actionConditionalStyle.Uuid) {
        let isUpdate: boolean = false;
        conditions = state.ConditionalStyles.map(c => {
          const found = c.Uuid === actionConditionalStyle.Uuid;

          if (found) {
            isUpdate = true;
          }
          return found ? actionConditionalStyle : c;
        });
        if (!isUpdate) {
          conditions.push(actionConditionalStyle);
        }
      } else {
        actionConditionalStyle.Uuid = createUuid();
        conditions = [...state.ConditionalStyles, actionConditionalStyle];
      }
      return { ...state, ConditionalStyles: conditions };
    }

    case CONDITIONAL_STYLE_DELETE: {
      const actionConditionalStyle = (action as ConditionalStyleDeleteAction).conditionalStyle;

      return {
        ...state,
        ConditionalStyles: state.ConditionalStyles.filter(
          c => actionConditionalStyle.Uuid !== c.Uuid
        ),
      };
    }
    default:
      return state;
  }
};
