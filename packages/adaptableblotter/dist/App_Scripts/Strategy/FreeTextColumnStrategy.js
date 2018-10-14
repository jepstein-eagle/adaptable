"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Core/Constants/StrategyConstants");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const ArrayExtensions_1 = require("../Core/Extensions/ArrayExtensions");
const Enums_1 = require("../Core/Enums");
class FreeTextColumnStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.FreeTextColumnStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.FreeTextColumnStrategyName, ScreenPopups.FreeTextColumnPopup, StrategyConstants.FreeTextColumnGlyph);
    }
    addContextMenuItem(columnId) {
        if (this.canCreateContextMenuItem(columnId, this.blotter)) {
            let FreeTextExists = ArrayExtensions_1.ArrayExtensions.ContainsItem(this.FreeTextColumnState.FreeTextColumns.map(f => f.ColumnId), columnId);
            let label = FreeTextExists ? "Edit " : "Create ";
            let popupParam = FreeTextExists ? "Edit|" : "New|";
            this.createContextMenuItemShowPopup(label + StrategyConstants.FreeTextColumnStrategyName, ScreenPopups.FreeTextColumnPopup, StrategyConstants.FreeTextColumnGlyph, popupParam + columnId);
        }
    }
    InitState() {
        if (this.FreeTextColumnState != this.blotter.AdaptableBlotterStore.TheStore.getState().FreeTextColumn) {
            this.FreeTextColumnState = this.blotter.AdaptableBlotterStore.TheStore.getState().FreeTextColumn;
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.FreeTextColumn, this.FreeTextColumnState);
            }
        }
    }
}
exports.FreeTextColumnStrategy = FreeTextColumnStrategy;
