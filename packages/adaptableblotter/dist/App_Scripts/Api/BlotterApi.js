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
        this.AdvancedSearchApi = new AdvancedSearchApi_1.AdvancedSearchApi(blotter);
        this.AlertApi = new AlertApi_1.AlertApi(blotter);
        this.CalendarApi = new CalendarApi_1.CalendarApi(blotter);
        this.CalculatedColumnApi = new CalculatedColumnApi_1.CalculatedColumnApi(blotter);
        this.CellValidationApi = new CellValidationApi_1.CellValidationApi(blotter);
        this.ColumnCategoryApi = new ColumnCategoryApi_1.ColumnCategoryApi(blotter);
        this.ColumnFilterApi = new ColumnFilterApi_1.ColumnFilterApi(blotter);
        this.ConfigApi = new ConfigApi_1.ConfigApi(blotter);
        this.CustomSortApi = new CustomSortApi_1.CustomSortApi(blotter);
        this.DashboardApi = new DashboardApi_1.DashboardApi(blotter);
        this.DataSourceApi = new DataSource_1.DataSourceApi(blotter);
        this.EntitlementApi = new EntitlementApi_1.EntitlementApi(blotter);
        this.ExportApi = new ExportApi_1.ExportApi(blotter);
        this.FormatColumnApi = new FormatColumnApi_1.FormatColumnApi(blotter);
        this.FreeTextColumnApi = new FreeTextColumn_1.FreeTextColumnApi(blotter);
        this.GridApi = new GridApi_1.GridApi(blotter);
        this.LayoutApi = new LayoutApi_1.LayoutApi(blotter);
        this.PercentBarApi = new PercentBarApi_1.PercentBarApi(blotter);
        this.QuickSearchApi = new QuickSearchApi_1.QuickSearchApi(blotter);
        this.ShortcutApi = new ShortcutApi_1.ShortcutApi(blotter);
        this.SmartEditApi = new SmartEditApi_1.SmartEditApi(blotter);
        this.SystemFilterApi = new SystemFilterApi_1.SystemFilterApi(blotter);
        this.SystemStatusApi = new SystemStatusApi_1.SystemStatusApi(blotter);
        this.ThemeApi = new ThemeApi_1.ThemeApi(blotter);
        this.UserInterfaceApi = new UserInterfaceApi_1.UserInterfaceApi(blotter);
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
