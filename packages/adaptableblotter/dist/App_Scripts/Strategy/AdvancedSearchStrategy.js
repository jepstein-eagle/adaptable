"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const StrategyNames = require("../Core/Constants/StrategyNames");
const StrategyGlyphs = require("../Core/Constants/StrategyGlyphs");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const Enums_1 = require("../Core/Enums");
class AdvancedSearchStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.AdvancedSearchStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.AdvancedSearchStrategyName, ScreenPopups.AdvancedSearchPopup, StrategyGlyphs.AdvancedSearchGlyph);
    }
    InitState() {
        if (this.AdvancedSearchState != this.GetAdvancedSearchState()) {
            this.AdvancedSearchState = this.GetAdvancedSearchState();
            // this is re-applying grid filtering even if the change to the search state doesnt effect the current advanced search
            //  probably not an issue but might be worth revisiting ...
            this.blotter.applyGridFiltering();
            if (this.blotter.BlotterOptions.serverSearchOption != 'None') {
                this.publishServerSearch(Enums_1.SearchChangedTrigger.AdvancedSearch);
            }
        }
    }
    GetAdvancedSearchState() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch;
    }
}
exports.AdvancedSearchStrategy = AdvancedSearchStrategy;
