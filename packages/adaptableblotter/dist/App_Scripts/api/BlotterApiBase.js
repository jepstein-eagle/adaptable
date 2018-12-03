"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LayoutRedux = require("../Redux/ActionsReducers/LayoutRedux");
const QuickSearchRedux = require("../Redux/ActionsReducers/QuickSearchRedux");
const DataSourceRedux = require("../Redux/ActionsReducers/DataSourceRedux");
const AdvancedSearchRedux = require("../Redux/ActionsReducers/AdvancedSearchRedux");
const ColumnCategoryRedux = require("../Redux/ActionsReducers/ColumnCategoryRedux");
const FreeTextColumnRedux = require("../Redux/ActionsReducers/FreeTextColumnRedux");
const PercentBarRedux = require("../Redux/ActionsReducers/PercentBarRedux");
const EntitlementsRedux = require("../Redux/ActionsReducers/EntitlementsRedux");
const UserInterfaceRedux = require("../Redux/ActionsReducers/UserInterfaceRedux");
const DashboardRedux = require("../Redux/ActionsReducers/DashboardRedux");
const SmartEditRedux = require("../Redux/ActionsReducers/SmartEditRedux");
const ShortcutRedux = require("../Redux/ActionsReducers/ShortcutRedux");
const CellValidationRedux = require("../Redux/ActionsReducers/CellValidationRedux");
const CalculatedColumnRedux = require("../Redux/ActionsReducers/CalculatedColumnRedux");
const CalendarRedux = require("../Redux/ActionsReducers/CalendarRedux");
const ThemeRedux = require("../Redux/ActionsReducers/ThemeRedux");
const CustomSortRedux = require("../Redux/ActionsReducers/CustomSortRedux");
const ColumnFilterRedux = require("../Redux/ActionsReducers/ColumnFilterRedux");
const UserFilterRedux = require("../Redux/ActionsReducers/UserFilterRedux");
const SystemFilterRedux = require("../Redux/ActionsReducers/SystemFilterRedux");
const SystemRedux = require("../Redux/ActionsReducers/SystemRedux");
const PopupRedux = require("../Redux/ActionsReducers/PopupRedux");
const ExportRedux = require("../Redux/ActionsReducers/ExportRedux");
const FormatColumnRedux = require("../Redux/ActionsReducers/FormatColumnRedux");
const GeneralConstants_1 = require("../Utilities/Constants/GeneralConstants");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const Enums_1 = require("../Utilities/Enums");
const AdaptableBlotterStore_1 = require("../Redux/Store/AdaptableBlotterStore");
const ObjectFactory_1 = require("../Utilities/ObjectFactory");
const FilterHelper_1 = require("../Utilities/Helpers/FilterHelper");
const StringExtensions_1 = require("../Utilities/Extensions/StringExtensions");
const LoggingHelper_1 = require("../Utilities/Helpers/LoggingHelper");
class BlotterApiBase {
    constructor(blotter) {
        this.blotter = blotter;
    }
    setGridData(dataSource) {
        // no implementation as done in the base class
    }
    // Layout api methods
    layoutSet(layoutName) {
        let layout = this.getState().Layout.Layouts.find(l => l.Name == layoutName);
        if (this.checkItemExists(layout, layoutName, StrategyConstants.LayoutStrategyName)) {
            this.dispatchAction(LayoutRedux.LayoutSelect(layoutName));
        }
    }
    layoutClear() {
        this.dispatchAction(LayoutRedux.LayoutSelect(GeneralConstants_1.DEFAULT_LAYOUT));
    }
    layoutGetCurrent() {
        let layoutName = this.getState().Layout.CurrentLayout;
        return this.getState().Layout.Layouts.find(l => l.Name == layoutName);
    }
    layoutgetAll() {
        return this.getState().Layout.Layouts;
    }
    layoutSave() {
        let currentLayoutName = this.getState().Layout.CurrentLayout;
        if (currentLayoutName != GeneralConstants_1.DEFAULT_LAYOUT) {
            let currentLayoutObject = this.getState().Layout.Layouts.find(l => l.Name == currentLayoutName);
            let currentLayoutIndex = this.getState().Layout.Layouts.findIndex(l => l.Name == currentLayoutName);
            if (currentLayoutIndex != -1) {
                let gridState = (currentLayoutObject) ? currentLayoutObject.VendorGridInfo : null;
                let visibleColumns = this.getState().Grid.Columns.filter(c => c.Visible);
                let gridSorts = this.getState().Grid.GridSorts;
                let layoutToSave = ObjectFactory_1.ObjectFactory.CreateLayout(visibleColumns, gridSorts, gridState, currentLayoutName);
                this.dispatchAction(LayoutRedux.LayoutPreSave(currentLayoutIndex, layoutToSave));
            }
        }
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
    dashboardShowSystemStatusButton() {
        this.dispatchAction(DashboardRedux.DashboardShowSystemStatusButton());
    }
    dashboardHideSystemStatusButton() {
        this.dispatchAction(DashboardRedux.DashboardHideSystemStatusButton());
    }
    dashboardShowAboutButton() {
        this.dispatchAction(DashboardRedux.DashboardShowAboutButton());
    }
    dashboardHideAboutButton() {
        this.dispatchAction(DashboardRedux.DashboardHideAboutButton());
    }
    dashboardShowFunctionsDropdown() {
        this.dispatchAction(DashboardRedux.DashboardShowFunctionsDropdown());
    }
    dashboardHideFunctionsDropdown() {
        this.dispatchAction(DashboardRedux.DashboardHideFunctionsDropdown());
    }
    dashboardShowColumnsDropdown() {
        this.dispatchAction(DashboardRedux.DashboardShowColumnsDropdown());
    }
    dashboardHideColumnsDropdown() {
        this.dispatchAction(DashboardRedux.DashboardHideColumnsDropdown());
    }
    dashboardSetHomeToolbarTitle(title) {
        this.dispatchAction(DashboardRedux.DashboardSetHomeToolbarTitle(title));
    }
    dashboardSetApplicationToolbarTitle(title) {
        this.dispatchAction(DashboardRedux.DashboardSetApplicationToolbarTitle(title));
    }
    // Quick Search api methods
    quickSearchRun(quickSearchText) {
        this.dispatchAction(QuickSearchRedux.QuickSearchApply(quickSearchText));
    }
    quickSearchClear() {
        this.dispatchAction(QuickSearchRedux.QuickSearchApply(""));
    }
    quickSearchGetValue() {
        return this.getState().QuickSearch.QuickSearchText;
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
        return this.getState().Calendar.CurrentCalendar;
    }
    // Theme State
    themeSetCurrent(theme) {
        this.dispatchAction(ThemeRedux.ThemeSelect(theme));
    }
    themeGetCurrent() {
        return this.getState().Theme.CurrentTheme;
    }
    themeSetSystemThemes(systemThemes) {
        this.dispatchAction(ThemeRedux.ThemeSetSystemThemes(systemThemes));
    }
    themeSetUserThemes(userThemes) {
        this.dispatchAction(ThemeRedux.ThemeSetUserThemes(userThemes));
    }
    themeSystemThemeGetAll() {
        return this.getState().Theme.SystemThemes;
    }
    themeUserThemeGetAll() {
        return this.getState().Theme.UserThemes;
    }
    // Shortuct State
    shortcutGetAll() {
        return this.getState().Shortcut.Shortcuts;
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
        return this.getState().SmartEdit.MathOperation;
    }
    smartEditSetValue(smartEditValue) {
        this.dispatchAction(SmartEditRedux.SmartEditChangeValue(smartEditValue));
    }
    smartEditGetValue() {
        return this.getState().SmartEdit.SmartEditValue;
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
    columnFilterSet(columnFilters) {
        columnFilters.forEach(cf => {
            this.dispatchAction(ColumnFilterRedux.ColumnFilterAddUpdate(cf));
        });
    }
    columnFilterSetUserFilter(userFilter) {
        let existingUserFilter = this.getState().UserFilter.UserFilters.find(uf => uf.Name == userFilter);
        if (this.checkItemExists(existingUserFilter, userFilter, "User Filter")) {
            let columnFilter = ObjectFactory_1.ObjectFactory.CreateColumnFilterFromUserFilter(existingUserFilter);
            this.dispatchAction(ColumnFilterRedux.ColumnFilterAddUpdate(columnFilter));
        }
    }
    columnFilterClear(columnFilter) {
        this.dispatchAction(ColumnFilterRedux.ColumnFilterClear(columnFilter.ColumnId));
    }
    columnFilterClearByColumns(columns) {
        columns.forEach(c => {
            this.columnFilterClearByColumn(c);
        });
    }
    columnFilterClearByColumn(column) {
        this.dispatchAction(ColumnFilterRedux.ColumnFilterClear(column));
    }
    columnFilterClearAll() {
        this.dispatchAction(ColumnFilterRedux.ColumnFilterClearAll());
    }
    columnFiltersGetCurrent() {
        return this.getState().ColumnFilter.ColumnFilters;
    }
    userFilterSet(userFilters) {
        userFilters.forEach(uf => {
            this.dispatchAction(UserFilterRedux.UserFilterAddUpdate(-1, uf));
        });
    }
    systemFilterSet(systemFilters) {
        this.dispatchAction(SystemFilterRedux.SystemFilterSet(systemFilters));
    }
    systemFilterClear() {
        this.dispatchAction(SystemFilterRedux.SystemFilterSet([]));
    }
    systemFilterGetCurrent() {
        return this.getState().SystemFilter.SystemFilters;
    }
    systemFilterGetAll() {
        return FilterHelper_1.FilterHelper.GetAllSystemFilters();
    }
    // Data Source api methods
    dataSourceSet(dataSourceName) {
        let dataSource = this.getState().DataSource.DataSources.find(a => a == dataSourceName);
        if (this.checkItemExists(dataSource, dataSourceName, StrategyConstants.DataSourceStrategyName)) {
            this.dispatchAction(DataSourceRedux.DataSourceSelect(dataSource));
        }
    }
    dataSourceClear() {
        this.dispatchAction(DataSourceRedux.DataSourceSelect(""));
    }
    // Advanced Search api methods
    advancedSearchSet(advancedSearchName) {
        let advancedSearch = this.getState().AdvancedSearch.AdvancedSearches.find(a => a.Name == advancedSearchName);
        if (this.checkItemExists(advancedSearch, advancedSearchName, StrategyConstants.AdvancedSearchStrategyName)) {
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
        let searchIndex = this.getState().AdvancedSearch.AdvancedSearches.findIndex(a => a.Name == advancedSearchName);
        this.dispatchAction(AdvancedSearchRedux.AdvancedSearchAddUpdate(searchIndex, advancedSearch));
    }
    advancedSearchDelete(advancedSearchName) {
        let searchToDelete = this.advancedSearchGetByName(advancedSearchName);
        this.dispatchAction(AdvancedSearchRedux.AdvancedSearchDelete(searchToDelete));
    }
    advancedSearchGetCurrent() {
        let currentAdvancedSearchName = this.getState().AdvancedSearch.CurrentAdvancedSearch;
        return this.advancedSearchGetByName(currentAdvancedSearchName);
    }
    advancedSearchGetByName(advancedSearchName) {
        return this.getState().AdvancedSearch.AdvancedSearches.find(a => a.Name == advancedSearchName);
    }
    advancedSearchGetAll() {
        return this.getState().AdvancedSearch.AdvancedSearches;
    }
    // Entitlement Methods
    entitlementGetAll() {
        return this.getState().Entitlements.FunctionEntitlements;
    }
    entitlementGetByFunction(functionName) {
        return this.getState().Entitlements.FunctionEntitlements.find(f => f.FunctionName == functionName);
    }
    entitlementGetAccessLevelForFunction(functionName) {
        return this.getState().Entitlements.FunctionEntitlements.find(f => f.FunctionName == functionName).AccessLevel;
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
        return this.getState().CustomSort.CustomSorts;
    }
    customSortGetByColumn(columnn) {
        return this.getState().CustomSort.CustomSorts.find(cs => cs.ColumnId == columnn);
    }
    customSortAdd(column, values) {
        let customSort = { ColumnId: column, SortedValues: values };
        this.dispatchAction(CustomSortRedux.CustomSortAdd(customSort));
    }
    customSortEdit(column, values) {
        let customSort = { ColumnId: column, SortedValues: values };
        this.dispatchAction(CustomSortRedux.CustomSortEdit(customSort));
    }
    customSortDelete(column) {
        let customSort = this.customSortGetByColumn(column);
        this.dispatchAction(CustomSortRedux.CustomSortDelete(customSort));
    }
    // Calculated Column State
    calculatedColumnGetAll() {
        return this.getState().CalculatedColumn.CalculatedColumns;
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
        return this.getState().CellValidation.CellValidations;
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
        return this.getState().FormatColumn.FormatColumns;
    }
    formatColumnnAdd(column, style) {
        let formatColumn = { ColumnId: column, Style: style };
        this.dispatchAction(FormatColumnRedux.FormatColumnAdd(formatColumn));
    }
    formatColumnnUpdate(column, style) {
        let formatColumn = { ColumnId: column, Style: style };
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
    // System Status api Methods
    systemStatusSet(statusMessage, statusColour) {
        let systemStatus = { StatusMessage: statusMessage, StatusColour: statusColour };
        this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus));
    }
    systemStatusSetRed(statusMessage) {
        let systemStatus = { StatusMessage: statusMessage, StatusColour: Enums_1.StatusColour.Red };
        this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus));
    }
    systemStatusSetAmber(statusMessage) {
        let systemStatus = { StatusMessage: statusMessage, StatusColour: Enums_1.StatusColour.Amber };
        this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus));
    }
    systemStatusSetGreen(statusMessage) {
        let systemStatus = { StatusMessage: statusMessage, StatusColour: Enums_1.StatusColour.Green };
        this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus));
    }
    systemStatusClear() {
        this.dispatchAction(SystemRedux.SystemClearHealthStatus());
    }
    // Alerts api Methods
    alertShow(alertHeader, alertMessage, MessageType, showAsPopup) {
        let maxAlerts = this.getState().Alert.MaxAlertsInStore;
        let MessageTypeEnum = MessageType;
        let alertToShow = {
            Header: alertHeader,
            Msg: alertMessage,
            MessageType: MessageTypeEnum
        };
        this.dispatchAction(SystemRedux.SystemAlertAdd(alertToShow, maxAlerts));
        if (showAsPopup) {
            if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.getState().Alert.AlertPopupDiv)) {
                let alertString = alertToShow.Header + ": " + alertToShow.Msg;
                let alertDiv = document.getElementById(this.getState().Alert.AlertPopupDiv);
                if (alertDiv) {
                    alertDiv.innerHTML = alertString;
                }
            }
            else {
                this.dispatchAction(PopupRedux.PopupShowAlert(alertToShow));
            }
        }
        LoggingHelper_1.LoggingHelper.LogAlert(alertHeader + ": " + alertMessage, MessageTypeEnum);
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
        return this.getState().Export.Reports;
    }
    exportLiveReportsGetAll() {
        return this.getState().System.CurrentLiveReports;
    }
    // column category api methods
    columnCategoryGetAll() {
        return this.getState().ColumnCategory.ColumnCategories;
    }
    columnCategoryAdd(columnCategory) {
        this.dispatchAction(ColumnCategoryRedux.ColumnCategoryAdd(columnCategory));
    }
    columnCategoryCreate(columnCategoryId, columns) {
        let columnCategory = {
            ColumnCategoryId: columnCategoryId,
            ColumnIds: columns
        };
        this.columnCategoryAdd(columnCategory);
    }
    columnCategoryEdit(previousColumnCategoryId, columnCategory) {
        let index = this.columnCategoryGetAll().findIndex(cc => cc.ColumnCategoryId == previousColumnCategoryId);
        this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(index, columnCategory));
    }
    columnCategoryAddColumns(columnCategoryId, columns) {
        let columnCategory = this.columnCategoryGetAll().find(cc => cc.ColumnCategoryId == columnCategoryId);
        let index = this.columnCategoryGetAll().findIndex(cc => cc.ColumnCategoryId == columnCategoryId);
        columns.forEach(c => {
            columnCategory.ColumnIds.push(c);
        });
        this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(index, columnCategory));
    }
    columnCategoryRemoveColumns(columnCategoryId, columns) {
        let columnCategory = this.columnCategoryGetAll().find(cc => cc.ColumnCategoryId == columnCategoryId);
        let index = this.columnCategoryGetAll().findIndex(cc => cc.ColumnCategoryId == columnCategoryId);
        columns.forEach(c => {
            let ccIndex = columnCategory.ColumnIds.findIndex(cc => cc == c);
            columnCategory.ColumnIds.splice(ccIndex, 1);
        });
        this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(index, columnCategory));
    }
    columnCategoryDelete(columnCategoryId) {
        let columnCategory = this.columnCategoryGetAll().find(cc => cc.ColumnCategoryId == columnCategoryId);
        this.dispatchAction(ColumnCategoryRedux.ColumnCategoryDelete(columnCategory));
    }
    // Free Text Column api methods
    freeTextColumnGetAll() {
        return this.getState().FreeTextColumn.FreeTextColumns;
    }
    freeTextColumnAdd(freeTextColumn) {
        this.dispatchAction(FreeTextColumnRedux.FreeTextColumnAdd(freeTextColumn));
    }
    freeTextColumnCreate(columnId, defaultValue = null) {
        let freeTextColumn = {
            ColumnId: columnId,
            DefaultValue: defaultValue,
            FreeTextStoredValues: []
        };
        this.freeTextColumnAdd(freeTextColumn);
    }
    freeTextColumnDelete(columnId) {
        let freeTextColumn = this.freeTextColumnGetAll().find(ftc => ftc.ColumnId == columnId);
        this.dispatchAction(FreeTextColumnRedux.FreeTextColumnDelete(freeTextColumn));
    }
    // Percent Bars api methods
    percentBarGetAll() {
        return this.getState().PercentBar.PercentBars;
    }
    percentBarGetByColumn(columnId) {
        let percentBar = this.getState().PercentBar.PercentBars.find(pcb => pcb.ColumnId == columnId);
        return percentBar;
    }
    percentBarAdd(percentBar) {
        this.dispatchAction(PercentBarRedux.PercentBarAdd(percentBar));
    }
    percentBarCreate(columnId, minValue, maxValue, positiveColor, negativeColor, showValue) {
        let percentBar = {
            ColumnId: columnId,
            MinValue: minValue,
            MaxValue: maxValue,
            PositiveColor: positiveColor,
            NegativeColor: negativeColor,
            ShowValue: showValue
        };
        this.percentBarAdd(percentBar);
    }
    percentBarEditByIndex(index, percentBar) {
        this.dispatchAction(PercentBarRedux.PercentBarEdit(index, percentBar));
    }
    percentBarEdit(percentBar) {
        let index = this.percentBarGetAll().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
        this.percentBarEditByIndex(index, percentBar);
    }
    percentBarEditMinValue(minValue, columnId) {
        let percentBar = this.percentBarGetByColumn(columnId);
        percentBar.MinValue = minValue;
        let index = this.percentBarGetAll().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
        this.percentBarEditByIndex(index, percentBar);
    }
    percentBarEditMaxValue(maxValue, columnId) {
        let percentBar = this.percentBarGetByColumn(columnId);
        percentBar.MaxValue = maxValue;
        let index = this.percentBarGetAll().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
        this.percentBarEditByIndex(index, percentBar);
    }
    percentBarEditPositiveColor(positiveColor, columnId) {
        let percentBar = this.percentBarGetByColumn(columnId);
        percentBar.PositiveColor = positiveColor;
        let index = this.percentBarGetAll().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
        this.percentBarEditByIndex(index, percentBar);
    }
    percentBarEditNegativeColor(negativeColor, columnId) {
        let percentBar = this.percentBarGetByColumn(columnId);
        percentBar.NegativeColor = negativeColor;
        let index = this.percentBarGetAll().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
        this.percentBarEditByIndex(index, percentBar);
    }
    percentBarEditShowValue(showValue, columnId) {
        let percentBar = this.percentBarGetByColumn(columnId);
        percentBar.ShowValue = showValue;
        let index = this.percentBarGetAll().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
        this.percentBarEditByIndex(index, percentBar);
    }
    percentBarDelete(columnId) {
        let index = this.percentBarGetAll().findIndex(pcb => pcb.ColumnId == columnId);
        this.dispatchAction(PercentBarRedux.PercentBarDelete(index));
    }
    // General Config
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
    loadUserState(state) {
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
            case Enums_1.StateChangedTrigger.SelectedCells:
                return (returnJson) ? JSON.stringify(this.getState().SelectedCells) : this.getState().SelectedCells;
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
    configGetSelectedCellsState(returnJson = false) {
        return this.configGetUserStateByFunction(Enums_1.StateChangedTrigger.SelectedCells, returnJson);
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
    // Events
    onSearchedChanged() {
        return this.blotter.SearchedChanged;
    }
    onStateChanged() {
        return this.blotter.StateChanged;
    }
    onColumnStateChanged() {
        return this.blotter.ColumnStateChanged;
    }
    // Helper Methods
    dispatchAction(action) {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(action);
    }
    checkItemExists(item, name, type) {
        if (!item) {
            LoggingHelper_1.LoggingHelper.LogError("No " + type + " found with the name: " + name);
            return false;
        }
        return true;
    }
    getState() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState();
    }
}
exports.BlotterApiBase = BlotterApiBase;
