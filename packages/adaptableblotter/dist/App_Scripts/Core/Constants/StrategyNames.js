"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StrategyIds = require("./StrategyIds");
exports.AboutStrategyName = "About";
exports.AlertStrategyName = "Alert";
exports.ApplicationStrategyName = "Application";
exports.AdvancedSearchStrategyName = "Advanced Search";
exports.BulkUpdateStrategyName = "Bulk Update";
exports.CalculatedColumnStrategyName = "Calculated Column";
exports.CalendarStrategyName = "Calendar";
exports.CellValidationStrategyName = "Cell Validation";
exports.ChartStrategyName = "Chart";
exports.ColumnChooserStrategyName = "Column Chooser";
exports.ColumnFilterStrategyName = "Column Filter";
exports.ColumnInfoStrategyName = "Column Information";
exports.ConditionalStyleStrategyName = "Conditional Style";
exports.CustomSortStrategyName = "Custom Sort";
exports.DashboardStrategyName = "Dashboard";
exports.DataManagementStrategyName = "Manage State";
exports.DataSourceStrategyName = "Data Source";
exports.ExportStrategyName = "Export";
exports.FlashingCellsStrategyName = "Flashing Cells";
exports.FormatColumnStrategyName = "Format Column";
exports.LayoutStrategyName = "Layout";
exports.PlusMinusStrategyName = "Plus Minus";
exports.QuickSearchStrategyName = "Quick Search";
exports.ShortcutStrategyName = "Shortcut";
exports.SelectColumnStrategyName = "Select Column";
exports.SelectedCellsStrategyName = "Selected Cells";
exports.SmartEditStrategyName = "Smart Edit";
exports.TeamSharingStrategyName = "Team Sharing";
exports.ThemeStrategyName = "Theme";
exports.UserFilterStrategyName = "User Filter";
function getNameForStrategy(strategyID) {
    switch (strategyID) {
        case StrategyIds.AboutStrategyId:
            return exports.AboutStrategyName;
        case StrategyIds.AlertStrategyId:
            return exports.AlertStrategyName;
        case StrategyIds.ApplicationStrategyId:
            return exports.ApplicationStrategyName;
        case StrategyIds.AdvancedSearchStrategyId:
            return exports.AdvancedSearchStrategyName;
        case StrategyIds.BulkUpdateStrategyId:
            return exports.BulkUpdateStrategyName;
        case StrategyIds.CalculatedColumnStrategyId:
            return exports.CalculatedColumnStrategyName;
        case StrategyIds.CalendarStrategyId:
            return exports.CalendarStrategyName;
        case StrategyIds.CellValidationStrategyId:
            return exports.CellValidationStrategyName;
        case StrategyIds.ChartStrategyId:
            return exports.ChartStrategyName;
        case StrategyIds.ColumnChooserStrategyId:
            return exports.ColumnChooserStrategyName;
        case StrategyIds.ColumnInfoStrategyId:
            return exports.ColumnInfoStrategyName;
        case StrategyIds.ColumnFilterStrategyId:
            return exports.ColumnFilterStrategyName;
        case StrategyIds.ConditionalStyleStrategyId:
            return exports.ConditionalStyleStrategyName;
        case StrategyIds.CustomSortStrategyId:
            return exports.CustomSortStrategyName;
        case StrategyIds.DashboardStrategyId:
            return exports.DashboardStrategyName;
        case StrategyIds.DataManagementStrategyId:
            return exports.DataManagementStrategyName;
        case StrategyIds.DataSourceStrategyId:
            return exports.DataSourceStrategyName;
        case StrategyIds.ExportStrategyId:
            return exports.ExportStrategyName;
        case StrategyIds.FlashingCellsStrategyId:
            return exports.FlashingCellsStrategyName;
        case StrategyIds.FormatColumnStrategyId:
            return exports.FormatColumnStrategyName;
        case StrategyIds.LayoutStrategyId:
            return exports.LayoutStrategyName;
        case StrategyIds.PlusMinusStrategyId:
            return exports.PlusMinusStrategyName;
        case StrategyIds.QuickSearchStrategyId:
            return exports.QuickSearchStrategyName;
        case StrategyIds.ShortcutStrategyId:
            return exports.ShortcutStrategyName;
        case StrategyIds.SelectColumnStrategyId:
            return exports.SelectColumnStrategyName;
        case StrategyIds.SelectedCellsStrategyId:
            return exports.SelectedCellsStrategyName;
        case StrategyIds.SmartEditStrategyId:
            return exports.SmartEditStrategyName;
        case StrategyIds.TeamSharingStrategyId:
            return exports.TeamSharingStrategyName;
        case StrategyIds.ThemeStrategyId:
            return exports.ThemeStrategyName;
        case StrategyIds.UserFilterStrategyId:
            return exports.UserFilterStrategyName;
    }
}
exports.getNameForStrategy = getNameForStrategy;
