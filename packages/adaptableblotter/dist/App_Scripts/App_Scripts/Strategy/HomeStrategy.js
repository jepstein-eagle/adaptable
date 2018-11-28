"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Core/Constants/StrategyConstants");
const GlyphConstants = require("../Core/Constants/GlyphConstants");
const HomeRedux = require("../Redux/ActionsReducers/HomeRedux");
const ArrayExtensions_1 = require("../Utilities/Extensions/ArrayExtensions");
const Enums_1 = require("../Core/Enums");
const LayoutHelper_1 = require("../Utilities/Helpers/LayoutHelper");
// This is a special strategy that the user can never remove but which is useful to us 
// We use it to manage internal state changes and menu items that are not directly strategy related
class HomeStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.HomeStrategyId, blotter);
    }
    addContextMenuItem(column) {
        if (this.canCreateContextMenuItem(column, this.blotter, "quickfilter")) {
            this.createContextMenuItemReduxAction(this.blotter.isQuickFilterActive() ? "Hide Quick Filter Bar" : "Show Quick Filter Bar", this.blotter.isQuickFilterActive() ? GlyphConstants.OK_GLYPH : GlyphConstants.REMOVE_GLYPH, this.blotter.isQuickFilterActive() ? HomeRedux.QuickFilterBarHide() : HomeRedux.QuickFilterBarShow());
        }
    }
    InitState() {
        if (!ArrayExtensions_1.ArrayExtensions.areArraysEqualWithOrderandProperties(this.GridSorts, this.GetGridState().GridSorts)) {
            this.GridSorts = this.GetGridState().GridSorts;
            if (this.blotter.BlotterOptions.serverSearchOption == "AllSearchandSort") {
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
