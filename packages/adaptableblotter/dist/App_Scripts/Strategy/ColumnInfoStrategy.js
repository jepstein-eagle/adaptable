"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
class ColumnInfoStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.ColumnInfoStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.ColumnInfoStrategyName, ScreenPopups.ColumnInfoPopup, StrategyIds.ColumnInfoGlyph);
    }
    addContextMenuItem(columnId) {
        if (this.canCreateContextMenuItem(columnId)) {
            this.createContextMenuItemShowPopup(StrategyIds.ColumnInfoStrategyName, ScreenPopups.ColumnInfoPopup, StrategyIds.ColumnInfoGlyph, columnId);
        }
    }
}
exports.ColumnInfoStrategy = ColumnInfoStrategy;
