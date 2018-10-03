"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
class DataManagementStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.DataManagementStrategyId, blotter);
    }
    addPopupMenuItem() {
        if ("production" == process.env.NODE_ENV) {
            return;
        }
        this.createMenuItemShowPopup(StrategyIds.DataManagementStrategyName, ScreenPopups.DataManagementPopup, StrategyIds.DataManagementGlyph);
    }
}
exports.DataManagementStrategy = DataManagementStrategy;
