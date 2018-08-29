"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const StrategyNames = require("../Core/Constants/StrategyNames");
const StrategyGlyphs = require("../Core/Constants/StrategyGlyphs");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const ArrayExtensions_1 = require("../Core/Extensions/ArrayExtensions");
class FormatColumnStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.FormatColumnStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.FormatColumnStrategyName, ScreenPopups.FormatColumnPopup, StrategyGlyphs.FormatColumnGlyph);
    }
    addContextMenuItem(columnId) {
        let formatExists = ArrayExtensions_1.ArrayExtensions.ContainsItem(this.FormatColumnState.FormatColumns.map(f => f.ColumnId), columnId);
        let label = formatExists ? "Edit " : "Create ";
        let popupParam = formatExists ? "Edit|" : "New|";
        this.createContextMenuItemShowPopup(label + StrategyNames.FormatColumnStrategyName, ScreenPopups.FormatColumnPopup, StrategyGlyphs.FormatColumnGlyph, popupParam + columnId);
    }
    InitState() {
        if (this.FormatColumnState != this.blotter.AdaptableBlotterStore.TheStore.getState().FormatColumn) {
            this.FormatColumnState = this.blotter.AdaptableBlotterStore.TheStore.getState().FormatColumn;
            this.InitStyles();
        }
    }
}
exports.FormatColumnStrategy = FormatColumnStrategy;
