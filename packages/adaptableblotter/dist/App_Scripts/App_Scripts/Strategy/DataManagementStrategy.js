"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Core/Constants/StrategyConstants");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
class DataManagementStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.DataManagementStrategyId, blotter);
    }
    addPopupMenuItem() {
        if ("production" == process.env.NODE_ENV) {
            return;
        }
        this.createMenuItemShowPopup(StrategyConstants.DataManagementStrategyName, ScreenPopups.DataManagementPopup, StrategyConstants.DataManagementGlyph);
    }
}
exports.DataManagementStrategy = DataManagementStrategy;
