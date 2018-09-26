"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
class AboutStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.AboutStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.AboutStrategyName, ScreenPopups.AboutPopup, StrategyIds.AboutGlyph);
    }
}
exports.AboutStrategy = AboutStrategy;
