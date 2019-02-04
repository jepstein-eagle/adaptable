"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntitlementsRedux = require("../Redux/ActionsReducers/EntitlementsRedux");
const ApiBase_1 = require("./ApiBase");
class EntitlementApi extends ApiBase_1.ApiBase {
    GetAll() {
        return this.getState().Entitlements.FunctionEntitlements;
    }
    GetByFunction(functionName) {
        return this.getState().Entitlements.FunctionEntitlements.find(f => f.FunctionName == functionName);
    }
    GetAccessLevelForFunction(functionName) {
        return this.getState().Entitlements.FunctionEntitlements.find(f => f.FunctionName == functionName).AccessLevel;
    }
    Add(functionName, accessLevel) {
        let entitlement = { FunctionName: functionName, AccessLevel: accessLevel };
        this.dispatchAction(EntitlementsRedux.EntitlementAdd(entitlement));
    }
    Edit(functionName, accessLevel) {
        let entitlement = { FunctionName: functionName, AccessLevel: accessLevel };
        this.dispatchAction(EntitlementsRedux.EntitlementUpdate(entitlement));
    }
    Delete(functionName) {
        this.dispatchAction(EntitlementsRedux.EntitlementDelete(functionName));
    }
}
exports.EntitlementApi = EntitlementApi;
