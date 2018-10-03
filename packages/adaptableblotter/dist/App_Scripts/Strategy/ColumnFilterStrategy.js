"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const FilterRedux = require("../Redux/ActionsReducers/FilterRedux");
const Enums_1 = require("../Core/Enums");
const ColumnHelper_1 = require("../Core/Helpers/ColumnHelper");
class ColumnFilterStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.ColumnFilterStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.ColumnFilterStrategyName, ScreenPopups.ColumnFilterPopup, StrategyIds.ColumnFilterGlyph);
    }
    addContextMenuItem(columnId) {
        if (this.canCreateContextMenuItem(columnId, this.blotter, "filter")) {
            let column = ColumnHelper_1.ColumnHelper.getColumnFromId(columnId, this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns);
            if (column) {
                let existingColumnFilter = this.columnFilterState.find(x => x.ColumnId == columnId);
                if (existingColumnFilter) {
                    this.createContextMenuItemReduxAction("Clear Column Filter", StrategyIds.ColumnFilterGlyph, FilterRedux.ColumnFilterClear(columnId));
                }
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
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Filter.ColumnFilters;
    }
}
exports.ColumnFilterStrategy = ColumnFilterStrategy;
