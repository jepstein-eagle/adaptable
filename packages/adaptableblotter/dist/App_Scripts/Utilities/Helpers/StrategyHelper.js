"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StrategyConstants = require("../Constants/StrategyConstants");
const Enums_1 = require("../Enums");
const ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
var StrategyHelper;
(function (StrategyHelper) {
    function IsEditStrategy(strategyId) {
        return strategyId != StrategyConstants.SmartEditStrategyId;
    }
    StrategyHelper.IsEditStrategy = IsEditStrategy;
    function IsFilterStrategy(strategyId) {
        return strategyId != StrategyConstants.SmartEditStrategyId;
    }
    StrategyHelper.IsFilterStrategy = IsFilterStrategy;
    function IsSortStrategy(strategyId) {
        return strategyId != StrategyConstants.SmartEditStrategyId;
    }
    StrategyHelper.IsSortStrategy = IsSortStrategy;
    function getEntitlementAccessLevelForStrategy(entitlements, strategyId) {
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(entitlements)) {
            let entitlement = entitlements.find(e => e.FunctionName == strategyId);
            if (entitlement) {
                return entitlement.AccessLevel;
            }
        }
        return Enums_1.AccessLevel.Full;
    }
    StrategyHelper.getEntitlementAccessLevelForStrategy = getEntitlementAccessLevelForStrategy;
})(StrategyHelper = exports.StrategyHelper || (exports.StrategyHelper = {}));
