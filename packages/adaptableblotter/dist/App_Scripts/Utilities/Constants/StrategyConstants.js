"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Strategy Ids
exports.AdvancedSearchStrategyId = "AdvancedSearch";
exports.AlertStrategyId = "Alert";
exports.ApplicationStrategyId = "Application";
exports.BulkUpdateStrategyId = "BulkUpdate";
exports.CalculatedColumnStrategyId = "CalculatedColumn";
exports.CalendarStrategyId = "Calendar";
exports.CellSummaryStrategyId = "CellSummary";
exports.CellValidationStrategyId = "CellValidation";
exports.ChartStrategyId = "Chart";
exports.ColumnCategoryStrategyId = "ColumnCategory";
exports.ColumnChooserStrategyId = "ColumnChooser";
exports.ColumnFilterStrategyId = "ColumnFilter";
exports.ColumnInfoStrategyId = "ColumnInfo";
exports.ConditionalStyleStrategyId = "ConditionalStyle";
exports.CustomSortStrategyId = "CustomSort";
exports.DashboardStrategyId = "Dashboard";
exports.DataManagementStrategyId = "DataManagement";
exports.DataSourceStrategyId = "DataSource";
exports.ExportStrategyId = "Export";
exports.FlashingCellsStrategyId = "FlashingCells";
exports.FormatColumnStrategyId = "FormatColumn";
exports.FreeTextColumnStrategyId = "FreeTextColumn";
exports.HomeStrategyId = "Home";
exports.LayoutStrategyId = "Layout";
exports.PercentBarStrategyId = "PercentBar";
exports.PieChartStrategyId = "PieChart";
exports.PlusMinusStrategyId = "PlusMinus";
exports.QuickSearchStrategyId = "QuickSearch";
exports.ScheduleStrategyId = "Schedule";
exports.SelectColumnStrategyId = "SelectColumn";
exports.ShortcutStrategyId = "Shortcut";
exports.SmartEditStrategyId = "SmartEdit";
exports.TeamSharingStrategyId = "TeamSharing";
exports.ThemeStrategyId = "Theme";
exports.UserFilterStrategyId = "UserFilter";
// Strategy Names
exports.AdvancedSearchStrategyName = "Advanced Search";
exports.AlertStrategyName = "Alert";
exports.ApplicationStrategyName = "Application";
exports.BulkUpdateStrategyName = "Bulk Update";
exports.CalculatedColumnStrategyName = "Calculated Column";
exports.CalendarStrategyName = "Calendar";
exports.CellSummaryStrategyName = "Cell Summary";
exports.CellValidationStrategyName = "Cell Validation";
exports.ChartStrategyName = "Chart";
exports.ColumnCategoryStrategyName = "Column Category";
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
exports.FreeTextColumnStrategyName = "Free Text Column";
exports.LayoutStrategyName = "Layout";
exports.PercentBarStrategyName = "Percent Bar";
exports.PieChartStrategyName = "Pie Chart";
exports.PlusMinusStrategyName = "Plus Minus";
exports.QuickSearchStrategyName = "Quick Search";
exports.ScheduleStrategyName = "Schedule";
exports.SelectColumnStrategyName = "Select Column";
exports.ShortcutStrategyName = "Shortcut";
exports.SmartEditStrategyName = "Smart Edit";
exports.TeamSharingStrategyName = "Team Sharing";
exports.ThemeStrategyName = "Theme";
exports.UserFilterStrategyName = "User Filter";
// Strategy Glyphs
exports.AdvancedSearchGlyph = "search";
exports.AlertGlyph = "bullhorn";
exports.ApplicationGlyph = "font";
exports.BulkUpdateGlyph = "hand-up";
exports.CalculatedColumnGlyph = "th-list";
exports.CalendarGlyph = "calendar";
exports.CellSummaryGlyph = "th-large";
exports.CellValidationGlyph = "flag";
exports.ChartGlyph = "signal";
exports.ColumnCategoryGlyph = "link";
exports.ColumnChooserGlyph = "list-alt";
exports.ColumnFilterGlyph = "filter";
exports.ColumnInfoGlyph = "italic";
exports.ConditionalStyleGlyph = "tint";
exports.CustomSortGlyph = "sort-by-attributes";
exports.DashboardGlyph = "dashboard";
exports.DataManagementGlyph = "folder-close";
exports.DataSourceGlyph = "book";
exports.ExportGlyph = "export";
exports.FlashingCellGlyph = "flash";
exports.FormatColumnGlyph = "picture";
exports.FreeTextColumnGlyph = "comment";
exports.FunctionsGlyph = "home";
exports.LayoutGlyph = "th";
exports.PercentBarGlyph = "transfer";
exports.PieChartGlyph = "adjust";
exports.PlusMinusGlyph = "plus-sign";
exports.QuickSearchGlyph = "eye-open";
exports.ScheduleGlyph = "eye-open";
exports.SelectColumnGlyph = "compressed";
exports.ShortcutGlyph = "road";
exports.SmartEditGlyph = "pencil";
exports.TeamSharingGlyph = "share";
exports.ThemeGlyph = "leaf";
exports.UserFilterGlyph = "user";
function getIdForStrategyName(strategyName) {
    switch (strategyName) {
        case exports.AdvancedSearchStrategyName:
            return exports.AdvancedSearchStrategyId;
        case exports.AlertStrategyName:
            return exports.AlertStrategyId;
        case exports.ApplicationStrategyName:
            return exports.ApplicationStrategyId;
        case exports.BulkUpdateStrategyName:
            return exports.BulkUpdateStrategyId;
        case exports.CalculatedColumnStrategyName:
            return exports.CalculatedColumnStrategyId;
        case exports.CalendarStrategyName:
            return exports.CalendarStrategyId;
        case exports.CellValidationStrategyName:
            return exports.CellValidationStrategyId;
        case exports.ChartStrategyName:
            return exports.ChartStrategyId;
        case exports.ColumnCategoryStrategyName:
            return exports.ColumnCategoryStrategyId;
        case exports.ColumnChooserStrategyName:
            return exports.ColumnChooserStrategyId;
        case exports.ColumnFilterStrategyName:
            return exports.ColumnFilterStrategyId;
        case exports.ColumnInfoStrategyName:
            return exports.ColumnInfoStrategyId;
        case exports.ConditionalStyleStrategyName:
            return exports.ConditionalStyleStrategyId;
        case exports.CustomSortStrategyName:
            return exports.CustomSortStrategyId;
        case exports.DashboardStrategyName:
            return exports.DashboardStrategyId;
        case exports.DataManagementStrategyName:
            return exports.DataManagementStrategyId;
        case exports.DataSourceStrategyName:
            return exports.DataSourceStrategyId;
        case exports.ExportStrategyName:
            return exports.ExportStrategyId;
        case exports.FlashingCellsStrategyName:
            return exports.FlashingCellsStrategyId;
        case exports.FormatColumnStrategyName:
            return exports.FormatColumnStrategyId;
        case exports.FreeTextColumnStrategyName:
            return exports.FreeTextColumnStrategyId;
        case exports.LayoutStrategyName:
            return exports.LayoutStrategyId;
        case exports.PercentBarStrategyName:
            return exports.PercentBarStrategyId;
        case exports.PieChartStrategyName:
            return exports.PieChartStrategyId;
        case exports.PlusMinusStrategyName:
            return exports.PlusMinusStrategyId;
        case exports.QuickSearchStrategyName:
            return exports.QuickSearchStrategyId;
        case exports.ScheduleStrategyName:
            return exports.ScheduleStrategyId;
        case exports.SelectColumnStrategyName:
            return exports.SelectColumnStrategyId;
        case exports.CellSummaryStrategyName:
            return exports.CellSummaryStrategyId;
        case exports.ShortcutStrategyName:
            return exports.ShortcutStrategyId;
        case exports.SmartEditStrategyName:
            return exports.SmartEditStrategyId;
        case exports.TeamSharingStrategyName:
            return exports.TeamSharingStrategyId;
        case exports.ThemeStrategyName:
            return exports.ThemeStrategyId;
        case exports.UserFilterStrategyName:
            return exports.UserFilterStrategyId;
    }
}
exports.getIdForStrategyName = getIdForStrategyName;
function getNameForStrategyId(strategyID) {
    switch (strategyID) {
        case exports.AdvancedSearchStrategyId:
            return exports.AdvancedSearchStrategyName;
        case exports.AlertStrategyId:
            return exports.AlertStrategyName;
        case exports.ApplicationStrategyId:
            return exports.ApplicationStrategyName;
        case exports.BulkUpdateStrategyId:
            return exports.BulkUpdateStrategyName;
        case exports.CalculatedColumnStrategyId:
            return exports.CalculatedColumnStrategyName;
        case exports.CalendarStrategyId:
            return exports.CalendarStrategyName;
        case exports.CellValidationStrategyId:
            return exports.CellValidationStrategyName;
        case exports.ChartStrategyId:
            return exports.ChartStrategyName;
        case exports.ColumnCategoryStrategyId:
            return exports.ColumnCategoryStrategyName;
        case exports.ColumnChooserStrategyId:
            return exports.ColumnChooserStrategyName;
        case exports.ColumnFilterStrategyId:
            return exports.ColumnFilterStrategyName;
        case exports.ColumnInfoStrategyId:
            return exports.ColumnInfoStrategyName;
        case exports.ConditionalStyleStrategyId:
            return exports.ConditionalStyleStrategyName;
        case exports.CustomSortStrategyId:
            return exports.CustomSortStrategyName;
        case exports.DashboardStrategyId:
            return exports.DashboardStrategyName;
        case exports.DataManagementStrategyId:
            return exports.DataManagementStrategyName;
        case exports.DataSourceStrategyId:
            return exports.DataSourceStrategyName;
        case exports.ExportStrategyId:
            return exports.ExportStrategyName;
        case exports.FlashingCellsStrategyId:
            return exports.FlashingCellsStrategyName;
        case exports.FormatColumnStrategyId:
            return exports.FormatColumnStrategyName;
        case exports.FreeTextColumnStrategyId:
            return exports.FreeTextColumnStrategyName;
        case exports.LayoutStrategyId:
            return exports.LayoutStrategyName;
        case exports.PercentBarStrategyId:
            return exports.PercentBarStrategyName;
        case exports.PieChartStrategyId:
            return exports.PieChartStrategyName;
        case exports.PlusMinusStrategyId:
            return exports.PlusMinusStrategyName;
        case exports.QuickSearchStrategyId:
            return exports.QuickSearchStrategyName;
        case exports.QuickSearchStrategyId:
            return exports.ScheduleStrategyName;
        case exports.ScheduleStrategyId:
            return exports.SelectColumnStrategyName;
        case exports.CellSummaryStrategyId:
            return exports.CellSummaryStrategyName;
        case exports.ShortcutStrategyId:
            return exports.ShortcutStrategyName;
        case exports.SmartEditStrategyId:
            return exports.SmartEditStrategyName;
        case exports.TeamSharingStrategyId:
            return exports.TeamSharingStrategyName;
        case exports.ThemeStrategyId:
            return exports.ThemeStrategyName;
        case exports.UserFilterStrategyId:
            return exports.UserFilterStrategyName;
    }
}
exports.getNameForStrategyId = getNameForStrategyId;
function getGhyphiconForStrategyId(strategyID) {
    switch (strategyID) {
        case exports.AdvancedSearchStrategyId:
            return exports.AdvancedSearchGlyph;
        case exports.AlertStrategyId:
            return exports.AlertGlyph;
        case exports.ApplicationStrategyId:
            return exports.ApplicationGlyph;
        case exports.BulkUpdateStrategyId:
            return exports.BulkUpdateGlyph;
        case exports.CalculatedColumnStrategyId:
            return exports.CalculatedColumnGlyph;
        case exports.CalendarStrategyId:
            return exports.CalendarGlyph;
        case exports.CellValidationStrategyId:
            return exports.CellValidationGlyph;
        case exports.ChartStrategyId:
            return exports.ChartGlyph;
        case exports.ColumnCategoryStrategyId:
            return exports.ColumnCategoryGlyph;
        case exports.ColumnChooserStrategyId:
            return exports.ColumnChooserGlyph;
        case exports.ColumnFilterStrategyId:
            return exports.ColumnFilterGlyph;
        case exports.ColumnInfoStrategyId:
            return exports.ColumnInfoGlyph;
        case exports.ConditionalStyleStrategyId:
            return exports.ConditionalStyleGlyph;
        case exports.CustomSortStrategyId:
            return exports.CustomSortGlyph;
        case exports.DataManagementStrategyId:
            return exports.DataManagementGlyph;
        case exports.ExportStrategyId:
            return exports.ExportGlyph;
        case exports.FlashingCellsStrategyId:
            return exports.FlashingCellGlyph;
        case exports.FormatColumnStrategyId:
            return exports.FormatColumnGlyph;
        case exports.FreeTextColumnStrategyId:
            return exports.FreeTextColumnGlyph;
        case exports.LayoutStrategyId:
            return exports.LayoutGlyph;
        case exports.PercentBarStrategyId:
            return exports.PercentBarGlyph;
        case exports.PieChartStrategyId:
            return exports.PieChartGlyph;
        case exports.PlusMinusStrategyId:
            return exports.PlusMinusGlyph;
        case exports.QuickSearchStrategyId:
            return exports.QuickSearchGlyph;
        case exports.ScheduleStrategyId:
            return exports.ScheduleGlyph;
        case exports.ShortcutStrategyId:
            return exports.ShortcutGlyph;
        case exports.SelectColumnStrategyId:
            return exports.SelectColumnGlyph;
        case exports.CellSummaryStrategyId:
            return exports.CellSummaryGlyph;
        case exports.SmartEditStrategyId:
            return exports.SmartEditGlyph;
        case exports.TeamSharingStrategyId:
            return exports.TeamSharingGlyph;
        case exports.ThemeStrategyId:
            return exports.ThemeGlyph;
        case exports.UserFilterStrategyId:
            return exports.UserFilterGlyph;
    }
}
exports.getGhyphiconForStrategyId = getGhyphiconForStrategyId;
