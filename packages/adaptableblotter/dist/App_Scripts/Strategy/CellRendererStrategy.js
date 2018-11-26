"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Core/Constants/StrategyConstants");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const ArrayExtensions_1 = require("../Core/Extensions/ArrayExtensions");
const Enums_1 = require("../Core/Enums");
class CellRendererStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.CellRendererStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.CellRendererStrategyName, ScreenPopups.CellRendererPopup, StrategyConstants.CellRendererGlyph);
    }
    addContextMenuItem(column) {
        if (this.canCreateContextMenuItem(column, this.blotter, "numeric")) {
            let cellRendererExists = ArrayExtensions_1.ArrayExtensions.ContainsItem(this.CellRendererState.PercentCellRenderers.map(f => f.ColumnId), column.ColumnId);
            let label = cellRendererExists ? "Edit " : "Create ";
            let popupParam = cellRendererExists ? "Edit|" : "New|";
            this.createContextMenuItemShowPopup(label + StrategyConstants.CellRendererStrategyName, ScreenPopups.CellRendererPopup, StrategyConstants.CellRendererGlyph, popupParam + column.ColumnId);
        }
    }
    InitState() {
        if (this.CellRendererState != this.blotter.AdaptableBlotterStore.TheStore.getState().CellRenderer) {
            this.CellRendererState = this.blotter.AdaptableBlotterStore.TheStore.getState().CellRenderer;
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.CellRenderer, this.CellRendererState);
            }
        }
    }
}
exports.CellRendererStrategy = CellRendererStrategy;
