"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLUSMINUS_APPLY = 'PLUSMINUS_APPLY';
exports.PLUSMINUS_ADD_UPDATE_CONDITION = 'PLUSMINUS_ADD_UPDATE_CONDITION';
exports.PLUSMINUS_EDIT_CONDITION = 'PLUSMINUS_EDIT_CONDITION';
exports.PLUSMINUS_DELETE_CONDITION = 'PLUSMINUS_DELETE_CONDITION';
exports.PlusMinusApply = (CellInfos, KeyEventString) => ({
    type: exports.PLUSMINUS_APPLY,
    CellInfos,
    KeyEventString,
});
exports.PlusMinusAddUpdateCondition = (Index, PlusMinusRule) => ({
    type: exports.PLUSMINUS_ADD_UPDATE_CONDITION,
    Index,
    PlusMinusRule
});
exports.PlusMinusEditCondition = (Index, ColumnDefaultNudge) => ({
    type: exports.PLUSMINUS_EDIT_CONDITION,
    Index,
    ColumnDefaultNudge
});
exports.PlusMinusDeleteCondition = (Index) => ({
    type: exports.PLUSMINUS_DELETE_CONDITION,
    Index
});
const initialPlusMinusState = {
    PlusMinusRules: []
};
exports.PlusMinusReducer = (state = initialPlusMinusState, action) => {
    switch (action.type) {
        case exports.PLUSMINUS_APPLY:
            //we apply logic in the middleware since it's an API call
            return Object.assign({}, state);
        case exports.PLUSMINUS_ADD_UPDATE_CONDITION: {
            let actionTyped = action;
            let plusMinusRules = [].concat(state.PlusMinusRules);
            if (actionTyped.Index == -1) {
                plusMinusRules.push(actionTyped.PlusMinusRule);
            }
            else {
                plusMinusRules[actionTyped.Index] = actionTyped.PlusMinusRule;
            }
            return Object.assign({}, state, { PlusMinusRules: plusMinusRules });
        }
        case exports.PLUSMINUS_EDIT_CONDITION: {
            let plusMinusRules = [].concat(state.PlusMinusRules);
            let actionTyped = action;
            let oldCondition = plusMinusRules[actionTyped.Index];
            plusMinusRules[actionTyped.Index] = Object.assign({}, oldCondition, { ColumnId: actionTyped.ColumnDefaultNudge.ColumnId, NudgeValue: actionTyped.ColumnDefaultNudge.DefaultNudge });
            return Object.assign({}, state, { PlusMinusRules: plusMinusRules });
        }
        case exports.PLUSMINUS_DELETE_CONDITION: {
            let plusMinusRules = [].concat(state.PlusMinusRules);
            plusMinusRules.splice(action.Index, 1);
            return Object.assign({}, state, { PlusMinusRules: plusMinusRules });
        }
        default:
            return state;
    }
};
