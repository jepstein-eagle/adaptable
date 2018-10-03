"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const ArrayExtensions_1 = require("../Core/Extensions/ArrayExtensions");
const Enums_1 = require("../Core/Enums");
class FormatColumnStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.FormatColumnStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.FormatColumnStrategyName, ScreenPopups.FormatColumnPopup, StrategyIds.FormatColumnGlyph);
    }
    addContextMenuItem(columnId) {
        if (this.canCreateContextMenuItem(columnId, this.blotter)) {
            let formatExists = ArrayExtensions_1.ArrayExtensions.ContainsItem(this.FormatColumnState.FormatColumns.map(f => f.ColumnId), columnId);
            let label = formatExists ? "Edit " : "Create ";
            let popupParam = formatExists ? "Edit|" : "New|";
            this.createContextMenuItemShowPopup(label + StrategyIds.FormatColumnStrategyName, ScreenPopups.FormatColumnPopup, StrategyIds.FormatColumnGlyph, popupParam + columnId);
        }
    }
    InitState() {
        if (this.FormatColumnState != this.blotter.AdaptableBlotterStore.TheStore.getState().FormatColumn) {
            this.FormatColumnState = this.blotter.AdaptableBlotterStore.TheStore.getState().FormatColumn;
            this.InitStyles();
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.FormatColumn, this.FormatColumnState);
            }
        }
    }
}
exports.FormatColumnStrategy = FormatColumnStrategy;
