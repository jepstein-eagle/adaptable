"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const Enums_1 = require("../Core/Enums");
class ChartStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.ChartStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.ChartStrategyName, ScreenPopups.ChartPopup, StrategyIds.ChartGlyph);
    }
    InitState() {
        if (this.ChartState != this.blotter.AdaptableBlotterStore.TheStore.getState().Chart) {
            this.ChartState = this.blotter.AdaptableBlotterStore.TheStore.getState().Chart;
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.Chart, this.ChartState);
            }
        }
    }
}
exports.ChartStrategy = ChartStrategy;
