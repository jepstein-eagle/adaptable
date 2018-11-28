"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Core/Constants/StrategyConstants");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const Enums_1 = require("../Core/Enums");
class ColumnCategoryStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.ColumnCategoryStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ColumnCategoryStrategyName, ScreenPopups.ColumnCategoryPopup, StrategyConstants.ColumnCategoryGlyph);
    }
    InitState() {
        if (this.ColumnCategoryState != this.blotter.AdaptableBlotterStore.TheStore.getState().ColumnCategory) {
            this.ColumnCategoryState = this.blotter.AdaptableBlotterStore.TheStore.getState().ColumnCategory;
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.ColumnCategory, this.ColumnCategoryState);
            }
        }
    }
}
exports.ColumnCategoryStrategy = ColumnCategoryStrategy;
