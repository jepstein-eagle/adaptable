"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Core/Constants/StrategyConstants");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const Enums_1 = require("../Utilities/Enums");
class ChartStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.ChartStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ChartStrategyName, ScreenPopups.ChartPopup, StrategyConstants.ChartGlyph);
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
