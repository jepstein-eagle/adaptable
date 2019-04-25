"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntitlementsRedux = require("../Redux/ActionsReducers/EntitlementsRedux");
const ApiBase_1 = require("./ApiBase");
class EntitlementApi extends ApiBase_1.ApiBase {
    GetState() {
        return this.getBlotterState().Entitlements;
    }
    GetAll() {
        return this.getBlotterState().Entitlements.FunctionEntitlements;
    }
    GetByFunction(functionName) {
        return this.getBlotterState().Entitlements.FunctionEntitlements.find(f => f.FunctionName == functionName);
    }
    GetAccessLevelForFunction(functionName) {
        return this.getBlotterState().Entitlements.FunctionEntitlements.find(f => f.FunctionName == functionName).AccessLevel;
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
