"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.ENTITLEMENT_ADD = 'ENTITLEMENT_ADD';
exports.ENTITLEMENT_UPDATE = 'ENTITLEMENT_UPDATE';
exports.ENTITLEMENT_DELETE = 'ENTITLEMENT_DELETE';
exports.EntitlementAdd = (Entitlement) => ({
    type: exports.ENTITLEMENT_ADD,
    Entitlement
});
exports.EntitlementUpdate = (Entitlement) => ({
    type: exports.ENTITLEMENT_UPDATE,
    Entitlement
});
exports.EntitlementDelete = (FunctionName) => ({
    type: exports.ENTITLEMENT_DELETE,
    FunctionName
});
const initialEntitlementsState = {
    FunctionEntitlements: GeneralConstants_1.EMPTY_ARRAY
};
exports.EntitlementsReducer = (state = initialEntitlementsState, action) => {
    let index;
    let functionEntitlements;
    switch (action.type) {
        case exports.ENTITLEMENT_ADD:
            let actionTypedAdd = action;
            functionEntitlements = [].concat(state.FunctionEntitlements);
            functionEntitlements.push(actionTypedAdd.Entitlement);
            return Object.assign({}, state, { FunctionEntitlements: functionEntitlements });
        case exports.ENTITLEMENT_UPDATE:
            let actionTypedUpdate = action;
            functionEntitlements = [].concat(state.FunctionEntitlements);
            index = functionEntitlements.findIndex(fe => fe.FunctionName == actionTypedUpdate.Entitlement.FunctionName);
            functionEntitlements[index] = actionTypedUpdate.Entitlement;
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
