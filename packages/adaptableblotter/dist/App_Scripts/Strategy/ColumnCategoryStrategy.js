"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../Utilities/Constants/ScreenPopups");
const Enums_1 = require("../Utilities/Enums");
class ColumnCategoryStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.ColumnCategoryStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ColumnCategoryStrategyName, ScreenPopups.ColumnCategoryPopup, StrategyConstants.ColumnCategoryGlyph);
    }
    InitState() {
        if (this.ColumnCategoryState != this.blotter.adaptableBlotterStore.TheStore.getState().ColumnCategory) {
            this.ColumnCategoryState = this.blotter.adaptableBlotterStore.TheStore.getState().ColumnCategory;
            if (this.blotter.IsInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.ColumnCategory, this.ColumnCategoryState);
            }
        }
    }
}
exports.ColumnCategoryStrategy = ColumnCategoryStrategy;
