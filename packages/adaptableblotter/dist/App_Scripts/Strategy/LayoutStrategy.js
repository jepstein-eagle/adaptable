"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Core/Constants/StrategyConstants");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const Enums_1 = require("../Core/Enums");
class LayoutStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstantsLayoutStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstantsLayoutStrategyName, ScreenPopups.LayoutPopup, StrategyConstantsLayoutGlyph);
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
