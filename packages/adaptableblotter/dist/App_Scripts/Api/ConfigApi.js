"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableBlotterStore_1 = require("../Redux/Store/AdaptableBlotterStore");
const Enums_1 = require("../Utilities/Enums");
const ApiBase_1 = require("./ApiBase");
class ConfigApi extends ApiBase_1.ApiBase {
    configInit() {
        this.dispatchAction(AdaptableBlotterStore_1.InitState());
    }
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
        return this.getBlotterState();
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
                return (returnJson) ? JSON.stringify(this.getBlotterState().AdvancedSearch) : this.getBlotterState().AdvancedSearch;
            case Enums_1.StateChangedTrigger.Alert:
                return (returnJson) ? JSON.stringify(this.getBlotterState().Alert) : this.getBlotterState().Alert;
            case Enums_1.StateChangedTrigger.BulkUpdate:
                return (returnJson) ? JSON.stringify(this.getBlotterState().BulkUpdate) : this.getBlotterState().BulkUpdate;
            case Enums_1.StateChangedTrigger.CalculatedColumn:
                return (returnJson) ? JSON.stringify(this.getBlotterState().CalculatedColumn) : this.getBlotterState().CalculatedColumn;
            case Enums_1.StateChangedTrigger.Calendar:
                return (returnJson) ? JSON.stringify(this.getBlotterState().Calendar) : this.getBlotterState().Calendar;
            case Enums_1.StateChangedTrigger.CellValidation:
                return (returnJson) ? JSON.stringify(this.getBlotterState().CellValidation) : this.getBlotterState().CellValidation;
            case Enums_1.StateChangedTrigger.Chart:
                return (returnJson) ? JSON.stringify(this.getBlotterState().Chart) : this.getBlotterState().Chart;
            case Enums_1.StateChangedTrigger.ColumnFilter:
                return (returnJson) ? JSON.stringify(this.getBlotterState().ColumnFilter) : this.getBlotterState().ColumnFilter;
            case Enums_1.StateChangedTrigger.ConditionalStyle:
                return (returnJson) ? JSON.stringify(this.getBlotterState().ConditionalStyle) : this.getBlotterState().ConditionalStyle;
            case Enums_1.StateChangedTrigger.CustomSort:
                return (returnJson) ? JSON.stringify(this.getBlotterState().CustomSort) : this.getBlotterState().CustomSort;
            case Enums_1.StateChangedTrigger.Dashboard:
                return (returnJson) ? JSON.stringify(this.getBlotterState().Dashboard) : this.getBlotterState().Dashboard;
            case Enums_1.StateChangedTrigger.DataSource:
                return (returnJson) ? JSON.stringify(this.getBlotterState().DataSource) : this.getBlotterState().DataSource;
            case Enums_1.StateChangedTrigger.Export:
                return (returnJson) ? JSON.stringify(this.getBlotterState().Export) : this.getBlotterState().Export;
            case Enums_1.StateChangedTrigger.FlashingCell:
                return (returnJson) ? JSON.stringify(this.getBlotterState().FlashingCell) : this.getBlotterState().FlashingCell;
            case Enums_1.StateChangedTrigger.FormatColumn:
                return (returnJson) ? JSON.stringify(this.getBlotterState().FormatColumn) : this.getBlotterState().FormatColumn;
            case Enums_1.StateChangedTrigger.Layout:
                return (returnJson) ? JSON.stringify(this.getBlotterState().Layout) : this.getBlotterState().Layout;
            case Enums_1.StateChangedTrigger.PlusMinus:
                return (returnJson) ? JSON.stringify(this.getBlotterState().PlusMinus) : this.getBlotterState().PlusMinus;
            case Enums_1.StateChangedTrigger.QuickSearch:
                return (returnJson) ? JSON.stringify(this.getBlotterState().QuickSearch) : this.getBlotterState().QuickSearch;
            case Enums_1.StateChangedTrigger.CellSummary:
                return (returnJson) ? JSON.stringify(this.getBlotterState().SelectedCells) : this.getBlotterState().CellSummary;
            case Enums_1.StateChangedTrigger.Shortcut:
                return (returnJson) ? JSON.stringify(this.getBlotterState().Shortcut) : this.getBlotterState().Shortcut;
            case Enums_1.StateChangedTrigger.SmartEdit:
                return (returnJson) ? JSON.stringify(this.getBlotterState().SmartEdit) : this.getBlotterState().SmartEdit;
            case Enums_1.StateChangedTrigger.Theme:
                return (returnJson) ? JSON.stringify(this.getBlotterState().Theme) : this.getBlotterState().Theme;
            case Enums_1.StateChangedTrigger.UserFilter:
                return (returnJson) ? JSON.stringify(this.getBlotterState().UserFilter) : this.getBlotterState().UserFilter;
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
