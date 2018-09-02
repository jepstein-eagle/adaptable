"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StrategyIds = require("./StrategyIds");
exports.AboutGlyph = "info-sign";
exports.AlertGlyph = "bullhorn";
exports.AdvancedSearchGlyph = "search";
exports.ApplicationGlyph = "font";
exports.BulkUpdateGlyph = "hand-up";
exports.CalculatedColumnGlyph = "th-list";
exports.CalendarGlyph = "calendar";
exports.CellValidationGlyph = "flag";
exports.ChartGlyph = "signal";
exports.ColumnChooserGlyph = "list-alt";
exports.ColumnFilterGlyph = "filter";
exports.ColumnInfoGlyph = "italic";
exports.ConditionalStyleGlyph = "tint";
exports.CustomSortGlyph = "sort-by-attributes";
exports.DashboardGlyph = "dashboard";
exports.DataSourceGlyph = "book";
exports.DataManagementGlyph = "folder-close";
exports.ExportGlyph = "export";
exports.FlashingCellGlyph = "flash";
exports.FormatColumnGlyph = "picture";
exports.FunctionsGlyph = "home";
exports.LayoutGlyph = "th";
exports.PlusMinusGlyph = "plus-sign";
exports.QuickSearchGlyph = "eye-open";
exports.ShortcutGlyph = "road";
exports.SelectColumnGlyph = "compressed";
exports.SelectedCellsGlyph = "th-large";
exports.SmartEditGlyph = "pencil";
exports.TeamSharingGlyph = "share";
exports.ThemeGlyph = "leaf";
exports.UserFilterGlyph = "user";
function getGhyphiconForStrategy(strategyID) {
    switch (strategyID) {
        case StrategyIds.AboutStrategyId:
            return exports.AboutGlyph;
        case StrategyIds.AdvancedSearchStrategyId:
            return exports.AdvancedSearchGlyph;
        case StrategyIds.ApplicationStrategyId:
            return exports.ApplicationGlyph;
        case StrategyIds.BulkUpdateStrategyId:
            return exports.BulkUpdateGlyph;
        case StrategyIds.CalculatedColumnStrategyId:
            return exports.CalculatedColumnGlyph;
        case StrategyIds.CalendarStrategyId:
            return exports.CalendarGlyph;
        case StrategyIds.CellValidationStrategyId:
            return exports.CellValidationGlyph;
        case StrategyIds.ChartStrategyId:
            return exports.ChartGlyph;
        case StrategyIds.ColumnChooserStrategyId:
            return exports.ColumnChooserGlyph;
        case StrategyIds.ColumnFilterStrategyId:
            return exports.ColumnFilterGlyph;
        case StrategyIds.ColumnInfoStrategyId:
            return exports.ColumnInfoGlyph;
        case StrategyIds.ConditionalStyleStrategyId:
            return exports.ConditionalStyleGlyph;
        case StrategyIds.CustomSortStrategyId:
            return exports.CustomSortGlyph;
        case StrategyIds.DataManagementStrategyId:
            return exports.DataManagementGlyph;
        case StrategyIds.ExportStrategyId:
            return exports.ExportGlyph;
        case StrategyIds.FlashingCellsStrategyId:
            return exports.FlashingCellGlyph;
        case StrategyIds.FormatColumnStrategyId:
            return exports.FormatColumnGlyph;
        case StrategyIds.LayoutStrategyId:
            return exports.LayoutGlyph;
        case StrategyIds.PlusMinusStrategyId:
            return exports.PlusMinusGlyph;
        case StrategyIds.QuickSearchStrategyId:
            return exports.QuickSearchGlyph;
        case StrategyIds.ShortcutStrategyId:
            return exports.ShortcutGlyph;
        case StrategyIds.SelectColumnStrategyId:
            return exports.SelectColumnGlyph;
        case StrategyIds.SelectedCellsStrategyId:
            return exports.SelectedCellsGlyph;
        case StrategyIds.SmartEditStrategyId:
            return exports.SmartEditGlyph;
        case StrategyIds.TeamSharingStrategyId:
            return exports.TeamSharingGlyph;
        case StrategyIds.ThemeStrategyId:
            return exports.ThemeGlyph;
        case StrategyIds.UserFilterStrategyId:
            return exports.UserFilterGlyph;
    }
}
exports.getGhyphiconForStrategy = getGhyphiconForStrategy;
