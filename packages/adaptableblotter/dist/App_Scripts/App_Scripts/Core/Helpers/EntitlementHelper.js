"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../Enums");
const ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
var EntitlementHelper;
(function (EntitlementHelper) {
    function getEntitlementAccessLevelForStrategy(entitlements, strategyId) {
        if (ArrayExtensions_1.ArrayExtensions.IsNull(entitlements)) {
            //    alert(strategyId)
        }
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(entitlements)) {
            let entitlement = entitlements.find(e => e.FunctionName == strategyId);
            if (entitlement) {
                return entitlement.AccessLevel;
            }
        }
        return Enums_1.AccessLevel.Full;
    }
    EntitlementHelper.getEntitlementAccessLevelForStrategy = getEntitlementAccessLevelForStrategy;
})(EntitlementHelper = exports.EntitlementHelper || (exports.EntitlementHelper = {}));
