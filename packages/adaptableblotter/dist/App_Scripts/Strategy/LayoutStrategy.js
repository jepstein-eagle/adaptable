"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../Utilities/Constants/ScreenPopups");
const Enums_1 = require("../Utilities/Enums");
class LayoutStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.LayoutStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.LayoutStrategyName, ScreenPopups.LayoutPopup, StrategyConstants.LayoutGlyph);
    }
    InitState() {
        if (this.LayoutState != this.blotter.api.layoutApi.getLayoutState()) {
            this.LayoutState = this.blotter.api.layoutApi.getLayoutState();
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.Layout, this.LayoutState);
            }
        }
    }
}
exports.LayoutStrategy = LayoutStrategy;
