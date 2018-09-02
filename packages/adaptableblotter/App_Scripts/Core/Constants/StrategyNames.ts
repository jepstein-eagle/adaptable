import * as StrategyIds from './StrategyIds';

export const AboutStrategyName: string = "About"
export const AlertStrategyName: string = "Alert"
export const ApplicationStrategyName: string = "Application"
export const AdvancedSearchStrategyName: string = "Advanced Search"
export const BulkUpdateStrategyName: string = "Bulk Update"
export const CalculatedColumnStrategyName: string = "Calculated Column"
export const CalendarStrategyName: string = "Calendar"
export const CellValidationStrategyName: string = "Cell Validation"
export const ChartStrategyName: string = "Chart"
export const ColumnChooserStrategyName: string = "Column Chooser"
export const ColumnFilterStrategyName: string = "Column Filter"
export const ColumnInfoStrategyName: string = "Column Information"
export const ConditionalStyleStrategyName: string = "Conditional Style"
export const CustomSortStrategyName: string = "Custom Sort"
export const DashboardStrategyName: string = "Dashboard"
export const DataManagementStrategyName: string = "Manage State"
export const DataSourceStrategyName: string = "Data Source"
export const ExportStrategyName: string = "Export"
export const FlashingCellsStrategyName: string = "Flashing Cells"
export const FormatColumnStrategyName: string = "Format Column"
export const LayoutStrategyName: string = "Layout"
export const PlusMinusStrategyName: string = "Plus Minus"
export const QuickSearchStrategyName: string = "Quick Search"
export const ShortcutStrategyName: string = "Shortcut"
export const SelectColumnStrategyName: string = "Select Column"
export const SelectedCellsStrategyName: string = "Selected Cells"
export const SmartEditStrategyName: string = "Smart Edit"
export const TeamSharingStrategyName: string = "Team Sharing"
export const ThemeStrategyName: string = "Theme"
export const UserFilterStrategyName: string = "User Filter"


export function getNameForStrategy(strategyID: string) {
    switch (strategyID) {
        case StrategyIds.AboutStrategyId:
            return AboutStrategyName
        case StrategyIds.AlertStrategyId:
            return AlertStrategyName
        case StrategyIds.ApplicationStrategyId:
            return ApplicationStrategyName
        case StrategyIds.AdvancedSearchStrategyId:
            return AdvancedSearchStrategyName
        case StrategyIds.BulkUpdateStrategyId:
            return BulkUpdateStrategyName
        case StrategyIds.CalculatedColumnStrategyId:
            return CalculatedColumnStrategyName
        case StrategyIds.CalendarStrategyId:
            return CalendarStrategyName
        case StrategyIds.CellValidationStrategyId:
            return CellValidationStrategyName
        case StrategyIds.ChartStrategyId:
            return ChartStrategyName
        case StrategyIds.ColumnChooserStrategyId:
            return ColumnChooserStrategyName
        case StrategyIds.ColumnInfoStrategyId:
            return ColumnInfoStrategyName
        case StrategyIds.ColumnFilterStrategyId:
            return ColumnFilterStrategyName
        case StrategyIds.ConditionalStyleStrategyId:
            return ConditionalStyleStrategyName
        case StrategyIds.CustomSortStrategyId:
            return CustomSortStrategyName
        case StrategyIds.DashboardStrategyId:
            return DashboardStrategyName
        case StrategyIds.DataManagementStrategyId:
            return DataManagementStrategyName
        case StrategyIds.DataSourceStrategyId:
            return DataSourceStrategyName
        case StrategyIds.ExportStrategyId:
            return ExportStrategyName
        case StrategyIds.FlashingCellsStrategyId:
            return FlashingCellsStrategyName
        case StrategyIds.FormatColumnStrategyId:
            return FormatColumnStrategyName
        case StrategyIds.LayoutStrategyId:
            return LayoutStrategyName
        case StrategyIds.PlusMinusStrategyId:
            return PlusMinusStrategyName
        case StrategyIds.QuickSearchStrategyId:
            return QuickSearchStrategyName
        case StrategyIds.ShortcutStrategyId:
            return ShortcutStrategyName
        case StrategyIds.SelectColumnStrategyId:
            return SelectColumnStrategyName;
        case StrategyIds.SelectedCellsStrategyId:
            return SelectedCellsStrategyName;
        case StrategyIds.SmartEditStrategyId:
            return SmartEditStrategyName
        case StrategyIds.TeamSharingStrategyId:
            return TeamSharingStrategyName
        case StrategyIds.ThemeStrategyId:
            return ThemeStrategyName
        case StrategyIds.UserFilterStrategyId:
            return UserFilterStrategyName

    }
}