"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const StrategyNames = require("../Core/Constants/StrategyNames");
const StrategyGlyphs = require("../Core/Constants/StrategyGlyphs");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const ArrayExtensions_1 = require("../Core/Extensions/ArrayExtensions");
const Enums_1 = require("../Core/Enums");
const DashboardRedux = require("../Redux/ActionsReducers/DashboardRedux");
const LayoutHelper_1 = require("../Core/Helpers/LayoutHelper");
class DashboardStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.DashboardStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.DashboardStrategyName, ScreenPopups.DashboardPopup, StrategyGlyphs.DashboardGlyph);
    }
    addContextMenuItem() {
        // for now just show / hide = lets worry about minimise later..
        if (this.GetDashboardState().DashboardVisibility == Enums_1.Visibility.Hidden) {
            this.createContextMenuItemReduxAction("Show Dashboard", StrategyGlyphs.DashboardGlyph, DashboardRedux.DashboardSetVisibility(Enums_1.Visibility.Visible));
        }
        else {
            this.createContextMenuItemReduxAction("Hide Dashboard", StrategyGlyphs.DashboardGlyph, DashboardRedux.DashboardSetVisibility(Enums_1.Visibility.Hidden));
        }
    }
    InitState() {
        // none of this should be here - should be in a GridStrategy that cannot be hidden
        if (!ArrayExtensions_1.ArrayExtensions.areArraysEqualWithOrderandProperties(this.GridSorts, this.GetGridState().GridSorts)) {
            this.GridSorts = this.GetGridState().GridSorts;
            if (this.blotter.BlotterOptions.serverSearchOption == "AllSearchandSort") {
                this.publishServerSearch(Enums_1.SearchChangedTrigger.Sort);
            }
        }
        if (this.GridState != this.GetGridState()) {
            if (this.GridState.Columns != this.GetGridState().Columns || this.GridState.GridSorts != this.GetGridState().GridSorts) {
                LayoutHelper_1.LayoutHelper.autoSaveLayout(this.blotter);
            }
            this.GridState = this.GetGridState();
        }
    }
    GetGridState() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Grid;
    }
    GetDashboardState() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Dashboard;
    }
}
exports.DashboardStrategy = DashboardStrategy;
