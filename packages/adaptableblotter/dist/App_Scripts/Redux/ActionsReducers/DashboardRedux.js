"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StrategyIds = require("../../Core/Constants/StrategyIds");
const ArrayExtensions_1 = require("../../Core/Extensions/ArrayExtensions");
const Enums_1 = require("../../Core/Enums");
const DASHBOARD_SET_AVAILABLE_TOOLBARS = 'DASHBOARD_SET_AVAILABLE_TOOLBARS';
const DASHBOARD_SET_TOOLBARS = 'DASHBOARD_SET_TOOLBARS';
const DASHBOARD_SHOW_TOOLBAR = 'DASHBOARD_SHOW_TOOLBAR';
const DASHBOARD_HIDE_TOOLBAR = 'DASHBOARD_HIDE_TOOLBAR';
const DASHBOARD_MOVE_ITEM = 'DASHBOARD_MOVE_ITEM';
const DASHBOARD_SET_FUNCTION_BUTTONS = 'DASHBOARD_SET_FUNCTION_BUTTONS';
const DASHBOARD_SET_ZOOM = 'DASHBOARD_SET_ZOOM';
const DASHBOARD_SET_VISIBILITY = 'DASHBOARD_SET_VISIBILITY';
exports.DashboardSetAvailableToolbars = (StrategyIds) => ({
    type: DASHBOARD_SET_AVAILABLE_TOOLBARS,
    StrategyIds
});
exports.DashboardSetToolbars = (StrategyIds) => ({
    type: DASHBOARD_SET_TOOLBARS,
    StrategyIds
});
exports.DashboardShowToolbar = (StrategyId) => ({
    type: DASHBOARD_SHOW_TOOLBAR,
    StrategyId
});
exports.DashboardHideToolbar = (StrategyId) => ({
    type: DASHBOARD_HIDE_TOOLBAR,
    StrategyId
});
exports.DashboardMoveItem = (StrategyId, NewIndex) => ({
    type: DASHBOARD_MOVE_ITEM,
    StrategyId,
    NewIndex
});
exports.DashboardSetFunctionButtons = (StrategyIds) => ({
    type: DASHBOARD_SET_FUNCTION_BUTTONS,
    StrategyIds,
});
exports.DashboardSetZoom = (Zoom) => ({
    type: DASHBOARD_SET_ZOOM,
    Zoom
});
exports.DashboardSetVisibility = (Visibility) => ({
    type: DASHBOARD_SET_VISIBILITY,
    Visibility
});
const initialDashboardState = {
    AvailableToolbars: [
        StrategyIds.AdvancedSearchStrategyId,
        StrategyIds.QuickSearchStrategyId,
        StrategyIds.LayoutStrategyId,
        StrategyIds.ExportStrategyId,
        StrategyIds.ColumnFilterStrategyId,
        StrategyIds.DataSourceStrategyId,
        StrategyIds.BulkUpdateStrategyId,
        StrategyIds.SmartEditStrategyId,
        StrategyIds.SelectedCellsStrategyId,
        StrategyIds.ApplicationStrategyId,
        StrategyIds.AlertStrategyId,
    ],
    VisibleToolbars: [
        StrategyIds.AdvancedSearchStrategyId,
        StrategyIds.QuickSearchStrategyId,
        StrategyIds.LayoutStrategyId,
        StrategyIds.ExportStrategyId,
        StrategyIds.ColumnFilterStrategyId,
    ],
    VisibleButtons: [
        StrategyIds.AboutStrategyId,
        StrategyIds.DashboardStrategyId,
        StrategyIds.SmartEditStrategyId,
        StrategyIds.ColumnChooserStrategyId,
        StrategyIds.ConditionalStyleStrategyId,
        StrategyIds.TeamSharingStrategyId
    ],
    Zoom: 1,
    DashboardVisibility: Enums_1.Visibility.Visible,
    ShowSystemStatusButton: true,
    ShowFunctionsDropdown: true,
    ShowColumnsDropdown: true,
    HomeToolbarTitle: ""
};
exports.DashboardReducer = (state = initialDashboardState, action) => {
    let index;
    let dashboardControls;
    switch (action.type) {
        case DASHBOARD_SET_AVAILABLE_TOOLBARS:
            return Object.assign({}, state, { AvailableToolbars: action.StrategyIds });
        case DASHBOARD_SET_TOOLBARS: {
            let actionTyped = action;
            let dashboardToolbars = actionTyped.StrategyIds;
            return Object.assign({}, state, { VisibleToolbars: dashboardToolbars });
        }
        case DASHBOARD_MOVE_ITEM: {
            let actionTyped = action;
            dashboardControls = [].concat(state.VisibleToolbars);
            index = dashboardControls.findIndex(a => a == actionTyped.StrategyId);
            ArrayExtensions_1.ArrayExtensions.moveArray(dashboardControls, index, actionTyped.NewIndex);
            return Object.assign({}, state, { VisibleToolbars: dashboardControls });
        }
        case DASHBOARD_SHOW_TOOLBAR: {
            let actionTyped = action;
            let dashboardToolbars = [].concat(state.VisibleToolbars);
            dashboardToolbars.push(actionTyped.StrategyId);
            return Object.assign({}, state, { VisibleToolbars: dashboardToolbars });
        }
        case DASHBOARD_HIDE_TOOLBAR: {
            let actionTyped = action;
            let dashboardToolbars = [].concat(state.VisibleToolbars);
            index = dashboardToolbars.findIndex(a => a == actionTyped.StrategyId);
            dashboardToolbars.splice(index, 1);
            return Object.assign({}, state, { VisibleToolbars: dashboardToolbars });
        }
        case DASHBOARD_SET_FUNCTION_BUTTONS: {
            let actionTyped = action;
            let dashboardFunctionButtons = actionTyped.StrategyIds;
            return Object.assign({}, state, { VisibleButtons: dashboardFunctionButtons });
        }
        case DASHBOARD_SET_ZOOM: {
            let actionTyped = action;
            return Object.assign({}, state, { Zoom: actionTyped.Zoom });
        }
        case DASHBOARD_SET_VISIBILITY: {
            let actionTyped = action;
            return Object.assign({}, state, { DashboardVisibility: actionTyped.Visibility });
        }
        default:
            return state;
    }
};
