"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QuickSearchApi_1 = require("./QuickSearchApi");
const DashboardApi_1 = require("./DashboardApi");
const LayoutApi_1 = require("./LayoutApi");
const ShortcutApi_1 = require("./ShortcutApi");
const ThemeApi_1 = require("./ThemeApi");
const SmartEditApi_1 = require("./SmartEditApi");
const CalculatedColumnApi_1 = require("./CalculatedColumnApi");
const CellValidationApi_1 = require("./CellValidationApi");
const ColumnCategoryApi_1 = require("./ColumnCategoryApi");
const CustomSortApi_1 = require("./CustomSortApi");
const EntitlementApi_1 = require("./EntitlementApi");
const FormatColumnApi_1 = require("./FormatColumnApi");
const PercentBarApi_1 = require("./PercentBarApi");
const SystemStatusApi_1 = require("./SystemStatusApi");
const UserInterfaceApi_1 = require("./UserInterfaceApi");
const AdvancedSearchApi_1 = require("./AdvancedSearchApi");
const AlertApi_1 = require("./AlertApi");
const CalendarApi_1 = require("./CalendarApi");
const ColumnFilterApi_1 = require("./ColumnFilterApi");
const ConfigApi_1 = require("./ConfigApi");
const DataSource_1 = require("./DataSource");
const ExportApi_1 = require("./ExportApi");
const FreeTextColumn_1 = require("./FreeTextColumn");
const SystemFilterApi_1 = require("./SystemFilterApi");
const GridApi_1 = require("./GridApi");
class BlotterApi {
    constructor(blotter) {
        this.blotter = blotter;
        this.advancedSearchApi = new AdvancedSearchApi_1.AdvancedSearchApi(blotter);
        this.alertApi = new AlertApi_1.AlertApi(blotter);
        this.calendarApi = new CalendarApi_1.CalendarApi(blotter);
        this.calculatedColumnApi = new CalculatedColumnApi_1.CalculatedColumnApi(blotter);
        this.cellValidationApi = new CellValidationApi_1.CellValidationApi(blotter);
        this.columnCategoryApi = new ColumnCategoryApi_1.ColumnCategoryApi(blotter);
        this.columnFilterApi = new ColumnFilterApi_1.ColumnFilterApi(blotter);
        this.configApi = new ConfigApi_1.ConfigApi(blotter);
        this.customSortApi = new CustomSortApi_1.CustomSortApi(blotter);
        this.dashboardApi = new DashboardApi_1.DashboardApi(blotter);
        this.dataSourceApi = new DataSource_1.DataSourceApi(blotter);
        this.entitlementApi = new EntitlementApi_1.EntitlementApi(blotter);
        this.exportApi = new ExportApi_1.ExportApi(blotter);
        this.formatColumnApi = new FormatColumnApi_1.FormatColumnApi(blotter);
        this.freeTextColumnApi = new FreeTextColumn_1.FreeTextColumnApi(blotter);
        this.gridApi = new GridApi_1.GridApi(blotter);
        this.layoutApi = new LayoutApi_1.LayoutApi(blotter);
        this.percentBarApi = new PercentBarApi_1.PercentBarApi(blotter);
        this.quickSearchApi = new QuickSearchApi_1.QuickSearchApi(blotter);
        this.shortcutApi = new ShortcutApi_1.ShortcutApi(blotter);
        this.smartEditApi = new SmartEditApi_1.SmartEditApi(blotter);
        this.systemFilterApi = new SystemFilterApi_1.SystemFilterApi(blotter);
        this.systemStatusApi = new SystemStatusApi_1.SystemStatusApi(blotter);
        this.themeApi = new ThemeApi_1.ThemeApi(blotter);
        this.userInterfaceApi = new UserInterfaceApi_1.UserInterfaceApi(blotter);
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
}
exports.BlotterApi = BlotterApi;
