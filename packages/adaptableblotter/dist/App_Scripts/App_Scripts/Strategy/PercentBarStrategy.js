"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Core/Constants/StrategyConstants");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const ArrayExtensions_1 = require("../Utilities/Extensions/ArrayExtensions");
const Enums_1 = require("../Core/Enums");
class PercentBarStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.PercentBarStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.PercentBarStrategyName, ScreenPopups.PercentBarPopup, StrategyConstants.PercentBarGlyph);
    }
    addContextMenuItem(column) {
        if (this.canCreateContextMenuItem(column, this.blotter, "numeric")) {
            let percentBarExists = ArrayExtensions_1.ArrayExtensions.ContainsItem(this.PercentBarState.PercentBars.map(f => f.ColumnId), column.ColumnId);
            let label = percentBarExists ? "Edit " : "Create ";
            let popupParam = percentBarExists ? "Edit|" : "New|";
            this.createContextMenuItemShowPopup(label + StrategyConstants.PercentBarStrategyName, ScreenPopups.PercentBarPopup, StrategyConstants.PercentBarGlyph, popupParam + column.ColumnId);
        }
    }
    InitState() {
        if (this.PercentBarState != this.blotter.AdaptableBlotterStore.TheStore.getState().PercentBar) {
            this.PercentBarState = this.blotter.AdaptableBlotterStore.TheStore.getState().PercentBar;
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.PercentBar, this.PercentBarState);
            }
        }
    }
}
exports.PercentBarStrategy = PercentBarStrategy;
