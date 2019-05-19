import { PlusMinusState } from './Interface/IState';
import * as Redux from 'redux';
import { ICellInfo } from '../../Utilities/Interface/ICellInfo';
import { IPlusMinusRule } from '../../Utilities/Interface/BlotterObjects/IPlusMinusRule';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';

export const PLUS_MINUS_APPLY = 'PLUS_MINUS_APPLY';
export const PLUS_MINUS_RULE_ADD = 'PLUS_MINUS_RULE_ADD';
export const PLUS_MINUS_RULE_EDIT = 'PLUS_MINUS_RULE_EDIT';
export const PLUS_MINUS_RULE_DELETE = 'PLUS_MINUS_RULE_DELETE';

export interface PlusMinusApplyAction extends Redux.Action {
  CellInfos: ICellInfo[];
  KeyEventString: string;
}

export interface PlusMinusRuleAddAction extends Redux.Action {
  PlusMinusRule: IPlusMinusRule;
}

export interface PlusMinusRuleEditAction extends Redux.Action {
  Index: number;
  PlusMinusRule: IPlusMinusRule;
}

export interface PlusMinusRuleDeleteAction extends Redux.Action {
  Index: number;
  PlusMinusRule: IPlusMinusRule;
}

export const PlusMinusApply = (
  CellInfos: ICellInfo[],
  KeyEventString: string
): PlusMinusApplyAction => ({
  type: PLUS_MINUS_APPLY,
  CellInfos,
  KeyEventString,
});

export const PlusMinusRuleAdd = (PlusMinusRule: IPlusMinusRule): PlusMinusRuleAddAction => ({
  type: PLUS_MINUS_RULE_ADD,
  PlusMinusRule,
});

export const PlusMinusRuleEdit = (
  Index: number,
  PlusMinusRule: IPlusMinusRule
): PlusMinusRuleEditAction => ({
  type: PLUS_MINUS_RULE_EDIT,
  Index,
  PlusMinusRule,
});

export const PlusMinusRuleDelete = (
  Index: number,
  PlusMinusRule: IPlusMinusRule
): PlusMinusRuleDeleteAction => ({
  type: PLUS_MINUS_RULE_DELETE,
  Index,
  PlusMinusRule,
});

const initialPlusMinusState: PlusMinusState = {
  PlusMinusRules: EMPTY_ARRAY,
};

export const PlusMinusReducer: Redux.Reducer<PlusMinusState> = (
  state: PlusMinusState = initialPlusMinusState,
  action: Redux.Action
): PlusMinusState => {
  switch (action.type) {
    case PLUS_MINUS_APPLY:
      //we apply logic in the middleware since it's an API call
      return Object.assign({}, state);

    case PLUS_MINUS_RULE_ADD: {
      let actionTyped = <PlusMinusRuleAddAction>action;
      let plusMinusRules: IPlusMinusRule[] = [].concat(state.PlusMinusRules);
      plusMinusRules.push(actionTyped.PlusMinusRule);
      return Object.assign({}, state, { PlusMinusRules: plusMinusRules });
    }

    case PLUS_MINUS_RULE_EDIT: {
      let plusMinusRules: IPlusMinusRule[] = [].concat(state.PlusMinusRules);
      let actionTyped = <PlusMinusRuleEditAction>action;
      plusMinusRules[actionTyped.Index] = actionTyped.PlusMinusRule;
      return Object.assign({}, state, { PlusMinusRules: plusMinusRules });
    }

    case PLUS_MINUS_RULE_DELETE: {
      let plusMinusRules: IPlusMinusRule[] = [].concat(state.PlusMinusRules);
      plusMinusRules.splice((<PlusMinusRuleDeleteAction>action).Index, 1);
      return Object.assign({}, state, { PlusMinusRules: plusMinusRules });
    }
    default:
      return state;
  }
};
