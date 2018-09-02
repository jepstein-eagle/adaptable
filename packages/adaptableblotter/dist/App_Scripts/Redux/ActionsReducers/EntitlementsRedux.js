"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENTITLEMENT_ADD_UPDATE = 'ENTITLEMENT_ADD_UPDATE';
exports.ENTITLEMENT_DELETE = 'ENTITLEMENT_DELETE';
exports.EntitlementAddUpdate = (Index, Entitlement) => ({
    type: exports.ENTITLEMENT_ADD_UPDATE,
    Index,
    Entitlement
});
exports.EntitlementDelete = (FunctionName) => ({
    type: exports.ENTITLEMENT_DELETE,
    FunctionName
});
const initialEntitlementsState = {
    FunctionEntitlements: []
};
exports.EntitlementsReducer = (state = initialEntitlementsState, action) => {
    let index;
    let functionEntitlements;
    switch (action.type) {
        case exports.ENTITLEMENT_ADD_UPDATE:
            let actionTypedAddUpdate = action;
            functionEntitlements = [].concat(state.FunctionEntitlements);
            if (actionTypedAddUpdate.Index != -1) { // it exists
                functionEntitlements[actionTypedAddUpdate.Index] = actionTypedAddUpdate.Entitlement;
            }
            else {
                functionEntitlements.push(actionTypedAddUpdate.Entitlement);
            }
            return Object.assign({}, state, { FunctionEntitlements: functionEntitlements });
        case exports.ENTITLEMENT_DELETE:
            let actionTypedDelete = action;
            functionEntitlements = [].concat(state.FunctionEntitlements);
            index = functionEntitlements.findIndex(a => a.FunctionName == actionTypedDelete.FunctionName);
            functionEntitlements.splice(index, 1);
            return Object.assign({}, state, { FunctionEntitlements: functionEntitlements });
        default:
            return state;
    }
};
