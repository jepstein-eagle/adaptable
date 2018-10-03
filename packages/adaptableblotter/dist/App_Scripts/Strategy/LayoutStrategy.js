"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const Enums_1 = require("../Core/Enums");
class LayoutStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.LayoutStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.LayoutStrategyName, ScreenPopups.LayoutPopup, StrategyIds.LayoutGlyph);
    }
    InitState() {
        if (this.LayoutState != this.blotter.AdaptableBlotterStore.TheStore.getState().Layout) {
            this.LayoutState = this.blotter.AdaptableBlotterStore.TheStore.getState().Layout;
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.Layout, this.LayoutState);
            }
        }
    }
}
exports.LayoutStrategy = LayoutStrategy;
