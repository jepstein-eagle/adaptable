"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
const Enums_1 = require("../../Utilities/Enums");
const DASHBOARD_SET_AVAILABLE_TOOLBARS = 'DASHBOARD_SET_AVAILABLE_TOOLBARS';
const DASHBOARD_SET_TOOLBARS = 'DASHBOARD_SET_TOOLBARS';
const DASHBOARD_SHOW_TOOLBAR = 'DASHBOARD_SHOW_TOOLBAR';
const DASHBOARD_HIDE_TOOLBAR = 'DASHBOARD_HIDE_TOOLBAR';
const DASHBOARD_MOVE_ITEM = 'DASHBOARD_MOVE_ITEM';
const DASHBOARD_SET_FUNCTION_BUTTONS = 'DASHBOARD_SET_FUNCTION_BUTTONS';
const DASHBOARD_SET_ZOOM = 'DASHBOARD_SET_ZOOM';
const DASHBOARD_SET_VISIBILITY = 'DASHBOARD_SET_VISIBILITY';
const DASHBOARD_SHOW_SYSTEM_STATUS_BUTTON = 'DASHBOARD_SHOW_SYSTEM_STATUS_BUTTON';
const DASHBOARD_HIDE_SYSTEM_STATUS_BUTTON = 'DASHBOARD_HIDE_SYSTEM_STATUS_BUTTON';
const DASHBOARD_SHOW_ABOUT_BUTTON = 'DASDASHBOARD_SHOW_ABOUT_BUTTONHBOARD_SHOW_SYSTEM_STATUS_BUTTON';
const DASHBOARD_HIDE_ABOUT_BUTTON = 'DASHBOARD_HIDE_ABOUT_BUTTON';
const DASHBOARD_SHOW_FUNCTIONS_DROPDOWN = 'DASHBOARD_SHOW_FUNCTIONS_DROPDOWN';
const DASHBOARD_HIDE_FUNCTIONS_DROPDOWN = 'DASHBOARD_HIDE_FUNCTIONS_DROPDOWN';
const DASHBOARD_SHOW_COLUMNS_DROPDOWN = 'DASHBOARD_SHOW_COLUMNS_DROPDOWN';
const DASHBOARD_HIDE_COLUMNS_DROPDOWN = 'DASHBOARD_HIDE_COLUMNS_DROPDOWN';
const DASHBOARD_SHOW_TOOLBARS_DROPDOWN = 'DASHBOARD_SHOW_TOOLBARS_DROPDOWN';
const DASHBOARD_HIDE_TOOLBARS_DROPDOWN = 'DASHBOARD_HIDE_TOOLBARS_DROPDOWN';
const DASHBOARD_SET_HOME_TOOLBAR_TITLE = 'DASHBOARD_SET_HOME_TOOLBAR_TITLE';
const DASHBOARD_SET_APPLICATION_TOOLBAR_TITLE = 'DASHBOARD_SET_APPLICATION_TOOLBAR_TITLE';
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
exports.DashboardShowSystemStatusButton = () => ({
    type: DASHBOARD_SHOW_SYSTEM_STATUS_BUTTON,
});
exports.DashboardHideSystemStatusButton = () => ({
    type: DASHBOARD_HIDE_SYSTEM_STATUS_BUTTON,
});
exports.DashboardShowAboutButton = () => ({
    type: DASHBOARD_SHOW_ABOUT_BUTTON,
});
exports.DashboardHideAboutButton = () => ({
    type: DASHBOARD_HIDE_ABOUT_BUTTON,
});
exports.DashboardShowFunctionsDropdown = () => ({
    type: DASHBOARD_SHOW_FUNCTIONS_DROPDOWN,
});
exports.DashboardHideFunctionsDropdown = () => ({
    type: DASHBOARD_HIDE_FUNCTIONS_DROPDOWN,
});
exports.DashboardShowColumnsDropdown = () => ({
    type: DASHBOARD_SHOW_COLUMNS_DROPDOWN,
});
exports.DashboardHideColumnsDropdown = () => ({
    type: DASHBOARD_HIDE_COLUMNS_DROPDOWN,
});
exports.DashboardShowToolbarsDropdown = () => ({
    type: DASHBOARD_SHOW_TOOLBARS_DROPDOWN,
});
exports.DashboardHideToolbarsDropdown = () => ({
    type: DASHBOARD_HIDE_TOOLBARS_DROPDOWN,
});
exports.DashboardSetHomeToolbarTitle = (Title) => ({
    type: DASHBOARD_SET_HOME_TOOLBAR_TITLE,
    Title
});
exports.DashboardSetApplicationToolbarTitle = (Title) => ({
    type: DASHBOARD_SET_APPLICATION_TOOLBAR_TITLE,
    Title
});
const initialDashboardState = {
    AvailableToolbars: [
        StrategyConstants.AdvancedSearchStrategyId,
        StrategyConstants.QuickSearchStrategyId,
        StrategyConstants.LayoutStrategyId,
        StrategyConstants.ExportStrategyId,
        StrategyConstants.ColumnFilterStrategyId,
        StrategyConstants.DataSourceStrategyId,
        StrategyConstants.BulkUpdateStrategyId,
        StrategyConstants.SmartEditStrategyId,
        StrategyConstants.CellSummaryStrategyId,
        StrategyConstants.ApplicationStrategyId,
        StrategyConstants.AlertStrategyId,
        StrategyConstants.ChartStrategyId,
        StrategyConstants.ThemeStrategyId
    ],
    VisibleToolbars: [
        StrategyConstants.AdvancedSearchStrategyId,
        StrategyConstants.QuickSearchStrategyId,
        StrategyConstants.LayoutStrategyId,
        StrategyConstants.ExportStrategyId,
        StrategyConstants.ColumnFilterStrategyId,
    ],
    VisibleButtons: [
        StrategyConstants.DashboardStrategyId,
        StrategyConstants.SmartEditStrategyId,
        StrategyConstants.ColumnChooserStrategyId,
        StrategyConstants.ConditionalStyleStrategyId,
        StrategyConstants.TeamSharingStrategyId
    ],
    Zoom: 1,
    DashboardVisibility: Enums_1.Visibility.Visible,
    ShowSystemStatusButton: true,
    ShowAboutButton: true,
    ShowFunctionsDropdown: true,
    ShowColumnsDropdown: true,
    ShowToolbarsDropdown: true,
    HomeToolbarTitle: "",
    ApplicationToolbarTitle: ""
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
        case DASHBOARD_SHOW_SYSTEM_STATUS_BUTTON: {
            return Object.assign({}, state, { ShowSystemStatusButton: true });
        }
        case DASHBOARD_HIDE_SYSTEM_STATUS_BUTTON: {
            return Object.assign({}, state, { ShowSystemStatusButton: false });
        }
        case DASHBOARD_SHOW_ABOUT_BUTTON: {
            return Object.assign({}, state, { ShowAboutButton: true });
        }
        case DASHBOARD_HIDE_ABOUT_BUTTON: {
            return Object.assign({}, state, { ShowAboutButton: false });
        }
        case DASHBOARD_SHOW_FUNCTIONS_DROPDOWN: {
            return Object.assign({}, state, { ShowFunctionsDropdown: true });
        }
        case DASHBOARD_HIDE_FUNCTIONS_DROPDOWN: {
            return Object.assign({}, state, { ShowFunctionsDropdown: false });
        }
        case DASHBOARD_SHOW_COLUMNS_DROPDOWN: {
            return Object.assign({}, state, { ShowColumnsDropdown: true });
        }
        case DASHBOARD_HIDE_COLUMNS_DROPDOWN: {
            return Object.assign({}, state, { ShowColumnsDropdown: false });
        }
        case DASHBOARD_SHOW_TOOLBARS_DROPDOWN: {
            return Object.assign({}, state, { ShowToolbarsDropdown: true });
        }
        case DASHBOARD_HIDE_TOOLBARS_DROPDOWN: {
            return Object.assign({}, state, { ShowToolbarsDropdown: false });
        }
        case DASHBOARD_SET_HOME_TOOLBAR_TITLE: {
            let actionTyped = action;
            return Object.assign({}, state, { HomeToolbarTitle: actionTyped.Title });
        }
        case DASHBOARD_SET_APPLICATION_TOOLBAR_TITLE: {
            let actionTyped = action;
            return Object.assign({}, state, { ApplicationToolbarTitle: actionTyped.Title });
        }
        default:
            return state;
    }
};
