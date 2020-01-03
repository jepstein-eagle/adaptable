import { PlusMinusState, PlusMinusRule } from '../../PredefinedConfig/PlusMinusState';
import * as Redux from 'redux';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../PredefinedConfig/Uuid';
import { GridCell } from '../../Utilities/Interface/Selection/GridCell';

export const PLUS_MINUS_APPLY = 'PLUS_MINUS_APPLY';
export const PLUS_MINUS_RULE_ADD = 'PLUS_MINUS_RULE_ADD';
export const PLUS_MINUS_RULE_EDIT = 'PLUS_MINUS_RULE_EDIT';
export const PLUS_MINUS_RULE_DELETE = 'PLUS_MINUS_RULE_DELETE';

export interface PlusMinusApplyAction extends Redux.Action {
  GridCells: GridCell[];
}

export interface PlusMinusRuleAction extends Redux.Action {
  plusMinusRule: PlusMinusRule;
}

export interface PlusMinusRuleAddAction extends PlusMinusRuleAction {}

export interface PlusMinusRuleEditAction extends PlusMinusRuleAction {}

export interface PlusMinusRuleDeleteAction extends PlusMinusRuleAction {}

export const PlusMinusApply = (GridCells: GridCell[]): PlusMinusApplyAction => ({
  type: PLUS_MINUS_APPLY,
  GridCells,
});

export const PlusMinusRuleAdd = (plusMinusRule: PlusMinusRule): PlusMinusRuleAddAction => ({
  type: PLUS_MINUS_RULE_ADD,
  plusMinusRule,
});

export const PlusMinusRuleEdit = (plusMinusRule: PlusMinusRule): PlusMinusRuleEditAction => ({
  type: PLUS_MINUS_RULE_EDIT,
  plusMinusRule,
});
export const PlusMinusRuleDelete = (plusMinusRule: PlusMinusRule): PlusMinusRuleDeleteAction => ({
  type: PLUS_MINUS_RULE_DELETE,
  plusMinusRule,
});

const initialPlusMinusState: PlusMinusState = {
  PlusMinusRules: EMPTY_ARRAY,
};

export const PlusMinusReducer: Redux.Reducer<PlusMinusState> = (
  state: PlusMinusState = initialPlusMinusState,
  action: Redux.Action
): PlusMinusState => {
  let plusMinusRules: PlusMinusRule[];
  switch (action.type) {
    case PLUS_MINUS_APPLY:
      //we apply logic in the middleware since it's an API call
      return Object.assign({}, state);

    case PLUS_MINUS_RULE_ADD: {
      const actionPlusMinusRule: PlusMinusRule = (action as PlusMinusRuleAction).plusMinusRule;

      if (!actionPlusMinusRule.Uuid) {
        actionPlusMinusRule.Uuid = createUuid();
      }
      plusMinusRules = [].concat(state.PlusMinusRules);
      plusMinusRules.push(actionPlusMinusRule);
      return { ...state, PlusMinusRules: plusMinusRules };
    }

    case PLUS_MINUS_RULE_EDIT: {
      const actionPlusMinusRule: PlusMinusRule = (action as PlusMinusRuleAction).plusMinusRule;
      return {
        ...state,
        PlusMinusRules: state.PlusMinusRules.map(abObject =>
          abObject.Uuid === actionPlusMinusRule.Uuid ? actionPlusMinusRule : abObject
        ),
      };
    }
    case PLUS_MINUS_RULE_DELETE: {
      const actionPlusMinusRule: PlusMinusRule = (action as PlusMinusRuleAction).plusMinusRule;
      return {
        ...state,
        PlusMinusRules: state.PlusMinusRules.filter(
          abObject => abObject.Uuid !== actionPlusMinusRule.Uuid
        ),
      };
    }

    default:
      return state;
  }
};
