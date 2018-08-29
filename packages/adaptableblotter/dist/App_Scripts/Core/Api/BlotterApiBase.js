"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LayoutRedux = require("../../Redux/ActionsReducers/LayoutRedux");
const QuickSearchRedux = require("../../Redux/ActionsReducers/QuickSearchRedux");
const DataSourceRedux = require("../../Redux/ActionsReducers/DataSourceRedux");
const AdvancedSearchRedux = require("../../Redux/ActionsReducers/AdvancedSearchRedux");
const EntitlementsRedux = require("../../Redux/ActionsReducers/EntitlementsRedux");
const UserInterfaceRedux = require("../../Redux/ActionsReducers/UserInterfaceRedux");
const DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
const SmartEditRedux = require("../../Redux/ActionsReducers/SmartEditRedux");
const ShortcutRedux = require("../../Redux/ActionsReducers/ShortcutRedux");
const CellValidationRedux = require("../../Redux/ActionsReducers/CellValidationRedux");
const CalculatedColumnRedux = require("../../Redux/ActionsReducers/CalculatedColumnRedux");
const CalendarRedux = require("../../Redux/ActionsReducers/CalendarRedux");
const ThemeRedux = require("../../Redux/ActionsReducers/ThemeRedux");
const CustomSortRedux = require("../../Redux/ActionsReducers/CustomSortRedux");
const FilterRedux = require("../../Redux/ActionsReducers/FilterRedux");
const GridRedux = require("../../Redux/ActionsReducers/GridRedux");
const AlertRedux = require("../../Redux/ActionsReducers/AlertRedux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const ExportRedux = require("../../Redux/ActionsReducers/ExportRedux");
const FormatColumnRedux = require("../../Redux/ActionsReducers/FormatColumnRedux");
const GeneralConstants_1 = require("../Constants/GeneralConstants");
const StrategyNames = require("../Constants/StrategyNames");
const Enums_1 = require("../Enums");
const AdaptableBlotterStore_1 = require("../../Redux/Store/AdaptableBlotterStore");
const AdaptableBlotterLogger_1 = require("../Helpers/AdaptableBlotterLogger");
const FilterHelper_1 = require("../Helpers/FilterHelper");
class BlotterApiBase {
    constructor(blotter) {
        this.blotter = blotter;
    }
    setGridData(dataSource) {
        // no implementation as done in the base class
    }
    // Layout api methods
    layoutSet(layoutName) {
        let layout = this.blotter.AdaptableBlotterStore.TheStore.getState().Layout.Layouts.find(l => l.Name == layoutName);
        if (this.checkItemExists(layout, layoutName, StrategyNames.LayoutStrategyName)) {
            this.dispatchAction(LayoutRedux.LayoutSelect(layoutName));
        }
    }
    layoutClear() {
        this.dispatchAction(LayoutRedux.LayoutSelect(GeneralConstants_1.DEFAULT_LAYOUT));
    }
    layoutGetCurrent() {
        let layoutName = this.blotter.AdaptableBlotterStore.TheStore.getState().Layout.CurrentLayout;
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Layout.Layouts.find(l => l.Name == layoutName);
    }
    // Dashboard api methods
    dashboardSetAvailableToolbars(availableToolbars) {
        this.dispatchAction(DashboardRedux.DashboardSetAvailableToolbars(availableToolbars));
    }
    dashboardSetVisibleToolbars(visibleToolbars) {
        visibleToolbars.forEach(vt => {
            this.dashboardShowToolbar(vt);
        });
    }
    dashboardShowToolbar(visibleToolbar) {
        this.dispatchAction(DashboardRedux.DashboardShowToolbar(visibleToolbar));
    }
    dashboardHideToolbar(visibleToolbar) {
        this.dispatchAction(DashboardRedux.DashboardHideToolbar(visibleToolbar));
    }
    dashboardSetVisibleButtons(functionButtons) {
        this.dispatchAction(DashboardRedux.DashboardSetFunctionButtons(functionButtons));
    }
    dashboardSetZoom(zoom) {
        this.dispatchAction(DashboardRedux.DashboardSetZoom(zoom));
    }
    dashboardSetVisibility(dashboardVisibility) {
        this.dispatchAction(DashboardRedux.DashboardSetVisibility(dashboardVisibility));
    }
    dashboardShow() {
        this.dashboardSetVisibility(Enums_1.Visibility.Visible);
    }
    dashboardHide() {
        this.dashboardSetVisibility(Enums_1.Visibility.Hidden);
    }
    dashboardMinimise() {
        this.dashboardSetVisibility(Enums_1.Visibility.Minimised);
    }
    // Quick Search api methods
    quickSearchRun(quickSearchText) {
        this.dispatchAction(QuickSearchRedux.QuickSearchApply(quickSearchText));
    }
    quickSearchClear() {
        this.dispatchAction(QuickSearchRedux.QuickSearchApply(""));
    }
    quickSearchGetValue() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchText;
    }
    quickSearchSetOperator(operator) {
        this.dispatchAction(QuickSearchRedux.QuickSearchSetOperator(operator));
    }
    quickSearchSetDisplayAction(displayAction) {
        this.dispatchAction(QuickSearchRedux.QuickSearchSetDisplay(displayAction));
    }
    quickSearchSetStyle(style) {
        this.dispatchAction(QuickSearchRedux.QuickSearchSetStyle(style));
    }
    // Calendar State
    calendarSetCurrent(calendar) {
        this.dispatchAction(CalendarRedux.CalendarSelect(calendar));
    }
    calendarGetCurrent() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Calendar.CurrentCalendar;
    }
    // Theme State
    themeSetCurrent(theme) {
        this.dispatchAction(ThemeRedux.ThemeSelect(theme));
    }
    themeGetCurrent() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Theme.CurrentTheme;
    }
    themeSetSystemThemes(systemThemes) {
        this.dispatchAction(ThemeRedux.ThemeSetSystemThemes(systemThemes));
    }
    themeSetUserThemes(userThemes) {
        this.dispatchAction(ThemeRedux.ThemeSetUserThemes(userThemes));
    }
    themeSystemThemeGetAll() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Theme.SystemThemes;
    }
    themeUserThemeGetAll() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Theme.UserThemes;
    }
    // Shortuct State
    shortcutGetAll() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Shortcut.Shortcuts;
    }
    shortcutAdd(shortcut) {
        this.dispatchAction(ShortcutRedux.ShortcutAdd(shortcut));
    }
    shortcutDelete(shortcut) {
        this.dispatchAction(ShortcutRedux.ShortcutDelete(shortcut));
    }
    shortcutDeleteAll() {
        this.shortcutGetAll().forEach(s => {
            this.shortcutDelete(s);
        });
    }
    // SmartEdit api methods
    smartEditSetMathOperation(mathOperation) {
        this.dispatchAction(SmartEditRedux.SmartEditChangeOperation(mathOperation));
    }
    smartEditGetMathOperation() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().SmartEdit.MathOperation;
    }
    smartEditSetValue(smartEditValue) {
        this.dispatchAction(SmartEditRedux.SmartEditChangeValue(smartEditValue));
    }
    smartEditGetValue() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().SmartEdit.SmartEditValue;
    }
    // user interface api methods
    uiSetColorPalette(colorPalette) {
        this.dispatchAction(UserInterfaceRedux.ColorPaletteSet(colorPalette));
    }
    uiAddColorsToPalette(colorPalette) {
        this.dispatchAction(UserInterfaceRedux.ColorPaletteAdd(colorPalette));
    }
    uiAddStyleClassNames(styleClassNames) {
        this.dispatchAction(UserInterfaceRedux.StyleClassNamesAdd(styleClassNames));
    }
    uiSetColumnPermittedValues(column, permittedValues) {
        let permittedColumnValues = { ColumnId: column, PermittedValues: permittedValues };
        this.dispatchAction(UserInterfaceRedux.PermittedColumnValuesSet(permittedColumnValues));
    }
    uiClearColumnPermittedValues(column) {
        this.dispatchAction(UserInterfaceRedux.PermittedColumnValuesDelete(column));
    }
    // filter api methods
    filterSetColumnFilters(columnFilters) {
        columnFilters.forEach(cf => {
            this.dispatchAction(FilterRedux.ColumnFilterAddUpdate(cf));
        });
    }
    filterSetUserFilters(userFilters) {
        userFilters.forEach(uf => {
            this.dispatchAction(FilterRedux.UserFilterAddUpdate(-1, uf));
        });
    }
    filterSetSystemFilters(systemFilters) {
        this.dispatchAction(FilterRedux.SystemFilterSet(systemFilters));
    }
    filterClearSystemFilters() {
        this.dispatchAction(FilterRedux.SystemFilterSet([]));
    }
    filterGetCurrentSystemFilters() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Filter.SystemFilters;
    }
    filterGetAllSystemFilters() {
        return FilterHelper_1.FilterHelper.GetAllSystemFilters();
    }
    // Data Source api methods
    dataSourceSet(dataSourceName) {
        let dataSource = this.blotter.AdaptableBlotterStore.TheStore.getState().DataSource.DataSources.find(a => a == dataSourceName);
        if (this.checkItemExists(dataSource, dataSourceName, StrategyNames.DataSourceStrategyName)) {
            this.dispatchAction(DataSourceRedux.DataSourceSelect(dataSource));
        }
    }
    dataSourceClear() {
        this.dispatchAction(DataSourceRedux.DataSourceSelect(""));
    }
    // Advanced Search api methods
    advancedSearchSet(advancedSearchName) {
        let advancedSearch = this.blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.AdvancedSearches.find(a => a.Name == advancedSearchName);
        if (this.checkItemExists(advancedSearch, advancedSearchName, StrategyNames.AdvancedSearchStrategyName)) {
            this.dispatchAction(AdvancedSearchRedux.AdvancedSearchSelect(advancedSearchName));
        }
    }
    advancedSearchClear() {
        this.dispatchAction(AdvancedSearchRedux.AdvancedSearchSelect(""));
    }
    advancedSearchAdd(advancedSearch) {
        this.dispatchAction(AdvancedSearchRedux.AdvancedSearchAddUpdate(-1, advancedSearch));
    }
    advancedSearchEdit(advancedSearchName, advancedSearch) {
        let searchIndex = this.blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.AdvancedSearches.findIndex(a => a.Name == advancedSearchName);
        this.dispatchAction(AdvancedSearchRedux.AdvancedSearchAddUpdate(searchIndex, advancedSearch));
    }
    advancedSearchDelete(advancedSearchName) {
        let searchToDelete = this.advancedSearchGetByName(advancedSearchName);
        this.dispatchAction(AdvancedSearchRedux.AdvancedSearchDelete(searchToDelete));
    }
    advancedSearchGetCurrent() {
        let currentAdvancedSearchName = this.blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.CurrentAdvancedSearch;
        return this.advancedSearchGetByName(currentAdvancedSearchName);
    }
    advancedSearchGetByName(advancedSearchName) {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.AdvancedSearches.find(a => a.Name == advancedSearchName);
    }
    advancedSearchGetAll() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch.AdvancedSearches;
    }
    // Entitlement Methods
    entitlementGetAll() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Entitlements.FunctionEntitlements;
    }
    entitlementGetByFunction(functionName) {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Entitlements.FunctionEntitlements.find(f => f.FunctionName == functionName);
    }
    entitlementGetAccessLevelForFunction(functionName) {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Entitlements.FunctionEntitlements.find(f => f.FunctionName == functionName).AccessLevel;
    }
    entitlementAddOrUpdate(functionName, accessLevel) {
        let entitlement = { FunctionName: functionName, AccessLevel: accessLevel };
        this.dispatchAction(EntitlementsRedux.EntitlementAddUpdate(-1, entitlement));
    }
    entitlementDelete(functionName) {
        this.dispatchAction(EntitlementsRedux.EntitlementDelete(functionName));
    }
    // Custom Sort Methods
    customSortGetAll() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().CustomSort.CustomSorts;
    }
    customSortGetByColumn(columnn) {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().CustomSort.CustomSorts.find(cs => cs.ColumnId == columnn);
    }
    customSortAdd(column, values) {
        let customSort = { ColumnId: column, SortedValues: values, IsReadOnly: false };
        this.dispatchAction(CustomSortRedux.CustomSortAdd(customSort));
    }
    customSortEdit(column, values) {
        let customSort = { ColumnId: column, SortedValues: values, IsReadOnly: false };
        this.dispatchAction(CustomSortRedux.CustomSortEdit(customSort));
    }
    customSortDelete(column) {
        let customSort = this.customSortGetByColumn(column);
        this.dispatchAction(CustomSortRedux.CustomSortDelete(customSort));
    }
    // Calculated Column State
    calculatedColumnGetAll() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().CalculatedColumn.CalculatedColumns;
    }
    calculatedColumnAdd(calculatedColumn) {
        this.dispatchAction(CalculatedColumnRedux.CalculatedColumnAdd(calculatedColumn));
    }
    calculatedColumnEditExpression(column, columnExpression) {
        let calcColumn = this.calculatedColumnGetAll().find(cc => cc.ColumnId == column);
        let calcColumnIndex = this.calculatedColumnGetAll().findIndex(cc => cc.ColumnId == column);
        calcColumn.ColumnExpression = columnExpression;
        this.dispatchAction(CalculatedColumnRedux.CalculatedColumnEdit(calcColumnIndex, calcColumn));
    }
    calculatedColumnDelete(column) {
        let calcColumnIndex = this.calculatedColumnGetAll().findIndex(cc => cc.ColumnId == column);
        this.dispatchAction(CalculatedColumnRedux.CalculatedColumnDelete(calcColumnIndex));
    }
    // CellValidation State
    cellValidationGetAll() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().CellValidation.CellValidations;
    }
    cellValidationAdd(cellValidationRule) {
        this.dispatchAction(CellValidationRedux.CellValidationAddUpdate(-1, cellValidationRule));
    }
    cellValidationDelete(cellValidationRule) {
        let index = this.cellValidationGetAll().findIndex(cv => cv == cellValidationRule);
        this.dispatchAction(CellValidationRedux.CellValidationDelete(index));
    }
    // Format Column api methods
    formatColumnGetAll() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().FormatColumn.FormatColumns;
    }
    formatColumnnAdd(column, style) {
        let formatColumn = { ColumnId: column, Style: style, IsReadOnly: false };
        this.dispatchAction(FormatColumnRedux.FormatColumnAdd(formatColumn));
    }
    formatColumnnUpdate(column, style) {
        let formatColumn = { ColumnId: column, Style: style, IsReadOnly: false };
        this.dispatchAction(FormatColumnRedux.FormatColumnEdit(formatColumn));
    }
    formatColumnDelete(formatColumn) {
        this.dispatchAction(FormatColumnRedux.FormatColumnDelete(formatColumn));
    }
    formatColumnDeleteAll() {
        this.formatColumnGetAll().forEach(fc => {
            this.formatColumnDelete(fc);
        });
    }
    // General Config
    configClear() {
        this.dispatchAction(AdaptableBlotterStore_1.ResetUserData());
    }
    configGet() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState();
    }
    // System Status api Methods
    systemStatusSet(statusMessage, statusColour) {
        let systemStatus = { StatusMessage: statusMessage, StatusColour: statusColour };
        this.dispatchAction(GridRedux.GridSetSystemStatus(systemStatus));
    }
    systemStatusSetRed(statusMessage) {
        let systemStatus = { StatusMessage: statusMessage, StatusColour: Enums_1.StatusColour.Red };
        this.dispatchAction(GridRedux.GridSetSystemStatus(systemStatus));
    }
    systemStatusSetAmber(statusMessage) {
        let systemStatus = { StatusMessage: statusMessage, StatusColour: Enums_1.StatusColour.Amber };
        this.dispatchAction(GridRedux.GridSetSystemStatus(systemStatus));
    }
    systemStatusSetGreen(statusMessage) {
        let systemStatus = { StatusMessage: statusMessage, StatusColour: Enums_1.StatusColour.Green };
        this.dispatchAction(GridRedux.GridSetSystemStatus(systemStatus));
    }
    systemStatusClear() {
        this.dispatchAction(GridRedux.GridClearSystemStatus());
    }
    // Alerts api Methods
    alertShow(alertHeader, alertMessage, MessageType, showAsPopup) {
        let MessageTypeEnum = MessageType;
        let alert = {
            Header: alertHeader,
            Msg: alertMessage,
            MessageType: MessageTypeEnum
        };
        this.dispatchAction(AlertRedux.AlertAdd(alert));
        if (showAsPopup) {
            this.dispatchAction(PopupRedux.PopupShowAlert(alert));
        }
        AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogAlert(alertHeader + ": " + alertMessage, MessageTypeEnum);
    }
    alertShowMessage(alertHeader, alertMessage, showAsPopup) {
        this.alertShow(alertHeader, alertMessage, Enums_1.MessageType.Info, showAsPopup);
    }
    alertShowWarning(alertHeader, alertMessage, showAsPopup) {
        this.alertShow(alertHeader, alertMessage, Enums_1.MessageType.Warning, showAsPopup);
    }
    alertShowError(alertHeader, alertMessage, showAsPopup) {
        this.alertShow(alertHeader, alertMessage, Enums_1.MessageType.Error, showAsPopup);
    }
    // Export api Methods
    exportSendReport(reportName, destination) {
        let report = this.exportReportsGetAll().find(r => r.Name == reportName);
        if (this.checkItemExists(report, reportName, "Report")) {
            this.dispatchAction(ExportRedux.ExportApply(reportName, destination));
        }
    }
    exportReportsGetAll() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Export.Reports;
    }
    exportLiveReportsGetAll() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Export.CurrentLiveReports;
    }
    // Events
    onSearchedChanged() {
        return this.blotter.SearchedChanged;
    }
    // Helper Methods
    dispatchAction(action) {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(action);
    }
    checkItemExists(item, name, type) {
        if (!item) {
            AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogError("No " + type + " found with the name: " + name);
            return false;
        }
        return true;
    }
}
exports.BlotterApiBase = BlotterApiBase;
