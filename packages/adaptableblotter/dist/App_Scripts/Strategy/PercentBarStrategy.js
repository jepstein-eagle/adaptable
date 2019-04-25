"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../Utilities/Constants/ScreenPopups");
const ArrayExtensions_1 = require("../Utilities/Extensions/ArrayExtensions");
const Enums_1 = require("../Utilities/Enums");
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
        if (this.PercentBarState != this.GetPercentBarState()) {
            if (this.blotter.IsInitialised) {
                // if we have made any changes then first delete them all
                this.PercentBarState.PercentBars.forEach(pb => {
                    this.blotter.removePercentBar(pb);
                });
                this.GetPercentBarState().PercentBars.forEach(pb => {
                    this.blotter.editPercentBar(pb);
                });
                this.blotter.redraw();
            }
            this.PercentBarState = this.GetPercentBarState();
            this.publishStateChanged(Enums_1.StateChangedTrigger.PercentBar, this.PercentBarState);
        }
    }
    GetPercentBarState() {
        return this.blotter.adaptableBlotterStore.TheStore.getState().PercentBar;
    }
}
exports.PercentBarStrategy = PercentBarStrategy;
