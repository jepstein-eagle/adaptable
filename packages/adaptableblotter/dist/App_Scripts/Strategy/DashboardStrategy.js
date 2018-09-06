"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
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
        this.createMenuItemShowPopup(StrategyIds.DashboardStrategyName, ScreenPopups.DashboardPopup, StrategyIds.DashboardGlyph);
    }
    addContextMenuItem() {
        // for now just show / hide = lets worry about minimise later..
        if (this.GetDashboardState().DashboardVisibility == Enums_1.Visibility.Hidden) {
            this.createContextMenuItemReduxAction("Show Dashboard", StrategyIds.DashboardGlyph, DashboardRedux.DashboardSetVisibility(Enums_1.Visibility.Visible));
        }
        else {
            this.createContextMenuItemReduxAction("Hide Dashboard", StrategyIds.DashboardGlyph, DashboardRedux.DashboardSetVisibility(Enums_1.Visibility.Hidden));
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
    GetDashboardState() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Dashboard;
    }
}
exports.DashboardStrategy = DashboardStrategy;
