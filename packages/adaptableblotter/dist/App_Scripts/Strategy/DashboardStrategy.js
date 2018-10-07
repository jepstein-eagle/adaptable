"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const Enums_1 = require("../Core/Enums");
const DashboardRedux = require("../Redux/ActionsReducers/DashboardRedux");
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
        if (this.DashboardState != this.blotter.AdaptableBlotterStore.TheStore.getState().Dashboard) {
            this.DashboardState = this.blotter.AdaptableBlotterStore.TheStore.getState().Dashboard;
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.Dashboard, this.DashboardState);
            }
        }
    }
    GetDashboardState() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Dashboard;
    }
}
exports.DashboardStrategy = DashboardStrategy;
