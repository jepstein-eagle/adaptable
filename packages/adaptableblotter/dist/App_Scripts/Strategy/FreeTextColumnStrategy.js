"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Core/Constants/StrategyConstants");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const Enums_1 = require("../Core/Enums");
class FreeTextColumnStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.FreeTextColumnStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.FreeTextColumnStrategyName, ScreenPopups.FreeTextColumnPopup, StrategyConstants.FreeTextColumnGlyph);
    }
    addContextMenuItem(column) {
        if (this.canCreateContextMenuItem(column, this.blotter)) {
            if (this.FreeTextColumnState.FreeTextColumns.find(cc => cc.ColumnId == column.ColumnId)) {
                this.createContextMenuItemShowPopup("Edit " + StrategyConstants.FreeTextColumnStrategyName, ScreenPopups.FreeTextColumnPopup, StrategyConstants.FreeTextColumnGlyph, "Edit|" + column.ColumnId);
            }
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
