"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Core/Constants/StrategyConstants");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const Enums_1 = require("../Core/Enums");
class CellValidationStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.CellValidationStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.CellValidationStrategyName, ScreenPopups.CellValidationPopup, StrategyConstants.CellValidationGlyph);
    }
    InitState() {
        if (this.CellValidationState != this.blotter.AdaptableBlotterStore.TheStore.getState().CellValidation) {
            this.CellValidationState = this.blotter.AdaptableBlotterStore.TheStore.getState().CellValidation;
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.CellValidation, this.CellValidationState);
            }
        }
    }
    addContextMenuItem(column) {
        if (this.canCreateContextMenuItem(column, this.blotter)) {
            this.createContextMenuItemShowPopup("Create Cell Validation Rule", ScreenPopups.CellValidationPopup, StrategyConstants.CellValidationGlyph, "New|" + column.ColumnId);
        }
    }
}
exports.CellValidationStrategy = CellValidationStrategy;
