"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableBlotterStore_1 = require("../Redux/Store/AdaptableBlotterStore");
const Enums_1 = require("../Utilities/Enums");
const ApiBase_1 = require("./ApiBase");
class ConfigApi extends ApiBase_1.ApiBase {
    configClear() {
        //this doesnt work but should!
        this.dispatchAction(AdaptableBlotterStore_1.ResetUserData());
    }
    configDeleteLocalStorage() {
        //   a horrible rough and ready method which clears local storage and refreshes but is not nice.
        localStorage.removeItem(this.blotter.BlotterOptions.blotterId);
        window.location.reload();
    }
    configGetAllState() {
        return this.getState();
    }
    getUserStateKeys() {
        return ['AdvancedSearch', 'Alert', 'BulkUpdate', 'CalculatedColumn',
            'Calendar', 'CellValidation', 'Chart', 'ColumnFilter', 'ConditionalStyle',
            'CustomSort', 'Dashboard', 'DataSource', 'Export', 'FlashingCell',
            'FormatColumn', 'Layout', 'PlusMinus', 'QuickSearch', 'SelectedCells',
            'Shortcut', 'SmartEdit', 'Theme', 'UserFilter'];
    }
    configGetAllUserState() {
        const userStateKeys = this.getUserStateKeys();
        const allState = this.configGetAllState();
        return userStateKeys.map(k => allState[k]);
    }
    configloadUserState(state) {
        const userStateKeys = this.getUserStateKeys();
        const userState = Object.keys(state).reduce((xs, x) => userStateKeys.indexOf(x) !== -1 ? Object.assign({}, xs, { [x]: state[x] }) : xs, {});
        this.dispatchAction(AdaptableBlotterStore_1.LoadState(userState));
    }
    configGetUserStateByFunction(functionName, returnJson = false) {
        switch (functionName) {
            case Enums_1.StateChangedTrigger.AdvancedSearch:
                return (returnJson) ? JSON.stringify(this.getState().AdvancedSearch) : this.getState().AdvancedSearch;
            case Enums_1.StateChangedTrigger.Alert:
                return (returnJson) ? JSON.stringify(this.getState().Alert) : this.getState().Alert;
            case Enums_1.StateChangedTrigger.BulkUpdate:
                return (returnJson) ? JSON.stringify(this.getState().BulkUpdate) : this.getState().BulkUpdate;
            case Enums_1.StateChangedTrigger.CalculatedColumn:
                return (returnJson) ? JSON.stringify(this.getState().CalculatedColumn) : this.getState().CalculatedColumn;
            case Enums_1.StateChangedTrigger.Calendar:
                return (returnJson) ? JSON.stringify(this.getState().Calendar) : this.getState().Calendar;
            case Enums_1.StateChangedTrigger.CellValidation:
                return (returnJson) ? JSON.stringify(this.getState().CellValidation) : this.getState().CellValidation;
            case Enums_1.StateChangedTrigger.Chart:
                return (returnJson) ? JSON.stringify(this.getState().Chart) : this.getState().Chart;
            case Enums_1.StateChangedTrigger.ColumnFilter:
                return (returnJson) ? JSON.stringify(this.getState().ColumnFilter) : this.getState().ColumnFilter;
            case Enums_1.StateChangedTrigger.ConditionalStyle:
                return (returnJson) ? JSON.stringify(this.getState().ConditionalStyle) : this.getState().ConditionalStyle;
            case Enums_1.StateChangedTrigger.CustomSort:
                return (returnJson) ? JSON.stringify(this.getState().CustomSort) : this.getState().CustomSort;
            case Enums_1.StateChangedTrigger.Dashboard:
                return (returnJson) ? JSON.stringify(this.getState().Dashboard) : this.getState().Dashboard;
            case Enums_1.StateChangedTrigger.DataSource:
                return (returnJson) ? JSON.stringify(this.getState().DataSource) : this.getState().DataSource;
            case Enums_1.StateChangedTrigger.Export:
                return (returnJson) ? JSON.stringify(this.getState().Export) : this.getState().Export;
            case Enums_1.StateChangedTrigger.FlashingCell:
                return (returnJson) ? JSON.stringify(this.getState().FlashingCell) : this.getState().FlashingCell;
            case Enums_1.StateChangedTrigger.FormatColumn:
                return (returnJson) ? JSON.stringify(this.getState().FormatColumn) : this.getState().FormatColumn;
            case Enums_1.StateChangedTrigger.Layout:
                return (returnJson) ? JSON.stringify(this.getState().Layout) : this.getState().Layout;
            case Enums_1.StateChangedTrigger.PlusMinus:
                return (returnJson) ? JSON.stringify(this.getState().PlusMinus) : this.getState().PlusMinus;
            case Enums_1.StateChangedTrigger.QuickSearch:
                return (returnJson) ? JSON.stringify(this.getState().QuickSearch) : this.getState().QuickSearch;
            case Enums_1.StateChangedTrigger.CellSummary:
                return (returnJson) ? JSON.stringify(this.getState().SelectedCells) : this.getState().CellSummary;
            case Enums_1.StateChangedTrigger.Shortcut:
                return (returnJson) ? JSON.stringify(this.getState().Shortcut) : this.getState().Shortcut;
            case Enums_1.StateChangedTrigger.SmartEdit:
                return (returnJson) ? JSON.stringify(this.getState().SmartEdit) : this.getState().SmartEdit;
            case Enums_1.StateChangedTrigger.Theme:
                return (returnJson) ? JSON.stringify(this.getState().Theme) : this.getState().Theme;
            case Enums_1.StateChangedTrigger.UserFilter:
                return (returnJson) ? JSON.stringify(this.getState().UserFilter) : this.getState().UserFilter;
        }
    }
    configGetAdvancedSearchState(returnJson = false) {
        return this.configGetUserStateByFunction(Enums_1.StateChangedTrigger.AdvancedSearch, returnJson);
    }
    configGetAlertSearchState(returnJson = false) {
        return this.configGetUserStateByFunction(Enums_1.StateChangedTrigger.Alert, returnJson);
    }
    configGetBulkUpdateState(returnJson = false) {
        return this.configGetUserStateByFunction(Enums_1.StateChangedTrigger.BulkUpdate, returnJson);
    }
    configGetCalculatedColumnState(returnJson = false) {
        return this.configGetUserStateByFunction(Enums_1.StateChangedTrigger.CalculatedColumn, returnJson);
    }
    configGetCalendarState(returnJson = false) {
        return this.configGetUserStateByFunction(Enums_1.StateChangedTrigger.Calendar, returnJson);
    }
    configGetCellValidationState(returnJson = false) {
        return this.configGetUserStateByFunction(Enums_1.StateChangedTrigger.CellValidation, returnJson);
    }
    configGetChartState(returnJson = false) {
        return this.configGetUserStateByFunction(Enums_1.StateChangedTrigger.Chart, returnJson);
    }
    configGetColumnFilterState(returnJson = false) {
        return this.configGetUserStateByFunction(Enums_1.StateChangedTrigger.ColumnFilter, returnJson);
    }
    configGetConditionalStyleState(returnJson = false) {
        return this.configGetUserStateByFunction(Enums_1.StateChangedTrigger.ConditionalStyle, returnJson);
    }
    configGetCustomSortState(returnJson = false) {
        return this.configGetUserStateByFunction(Enums_1.StateChangedTrigger.CustomSort, returnJson);
    }
    configGetDashboardState(returnJson = false) {
        return this.configGetUserStateByFunction(Enums_1.StateChangedTrigger.Dashboard, returnJson);
    }
    configGetDataSourceState(returnJson = false) {
        return this.configGetUserStateByFunction(Enums_1.StateChangedTrigger.DataSource, returnJson);
    }
    configGetExportState(returnJson = false) {
        return this.configGetUserStateByFunction(Enums_1.StateChangedTrigger.Export, returnJson);
    }
    configGetFlashingCellState(returnJson = false) {
        return this.configGetUserStateByFunction(Enums_1.StateChangedTrigger.FlashingCell, returnJson);
    }
    configGetFormatColumnState(returnJson = false) {
        return this.configGetUserStateByFunction(Enums_1.StateChangedTrigger.FormatColumn, returnJson);
    }
    configGetLayoutState(returnJson = false) {
        return this.configGetUserStateByFunction(Enums_1.StateChangedTrigger.Layout, returnJson);
    }
    configGetPlusMinusState(returnJson = false) {
        return this.configGetUserStateByFunction(Enums_1.StateChangedTrigger.PlusMinus, returnJson);
    }
    configGetQuickSearchState(returnJson = false) {
        return this.configGetUserStateByFunction(Enums_1.StateChangedTrigger.QuickSearch, returnJson);
    }
    configGetCellSummaryState(returnJson = false) {
        return this.configGetUserStateByFunction(Enums_1.StateChangedTrigger.CellSummary, returnJson);
    }
    configGetShortcutState(returnJson = false) {
        return this.configGetUserStateByFunction(Enums_1.StateChangedTrigger.Shortcut, returnJson);
    }
    configGetSmartEditState(returnJson = false) {
        return this.configGetUserStateByFunction(Enums_1.StateChangedTrigger.SmartEdit, returnJson);
    }
    configGetThemeState(returnJson = false) {
        return this.configGetUserStateByFunction(Enums_1.StateChangedTrigger.Theme, returnJson);
    }
    configGetUserFilterState(returnJson = false) {
        return this.configGetUserStateByFunction(Enums_1.StateChangedTrigger.UserFilter, returnJson);
    }
}
exports.ConfigApi = ConfigApi;
