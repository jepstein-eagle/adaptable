import * as StrategyIds from './StrategyIds';

export const AdvancedSearchStrategyName: string = "Advanced Search"
export const CalculatedColumnStrategyName: string = "Calculated Column"
export const CalendarStrategyName: string = "Calendar"
export const CellValidationStrategyName: string = "Cell Validation"
export const ColumnChooserStrategyName: string = "Column Chooser"
export const ColumnFilterStrategyName: string = "Column Filter"
export const ColumnInfoStrategyName: string = "Column Information"
export const ConditionalStyleStrategyName: string = "Conditional Style"
export const CustomSortStrategyName: string = "Custom Sort"
export const DashboardStrategyName: string = "Dashboard"
export const ExportStrategyName: string = "Export"
export const FlashingCellsStrategyName: string = "Flashing Cells"
export const FormatColumnStrategyName: string = "Format Column"
export const LayoutStrategyName: string = "Layout"
export const PlusMinusStrategyName: string = "Plus Minus"
export const QuickSearchStrategyName: string = "Quick Search"
export const ShortcutStrategyName: string = "Shortcut"
export const SmartEditStrategyName: string = "Smart Edit"
export const TeamSharingStrategyName: string = "Team Sharing"
export const ThemeStrategyName: string = "Theme"
export const UserDataManagementStrategyName: string = "User Data Management"
export const UserFilterStrategyName: string = "User Filter"


export function getNameForStrategy(strategyID: string) {
    switch (strategyID) {
        case StrategyIds.AdvancedSearchStrategyId:
            return AdvancedSearchStrategyName
        case StrategyIds.CalculatedColumnStrategyId:
            return CalculatedColumnStrategyName
        case StrategyIds.CalendarStrategyId:
            return CalendarStrategyName
        case StrategyIds.CellValidationStrategyId:
            return CellValidationStrategyName
        case StrategyIds.ColumnChooserStrategyId:
            return ColumnChooserStrategyName
        case StrategyIds.ColumnInfoStrategyId:
            return ColumnInfoStrategyName
        case StrategyIds.ConditionalStyleStrategyId:
            return ConditionalStyleStrategyName
        case StrategyIds.CustomSortStrategyId:
            return CustomSortStrategyName
        case StrategyIds.ExportStrategyId:
            return ExportStrategyName
        case StrategyIds.UserFilterStrategyId:
            return UserFilterStrategyName
        case StrategyIds.ColumnFilterStrategyId:
            return ColumnFilterStrategyName
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
        case StrategyIds.SmartEditStrategyId:
            return SmartEditStrategyName
        case StrategyIds.TeamSharingStrategyId:
            return TeamSharingStrategyName
        case StrategyIds.ThemeStrategyId:
            return ThemeStrategyName
    }
}