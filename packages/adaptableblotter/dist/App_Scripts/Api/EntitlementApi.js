"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntitlementsRedux = require("../Redux/ActionsReducers/EntitlementsRedux");
const ApiBase_1 = require("./ApiBase");
class EntitlementApi extends ApiBase_1.ApiBase {
    getEntitlementState() {
        return this.getBlotterState().Entitlements;
    }
    getAllEntitlement() {
        return this.getBlotterState().Entitlements.FunctionEntitlements;
    }
    getEntitlementByFunction(functionName) {
        return this.getBlotterState().Entitlements.FunctionEntitlements.find(f => f.FunctionName == functionName);
    }
    getEntitlementAccessLevelForFunction(functionName) {
        return this.getBlotterState().Entitlements.FunctionEntitlements.find(f => f.FunctionName == functionName).AccessLevel;
    }
    addEntitlement(functionName, accessLevel) {
        let entitlement = { FunctionName: functionName, AccessLevel: accessLevel };
        this.dispatchAction(EntitlementsRedux.EntitlementAdd(entitlement));
    }
    editEntitlement(functionName, accessLevel) {
        let entitlement = { FunctionName: functionName, AccessLevel: accessLevel };
        this.dispatchAction(EntitlementsRedux.EntitlementUpdate(entitlement));
    }
    deleteEntitlement(functionName) {
        this.dispatchAction(EntitlementsRedux.EntitlementDelete(functionName));
    }
}
exports.EntitlementApi = EntitlementApi;
