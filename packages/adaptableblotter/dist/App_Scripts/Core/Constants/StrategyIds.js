"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StrategyNames = require("./StrategyNames");
exports.AboutStrategyId = "About";
exports.AlertStrategyId = "Alert";
exports.ApplicationStrategyId = "Application";
exports.AdvancedSearchStrategyId = "AdvancedSearch";
exports.BulkUpdateStrategyId = "BulkUpdate";
exports.CalculatedColumnStrategyId = "CalculatedColumn";
exports.CalendarStrategyId = "Calendar";
exports.CellValidationStrategyId = "CellValidation";
exports.ChartStrategyId = "Chart";
exports.ColumnChooserStrategyId = "ColumnChooser";
exports.ColumnFilterStrategyId = "ColumnFilter";
exports.ColumnInfoStrategyId = "ColumnInfo";
exports.ConditionalStyleStrategyId = "ConditionalStyle";
exports.CustomSortStrategyId = "CustomSort";
exports.DashboardStrategyId = "Dashboard";
exports.DataSourceStrategyId = "DataSource";
exports.ExportStrategyId = "Export";
exports.FlashingCellsStrategyId = "FlashingCells";
exports.FormatColumnStrategyId = "FormatColumn";
exports.HomeStrategyId = "Home";
exports.LayoutStrategyId = "Layout";
exports.PlusMinusStrategyId = "PlusMinus";
exports.QuickSearchStrategyId = "QuickSearch";
exports.ShortcutStrategyId = "Shortcut";
exports.SelectColumnStrategyId = "SelectColumn";
exports.SelectedCellsStrategyId = "SelectedCells";
exports.SmartEditStrategyId = "SmartEdit";
exports.TeamSharingStrategyId = "TeamSharing";
exports.ThemeStrategyId = "Theme";
exports.DataManagementStrategyId = "UserDataManagement";
exports.UserFilterStrategyId = "UserFilter";
function getIdForStrategyName(strategyName) {
    switch (strategyName) {
        case StrategyNames.AboutStrategyName:
            return exports.AboutStrategyId;
        case StrategyNames.ApplicationStrategyName:
            return exports.ApplicationStrategyId;
        case StrategyNames.AdvancedSearchStrategyName:
            return exports.AdvancedSearchStrategyId;
        case StrategyNames.BulkUpdateStrategyName:
            return exports.BulkUpdateStrategyId;
        case StrategyNames.CalculatedColumnStrategyName:
            return exports.CalculatedColumnStrategyId;
        case StrategyNames.CalendarStrategyName:
            return exports.CalendarStrategyId;
        case StrategyNames.CellValidationStrategyName:
            return exports.CellValidationStrategyId;
        case StrategyNames.ChartStrategyName:
            return exports.ChartStrategyId;
        case StrategyNames.ColumnChooserStrategyName:
            return exports.ColumnChooserStrategyId;
        case StrategyNames.ColumnInfoStrategyName:
            return exports.ColumnInfoStrategyId;
        case StrategyNames.ConditionalStyleStrategyName:
            return exports.ConditionalStyleStrategyId;
        case StrategyNames.CustomSortStrategyName:
            return exports.CustomSortStrategyId;
        case StrategyNames.DashboardStrategyName:
            return exports.DashboardStrategyId;
        case StrategyNames.DataSourceStrategyName:
            return exports.DataSourceStrategyId;
        case StrategyNames.ExportStrategyName:
            return exports.ExportStrategyId;
        case StrategyNames.UserFilterStrategyName:
            return exports.UserFilterStrategyId;
        case StrategyNames.ColumnFilterStrategyName:
            return exports.ColumnFilterStrategyId;
        case StrategyNames.FlashingCellsStrategyName:
            return exports.FlashingCellsStrategyId;
        case StrategyNames.FormatColumnStrategyName:
            return exports.FormatColumnStrategyId;
        case StrategyNames.LayoutStrategyName:
            return exports.LayoutStrategyId;
        case StrategyNames.PlusMinusStrategyName:
            return exports.PlusMinusStrategyId;
        case StrategyNames.QuickSearchStrategyName:
            return exports.QuickSearchStrategyId;
        case StrategyNames.ShortcutStrategyName:
            return exports.ShortcutStrategyId;
        case StrategyNames.SelectColumnStrategyName:
            return exports.SelectColumnStrategyId;
        case StrategyNames.SelectedCellsStrategyName:
            return exports.SelectedCellsStrategyId;
        case StrategyNames.SmartEditStrategyName:
            return exports.SmartEditStrategyId;
        case StrategyNames.TeamSharingStrategyName:
            return exports.TeamSharingStrategyId;
        case StrategyNames.ThemeStrategyName:
            return exports.ThemeStrategyId;
        case StrategyNames.DataManagementStrategyName:
            return exports.DataManagementStrategyId;
    }
}
exports.getIdForStrategyName = getIdForStrategyName;
