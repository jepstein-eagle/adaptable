"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const StrategyNames = require("../Core/Constants/StrategyNames");
const StrategyGlyphs = require("../Core/Constants/StrategyGlyphs");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
class CalculatedColumnStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.CalculatedColumnStrategyId, blotter);
    }
    InitState() {
        if (this.CalculatedColumns != this.blotter.AdaptableBlotterStore.TheStore.getState().CalculatedColumn.CalculatedColumns) {
            //All the logic is managed in the redux store middleware
            this.CalculatedColumns = this.blotter.AdaptableBlotterStore.TheStore.getState().CalculatedColumn.CalculatedColumns;
        }
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.CalculatedColumnStrategyName, ScreenPopups.CalculatedColumnPopup, StrategyGlyphs.CalculatedColumnGlyph);
    }
    addContextMenuItem(columnId) {
        let column = this.CalculatedColumns.find(c => c.ColumnId == columnId);
        if (column) {
            this.createContextMenuItemShowPopup("Edit " + StrategyNames.CalculatedColumnStrategyName, ScreenPopups.CalculatedColumnPopup, StrategyGlyphs.CalculatedColumnGlyph, "Edit|" + columnId);
        }
    }
}
exports.CalculatedColumnStrategy = CalculatedColumnStrategy;
