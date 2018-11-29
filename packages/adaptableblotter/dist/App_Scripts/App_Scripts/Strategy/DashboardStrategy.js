"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Core/Constants/StrategyConstants");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const Enums_1 = require("../Utilities/Enums");
const DashboardRedux = require("../Redux/ActionsReducers/DashboardRedux");
class DashboardStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.DashboardStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.DashboardStrategyName, ScreenPopups.DashboardPopup, StrategyConstants.DashboardGlyph);
    }
    addContextMenuItem() {
        // for now just show / hide = lets worry about minimise later..
        if (this.GetDashboardState().DashboardVisibility == Enums_1.Visibility.Hidden) {
            this.createContextMenuItemReduxAction("Show Dashboard", StrategyConstants.DashboardGlyph, DashboardRedux.DashboardSetVisibility(Enums_1.Visibility.Visible));
        }
        else {
            this.createContextMenuItemReduxAction("Hide Dashboard", StrategyConstants.DashboardGlyph, DashboardRedux.DashboardSetVisibility(Enums_1.Visibility.Hidden));
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
