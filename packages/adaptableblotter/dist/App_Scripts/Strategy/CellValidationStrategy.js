"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const StrategyNames = require("../Core/Constants/StrategyNames");
const StrategyGlyphs = require("../Core/Constants/StrategyGlyphs");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
class CellValidationStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.CellValidationStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.CellValidationStrategyName, ScreenPopups.CellValidationPopup, StrategyGlyphs.CellValidationGlyph);
    }
    addContextMenuItem(columnId) {
        this.createContextMenuItemShowPopup("Create Cell Validation Rule", ScreenPopups.CellValidationPopup, StrategyGlyphs.CellValidationGlyph, "New|" + columnId);
    }
}
exports.CellValidationStrategy = CellValidationStrategy;
