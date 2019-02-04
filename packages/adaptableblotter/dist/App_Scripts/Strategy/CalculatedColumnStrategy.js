"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../Utilities/Constants/ScreenPopups");
const Enums_1 = require("../Utilities/Enums");
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
    addContextMenuItem(column) {
        if (this.canCreateContextMenuItem(column, this.blotter)) {
            if (this.CalculatedColumnState.CalculatedColumns.find(cc => cc.ColumnId == column.ColumnId)) {
                this.createContextMenuItemShowPopup("Edit " + StrategyConstants.CalculatedColumnStrategyName, ScreenPopups.CalculatedColumnPopup, StrategyConstants.CalculatedColumnGlyph, "Edit|" + column.ColumnId);
            }
        }
    }
}
exports.CalculatedColumnStrategy = CalculatedColumnStrategy;
