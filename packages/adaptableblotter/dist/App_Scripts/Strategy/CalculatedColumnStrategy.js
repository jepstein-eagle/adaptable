"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Core/Constants/StrategyConstants");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const Enums_1 = require("../Core/Enums");
class CalculatedColumnStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.CalculatedColumnStrategyId, blotter);
    }
    InitState() {
        if (this.CalculatedColumnState != this.blotter.AdaptableBlotterStore.TheStore.getState().CalculatedColumn) {
            this.CalculatedColumnState = this.blotter.AdaptableBlotterStore.TheStore.getState().CalculatedColumn;
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.CalculatedColumn, this.CalculatedColumnState);
            }
        }
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.CalculatedColumnStrategyName, ScreenPopups.CalculatedColumnPopup, StrategyConstants.CalculatedColumnGlyph);
    }
    addContextMenuItem(columnId) {
        if (this.canCreateContextMenuItem(columnId, this.blotter)) {
            if (this.CalculatedColumnState.CalculatedColumns.find(cc => cc.ColumnId == columnId)) {
                this.createContextMenuItemShowPopup("Edit " + StrategyConstants.CalculatedColumnStrategyName, ScreenPopups.CalculatedColumnPopup, StrategyConstants.CalculatedColumnGlyph, "Edit|" + columnId);
            }
        }
    }
}
exports.CalculatedColumnStrategy = CalculatedColumnStrategy;
