"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../Utilities/Constants/ScreenPopups");
const ArrayExtensions_1 = require("../Utilities/Extensions/ArrayExtensions");
const Enums_1 = require("../Utilities/Enums");
class FormatColumnStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.FormatColumnStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.FormatColumnStrategyName, ScreenPopups.FormatColumnPopup, StrategyConstants.FormatColumnGlyph);
    }
    addContextMenuItem(column) {
        if (this.canCreateContextMenuItem(column, this.blotter)) {
            let formatExists = ArrayExtensions_1.ArrayExtensions.ContainsItem(this.FormatColumnState.FormatColumns.map(f => f.ColumnId), column.ColumnId);
            let label = formatExists ? "Edit " : "Create ";
            let popupParam = formatExists ? "Edit|" : "New|";
            this.createContextMenuItemShowPopup(label + StrategyConstants.FormatColumnStrategyName, ScreenPopups.FormatColumnPopup, StrategyConstants.FormatColumnGlyph, popupParam + column.ColumnId);
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
