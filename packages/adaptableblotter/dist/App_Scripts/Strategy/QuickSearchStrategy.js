"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../Utilities/Constants/ScreenPopups");
const Enums_1 = require("../Utilities/Enums");
class QuickSearchStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.QuickSearchStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.QuickSearchStrategyName, ScreenPopups.QuickSearchPopup, StrategyConstants.QuickSearchGlyph);
    }
    InitState() {
        if (this.quickSearchState != this.GetQuickSearchState()) {
            this.quickSearchState = this.GetQuickSearchState();
            this.blotter.applyGridFiltering();
            this.postSearch();
            if (this.blotter.BlotterOptions.generalOptions.serverSearchOption == 'AllSearch' || 'AllSearchandSort') {
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
