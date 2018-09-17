"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
class CellValidationStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.CellValidationStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.CellValidationStrategyName, ScreenPopups.CellValidationPopup, StrategyIds.CellValidationGlyph);
    }
    addContextMenuItem(columnId) {
        if (this.canCreateContextMenuItem(columnId, this.blotter)) {
            this.createContextMenuItemShowPopup("Create Cell Validation Rule", ScreenPopups.CellValidationPopup, StrategyIds.CellValidationGlyph, "New|" + columnId);
        }
    }
}
exports.CellValidationStrategy = CellValidationStrategy;
