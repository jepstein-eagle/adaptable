"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONDITIONAL_STYLE_ADD_UPDATE = 'CONDITIONAL_STYLE_ADD_UPDATE';
exports.CONDITIONAL_STYLE_DELETE = 'CONDITIONAL_STYLE_DELETE';
exports.ConditionalStyleAddUpdate = (Index, conditionalStyle) => ({
    type: exports.CONDITIONAL_STYLE_ADD_UPDATE,
    Index,
    conditionalStyle
});
exports.ConditionalStyleDelete = (Index, conditionalStyle) => ({
    type: exports.CONDITIONAL_STYLE_DELETE,
    Index,
    conditionalStyle
});
const initialConditionalStyleState = {
    ConditionalStyles: []
};
exports.ConditionalStyleReducer = (state = initialConditionalStyleState, action) => {
    let conditions;
    switch (action.type) {
        case exports.CONDITIONAL_STYLE_ADD_UPDATE:
            let actionTypedAddUpdate = action;
            conditions = [].concat(state.ConditionalStyles);
            if (actionTypedAddUpdate.Index != -1) { // it exists
                conditions[actionTypedAddUpdate.Index] = actionTypedAddUpdate.conditionalStyle;
            }
            else {
                conditions.push(actionTypedAddUpdate.conditionalStyle);
            }
            return Object.assign({}, state, { ConditionalStyles: conditions });
        case exports.CONDITIONAL_STYLE_DELETE:
            let actionTypedDelete = action;
            conditions = [].concat(state.ConditionalStyles);
            conditions.splice(actionTypedDelete.Index, 1);
            return Object.assign({}, state, { ConditionalStyles: conditions });
        default:
            return state;
    }
};
