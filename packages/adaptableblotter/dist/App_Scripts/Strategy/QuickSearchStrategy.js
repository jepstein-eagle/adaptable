"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const Enums_1 = require("../Core/Enums");
class QuickSearchStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.QuickSearchStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.QuickSearchStrategyName, ScreenPopups.QuickSearchPopup, StrategyIds.QuickSearchGlyph);
    }
    InitState() {
        if (this.quickSearchState != this.GetQuickSearchState()) {
            this.quickSearchState = this.GetQuickSearchState();
            this.blotter.applyGridFiltering();
            this.postSearch();
            if (this.blotter.BlotterOptions.serverSearchOption == 'AllSearch' || 'AllSearchandSort') {
                this.publishSearchChanged(Enums_1.SearchChangedTrigger.QuickSearch);
            }
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.QuickSearch, this.quickSearchState);
            }
        }
    }
    GetQuickSearchState() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch;
    }
    postSearch() {
        // required only for ag-Grid to inherit - a better way possible?
    }
}
exports.QuickSearchStrategy = QuickSearchStrategy;
