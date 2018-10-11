"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Core/Constants/StrategyConstants");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
class ColumnInfoStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.ColumnInfoStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ColumnInfoStrategyName, ScreenPopups.ColumnInfoPopup, StrategyConstants.ColumnInfoGlyph);
    }
    addContextMenuItem(columnId) {
        if (this.canCreateContextMenuItem(columnId, this.blotter)) {
            this.createContextMenuItemShowPopup(StrategyConstants.ColumnInfoStrategyName, ScreenPopups.ColumnInfoPopup, StrategyConstants.ColumnInfoGlyph, columnId);
        }
    }
}
exports.ColumnInfoStrategy = ColumnInfoStrategy;
