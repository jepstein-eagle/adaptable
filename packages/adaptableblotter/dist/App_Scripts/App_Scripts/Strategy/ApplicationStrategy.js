"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Core/Constants/StrategyConstants");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
class ApplicationStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.ApplicationStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ApplicationStrategyName, ScreenPopups.ApplicationPopup, StrategyConstants.ApplicationGlyph);
    }
}
exports.ApplicationStrategy = ApplicationStrategy;
