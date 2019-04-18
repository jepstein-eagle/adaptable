"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const GlyphConstants = require("../Utilities/Constants/GlyphConstants");
const GridRedux = require("../Redux/ActionsReducers/GridRedux");
const ArrayExtensions_1 = require("../Utilities/Extensions/ArrayExtensions");
const Enums_1 = require("../Utilities/Enums");
const LayoutHelper_1 = require("../Utilities/Helpers/LayoutHelper");
// This is a special strategy that the user can never remove but which is useful to us 
// We use it to manage internal state changes and menu items that are not directly strategy related
class HomeStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.HomeStrategyId, blotter);
    }
    addContextMenuItem(column) {
        if (this.canCreateContextMenuItem(column, this.blotter)) {
            this.createContextMenuItemReduxAction("Hide Column", StrategyConstants.ColumnChooserGlyph, GridRedux.GridHideColumn(column.ColumnId));
        }
        if (this.canCreateContextMenuItem(column, this.blotter, "floatingfilter")) {
            let isFilterActive = this.GridState.IsFloatingFilterActive;
            this.createContextMenuItemReduxAction(isFilterActive ? "Hide Floating Filter Bar" : "Show Floating Filter Bar", isFilterActive ? GlyphConstants.OK_GLYPH : GlyphConstants.REMOVE_GLYPH, isFilterActive ? GridRedux.FloatingFilterBarHide() : GridRedux.FloatingilterBarShow());
        }
        if (this.blotter.isSelectable()) {
            if (this.canCreateContextMenuItem(column, this.blotter)) {
                this.createContextMenuItemReduxAction("Select Column", "compressed", GridRedux.GridSelectColumn(column.ColumnId));
            }
        }
    }
    InitState() {
        if (!ArrayExtensions_1.ArrayExtensions.areArraysEqualWithOrderandProperties(this.GridSorts, this.GetGridState().GridSorts)) {
            this.GridSorts = this.GetGridState().GridSorts;
            if (this.blotter.BlotterOptions.generalOptions.serverSearchOption == "AllSearchandSort") {
                this.publishSearchChanged(Enums_1.SearchChangedTrigger.Sort);
            }
        }
        if (this.GridState != this.GetGridState()) {
            if (this.GridState != null && this.GridState.Columns != null && this.GridState.GridSorts != null) {
                if (this.GridState.Columns != this.GetGridState().Columns || this.GridState.GridSorts != this.GetGridState().GridSorts) {
                    this.GridState = this.GetGridState();
                    LayoutHelper_1.LayoutHelper.autoSaveLayout(this.blotter);
                }
            }
            this.GridState = this.GetGridState();
        }
    }
    GetGridState() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Grid;
    }
}
exports.HomeStrategy = HomeStrategy;
