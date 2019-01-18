"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DashboardRedux = require("../Redux/ActionsReducers/DashboardRedux");
const ApiBase_1 = require("./ApiBase");
const Enums_1 = require("../Utilities/Enums");
class DashboardApi extends ApiBase_1.ApiBase {
    SetAvailableToolbars(availableToolbars) {
        this.dispatchAction(DashboardRedux.DashboardSetAvailableToolbars(availableToolbars));
    }
    SetVisibleToolbars(visibleToolbars) {
        visibleToolbars.forEach(vt => {
            this.ShowToolbar(vt);
        });
    }
    ShowToolbar(visibleToolbar) {
        this.dispatchAction(DashboardRedux.DashboardShowToolbar(visibleToolbar));
    }
    HideToolbar(visibleToolbar) {
        this.dispatchAction(DashboardRedux.DashboardHideToolbar(visibleToolbar));
    }
    SetVisibleButtons(functionButtons) {
        this.dispatchAction(DashboardRedux.DashboardSetFunctionButtons(functionButtons));
    }
    SetZoom(zoom) {
        this.dispatchAction(DashboardRedux.DashboardSetZoom(zoom));
    }
    SetVisibility(dashboardVisibility) {
        this.dispatchAction(DashboardRedux.DashboardSetVisibility(dashboardVisibility));
    }
    Show() {
        this.SetVisibility(Enums_1.Visibility.Visible);
    }
    Hide() {
        this.SetVisibility(Enums_1.Visibility.Hidden);
    }
    Minimise() {
        this.SetVisibility(Enums_1.Visibility.Minimised);
    }
    ShowSystemStatusButton() {
        this.dispatchAction(DashboardRedux.DashboardShowSystemStatusButton());
    }
    HideSystemStatusButton() {
        this.dispatchAction(DashboardRedux.DashboardHideSystemStatusButton());
    }
    ShowAboutButton() {
        this.dispatchAction(DashboardRedux.DashboardShowAboutButton());
    }
    HideAboutButton() {
        this.dispatchAction(DashboardRedux.DashboardHideAboutButton());
    }
    ShowFunctionsDropdown() {
        this.dispatchAction(DashboardRedux.DashboardShowFunctionsDropdown());
    }
    HideFunctionsDropdown() {
        this.dispatchAction(DashboardRedux.DashboardHideFunctionsDropdown());
    }
    ShowColumnsDropdown() {
        this.dispatchAction(DashboardRedux.DashboardShowColumnsDropdown());
    }
    HideColumnsDropdown() {
        this.dispatchAction(DashboardRedux.DashboardHideColumnsDropdown());
    }
    SetHomeToolbarTitle(title) {
        this.dispatchAction(DashboardRedux.DashboardSetHomeToolbarTitle(title));
    }
    SetApplicationToolbarTitle(title) {
        this.dispatchAction(DashboardRedux.DashboardSetApplicationToolbarTitle(title));
    }
}
exports.DashboardApi = DashboardApi;
