"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Core/Constants/StrategyConstants");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const StringExtensions_1 = require("../Core/Extensions/StringExtensions");
const Enums_1 = require("../Core/Enums");
class UserFilterStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.UserFilterStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.UserFilterStrategyName, ScreenPopups.UserFilterPopup, StrategyConstants.UserFilterGlyph);
    }
    addContextMenuItem(column) {
        if (this.canCreateContextMenuItem(column, this.blotter, "filter")) {
            this.createContextMenuItemShowPopup("Create User Filter", ScreenPopups.UserFilterPopup, StrategyConstants.UserFilterGlyph, "New|" + column.ColumnId);
        }
    }
    InitState() {
        if (this.userFilters != this.GetUserFilterState()) {
            this.userFilters = this.GetUserFilterState();
            setTimeout(() => this.blotter.applyGridFiltering(), 5);
            if (this.blotter.BlotterOptions.serverSearchOption != 'None') {
                // we cannot stop all extraneous publishing (e.g. we publish if the changed user filter is NOT being used)
                // but we can at least ensure that we only publish IF there are live searches or column filters
                if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.CurrentAdvancedSearch)
                    || this.blotter.AdaptableBlotterStore.TheStore.getState().ColumnFilter.ColumnFilters.length > 0) {
                    this.publishSearchChanged(Enums_1.SearchChangedTrigger.UserFilter);
                }
            }
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.UserFilter, this.userFilters);
            }
        }
    }
    GetUserFilterState() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().UserFilter.UserFilters;
    }
}
exports.UserFilterStrategy = UserFilterStrategy;
