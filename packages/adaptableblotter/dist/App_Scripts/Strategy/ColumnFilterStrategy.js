"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../Utilities/Constants/ScreenPopups");
const ColumnFilterRedux = require("../Redux/ActionsReducers/ColumnFilterRedux");
const Enums_1 = require("../Utilities/Enums");
class ColumnFilterStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.ColumnFilterStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ColumnFilterStrategyName, ScreenPopups.ColumnFilterPopup, StrategyConstants.ColumnFilterGlyph);
    }
    addContextMenuItem(column) {
        if (this.canCreateContextMenuItem(column, this.blotter, "filter")) {
            let existingColumnFilter = this.columnFilterState.find(x => x.ColumnId == column.ColumnId);
            if (existingColumnFilter) {
                this.createContextMenuItemReduxAction("Clear Column Filter", StrategyConstants.ColumnFilterGlyph, ColumnFilterRedux.ColumnFilterClear(column.ColumnId));
            }
        }
    }
    InitState() {
        if (this.columnFilterState != this.GetColumnFilterState()) {
            this.columnFilterState = this.GetColumnFilterState();
            setTimeout(() => this.blotter.applyGridFiltering(), 5);
            if (this.blotter.BlotterOptions.serverSearchOption == 'AllSearch' || 'AllSearchandSort') {
                this.publishSearchChanged(Enums_1.SearchChangedTrigger.ColumnFilter);
            }
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.ColumnFilter, this.columnFilterState);
            }
        }
    }
    GetColumnFilterState() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().ColumnFilter.ColumnFilters;
    }
}
exports.ColumnFilterStrategy = ColumnFilterStrategy;
