import * as StrategyNames from './StrategyNames';

export const AboutStrategyId: string = "About"
export const AlertStrategyId: string = "Alert"
export const ApplicationStrategyId: string = "Application"
export const AdvancedSearchStrategyId: string = "AdvancedSearch"
export const BulkUpdateStrategyId: string = "BulkUpdate"
export const CalculatedColumnStrategyId: string = "CalculatedColumn"
export const CalendarStrategyId: string = "Calendar"
export const CellValidationStrategyId: string = "CellValidation"
export const ChartsStrategyId: string = "Charts"
export const ColumnChooserStrategyId: string = "ColumnChooser"
export const ColumnFilterStrategyId: string = "ColumnFilter"
export const ColumnInfoStrategyId: string = "ColumnInfo"
export const ConditionalStyleStrategyId: string = "ConditionalStyle"
export const CustomSortStrategyId: string = "CustomSort"
export const DashboardStrategyId: string = "Dashboard"
export const DataSourceStrategyId: string = "DataSource"
export const ExportStrategyId: string = "Export"
export const FlashingCellsStrategyId: string = "FlashingCells"
export const FormatColumnStrategyId: string = "FormatColumn"
export const HomeStrategyId: string = "Home"
export const LayoutStrategyId: string = "Layout"
export const PlusMinusStrategyId: string = "PlusMinus"
export const QuickSearchStrategyId: string = "QuickSearch"
export const ShortcutStrategyId: string = "Shortcut"
export const SelectColumnStrategyId: string = "SelectColumn"
export const SelectedCellsStrategyId: string = "SelectedCells"
export const SmartEditStrategyId: string = "SmartEdit"
export const TeamSharingStrategyId: string = "TeamSharing"
export const ThemeStrategyId: string = "Theme"
export const DataManagementStrategyId: string = "UserDataManagement"
export const UserFilterStrategyId: string = "UserFilter"


export function getIdForStrategyName(strategyName: string) {
    switch (strategyName) {
        case StrategyNames.AboutStrategyName:
            return AboutStrategyId
        case StrategyNames.ApplicationStrategyName:
            return ApplicationStrategyId
        case StrategyNames.AdvancedSearchStrategyName:
            return AdvancedSearchStrategyId
        case StrategyNames.BulkUpdateStrategyName:
            return BulkUpdateStrategyId
        case StrategyNames.CalculatedColumnStrategyName:
            return CalculatedColumnStrategyId
        case StrategyNames.CalendarStrategyName:
            return CalendarStrategyId
        case StrategyNames.CellValidationStrategyName:
            return CellValidationStrategyId
        case StrategyNames.ChartsStrategyName:
            return ChartsStrategyId
        case StrategyNames.ColumnChooserStrategyName:
            return ColumnChooserStrategyId
        case StrategyNames.ColumnInfoStrategyName:
            return ColumnInfoStrategyId
        case StrategyNames.ConditionalStyleStrategyName:
            return ConditionalStyleStrategyId
        case StrategyNames.CustomSortStrategyName:
            return CustomSortStrategyId
        case StrategyNames.DashboardStrategyName:
            return DashboardStrategyId
        case StrategyNames.DataSourceStrategyName:
            return DataSourceStrategyId
        case StrategyNames.ExportStrategyName:
            return ExportStrategyId
        case StrategyNames.UserFilterStrategyName:
            return UserFilterStrategyId
        case StrategyNames.ColumnFilterStrategyName:
            return ColumnFilterStrategyId
        case StrategyNames.FlashingCellsStrategyName:
            return FlashingCellsStrategyId
        case StrategyNames.FormatColumnStrategyName:
            return FormatColumnStrategyId
        case StrategyNames.LayoutStrategyName:
            return LayoutStrategyId
        case StrategyNames.PlusMinusStrategyName:
            return PlusMinusStrategyId
        case StrategyNames.QuickSearchStrategyName:
            return QuickSearchStrategyId
        case StrategyNames.ShortcutStrategyName:
            return ShortcutStrategyId
        case StrategyNames.SelectColumnStrategyName:
            return SelectColumnStrategyId;
        case StrategyNames.SelectedCellsStrategyName:
            return SelectedCellsStrategyId;
        case StrategyNames.SmartEditStrategyName:
            return SmartEditStrategyId
        case StrategyNames.TeamSharingStrategyName:
            return TeamSharingStrategyId
        case StrategyNames.ThemeStrategyName:
            return ThemeStrategyId
        case StrategyNames.DataManagementStrategyName:
            return DataManagementStrategyId
    }
}