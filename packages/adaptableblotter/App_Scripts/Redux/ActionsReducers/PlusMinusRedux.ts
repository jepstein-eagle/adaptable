import { PlusMinusState } from './Interface/IState';
import * as Redux from 'redux';
import { ICellInfo } from '../../Utilities/Interface/ICellInfo';
import { IPlusMinusRule } from '../../Utilities/Interface/BlotterObjects/IPlusMinusRule';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';

export const PLUSMINUS_APPLY = 'PLUSMINUS_APPLY';
export const PLUSMINUS_ADD_UPDATE_CONDITION = 'PLUSMINUS_ADD_UPDATE_CONDITION';
export const PLUSMINUS_EDIT_CONDITION = 'PLUSMINUS_EDIT_CONDITION';
export const PLUSMINUS_DELETE_CONDITION = 'PLUSMINUS_DELETE_CONDITION';

export interface PlusMinusApplyAction extends Redux.Action {
  CellInfos: ICellInfo[];
  KeyEventString: string;
}

export interface PlusMinusAddUpdateConditionAction extends Redux.Action {
  Index: number;
  PlusMinusRule: IPlusMinusRule;
}

export interface PlusMinusEditConditionAction extends Redux.Action {
  Index: number;
  ColumnDefaultNudge: { ColumnId: string; DefaultNudge: number };
}

export interface PlusMinusDeleteConditionAction extends Redux.Action {
  Index: number;
}

export const PlusMinusApply = (
  CellInfos: ICellInfo[],
  KeyEventString: string
): PlusMinusApplyAction => ({
  type: PLUSMINUS_APPLY,
  CellInfos,
  KeyEventString,
});

export const PlusMinusAddUpdateCondition = (
  Index: number,
  PlusMinusRule: IPlusMinusRule
): PlusMinusAddUpdateConditionAction => ({
  type: PLUSMINUS_ADD_UPDATE_CONDITION,
  Index,
  PlusMinusRule,
});

export const PlusMinusEditCondition = (
  Index: number,
  ColumnDefaultNudge: { ColumnId: string; DefaultNudge: number }
): PlusMinusEditConditionAction => ({
  type: PLUSMINUS_EDIT_CONDITION,
  Index,
  ColumnDefaultNudge,
});

export const PlusMinusDeleteCondition = (Index: number): PlusMinusDeleteConditionAction => ({
  type: PLUSMINUS_DELETE_CONDITION,
  Index,
});

const initialPlusMinusState: PlusMinusState = {
  PlusMinusRules: EMPTY_ARRAY,
};

export const PlusMinusReducer: Redux.Reducer<PlusMinusState> = (
  state: PlusMinusState = initialPlusMinusState,
  action: Redux.Action
): PlusMinusState => {
  switch (action.type) {
    case PLUSMINUS_APPLY:
      //we apply logic in the middleware since it's an API call
      return Object.assign({}, state);

    case PLUSMINUS_ADD_UPDATE_CONDITION: {
      let actionTyped = <PlusMinusAddUpdateConditionAction>action;
      let plusMinusRules: IPlusMinusRule[] = [].concat(state.PlusMinusRules);
      if (actionTyped.Index == -1) {
        plusMinusRules.push(actionTyped.PlusMinusRule);
      } else {
        plusMinusRules[actionTyped.Index] = actionTyped.PlusMinusRule;
      }
      return Object.assign({}, state, { PlusMinusRules: plusMinusRules });
    }

    case PLUSMINUS_EDIT_CONDITION: {
      let plusMinusRules: IPlusMinusRule[] = [].concat(state.PlusMinusRules);
      let actionTyped = <PlusMinusEditConditionAction>action;
      let oldCondition = plusMinusRules[actionTyped.Index];
      plusMinusRules[actionTyped.Index] = Object.assign({}, oldCondition, {
        ColumnId: actionTyped.ColumnDefaultNudge.ColumnId,
        NudgeValue: actionTyped.ColumnDefaultNudge.DefaultNudge,
      });
      return Object.assign({}, state, { PlusMinusRules: plusMinusRules });
    }

    case PLUSMINUS_DELETE_CONDITION: {
      let plusMinusRules: IPlusMinusRule[] = [].concat(state.PlusMinusRules);
      plusMinusRules.splice((<PlusMinusDeleteConditionAction>action).Index, 1);
      return Object.assign({}, state, { PlusMinusRules: plusMinusRules });
    }
    default:
      return state;
  }
};
