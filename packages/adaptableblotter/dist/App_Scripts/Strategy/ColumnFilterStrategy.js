"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const StrategyNames = require("../Core/Constants/StrategyNames");
const StrategyGlyphs = require("../Core/Constants/StrategyGlyphs");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const Enums_1 = require("../Core/Enums");
class ColumnFilterStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.ColumnFilterStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.ColumnFilterStrategyName, ScreenPopups.ColumnFilterPopup, StrategyGlyphs.ColumnFilterGlyph);
    }
    InitState() {
        if (this.filterState != this.GetColumnFilterState()) {
            this.filterState = this.GetColumnFilterState();
            setTimeout(() => this.blotter.applyGridFiltering(), 5);
            if (this.blotter.BlotterOptions.serverSearchOption == 'AllSearch' || 'AllSearchandSort') {
                this.publishServerSearch(Enums_1.SearchChangedTrigger.ColumnFilter);
            }
        }
    }
    GetColumnFilterState() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Filter.ColumnFilters;
    }
}
exports.ColumnFilterStrategy = ColumnFilterStrategy;
