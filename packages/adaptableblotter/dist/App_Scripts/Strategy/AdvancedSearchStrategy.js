"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Core/Constants/StrategyConstants");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const Enums_1 = require("../Core/Enums");
class AdvancedSearchStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.AdvancedSearchStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.AdvancedSearchStrategyName, ScreenPopups.AdvancedSearchPopup, StrategyConstants.AdvancedSearchGlyph);
    }
    InitState() {
        if (this.AdvancedSearchState != this.GetAdvancedSearchState()) {
            this.AdvancedSearchState = this.GetAdvancedSearchState();
            // this is re-applying grid filtering even if the change to the search state doesnt effect the current advanced search
            //  probably not an issue but might be worth revisiting ...
            this.blotter.applyGridFiltering();
            if (this.blotter.BlotterOptions.serverSearchOption != 'None') {
                this.publishSearchChanged(Enums_1.SearchChangedTrigger.AdvancedSearch);
            }
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.AdvancedSearch, this.AdvancedSearchState);
            }
        }
    }
    GetAdvancedSearchState() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch;
    }
}
exports.AdvancedSearchStrategy = AdvancedSearchStrategy;
