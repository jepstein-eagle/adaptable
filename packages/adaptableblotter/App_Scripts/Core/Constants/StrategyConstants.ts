
// Strategy Ids
export const AdvancedSearchStrategyId: string = "AdvancedSearch"
export const AlertStrategyId: string = "Alert"
export const ApplicationStrategyId: string = "Application"
export const BulkUpdateStrategyId: string = "BulkUpdate"
export const CalculatedColumnStrategyId: string = "CalculatedColumn"
export const CalendarStrategyId: string = "Calendar"
export const CellValidationStrategyId: string = "CellValidation"
export const ChartStrategyId: string = "Chart"
export const ColumnChooserStrategyId: string = "ColumnChooser"
export const ColumnFilterStrategyId: string = "ColumnFilter"
export const ColumnInfoStrategyId: string = "ColumnInfo"
export const ConditionalStyleStrategyId: string = "ConditionalStyle"
export const CustomSortStrategyId: string = "CustomSort"
export const DashboardStrategyId: string = "Dashboard"
export const DataManagementStrategyId: string = "UserDataManagement"
export const DataSourceStrategyId: string = "DataSource"
export const ExportStrategyId: string = "Export"
export const FlashingCellsStrategyId: string = "FlashingCells"
export const FormatColumnStrategyId: string = "FormatColumn"
export const FreeTextColumnStrategyId: string = "FreeTextColumn"
export const HomeStrategyId: string = "Home"
export const LayoutStrategyId: string = "Layout"
export const PlusMinusStrategyId: string = "PlusMinus"
export const QuickSearchStrategyId: string = "QuickSearch"
export const SelectColumnStrategyId: string = "SelectColumn"
export const SelectedCellsStrategyId: string = "SelectedCells"
export const ShortcutStrategyId: string = "Shortcut"
export const SmartEditStrategyId: string = "SmartEdit"
export const TeamSharingStrategyId: string = "TeamSharing"
export const ThemeStrategyId: string = "Theme"
export const UserFilterStrategyId: string = "UserFilter"

// Strategy Names
export const AlertStrategyName: string = "Alert"
export const AdvancedSearchStrategyName: string = "Advanced Search"
export const ApplicationStrategyName: string = "Application"
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
export const FreeTextColumnStrategyName: string = "Free Text Column"
export const LayoutStrategyName: string = "Layout"
export const PlusMinusStrategyName: string = "Plus Minus"
export const QuickSearchStrategyName: string = "Quick Search"
export const SelectColumnStrategyName: string = "Select Column"
export const SelectedCellsStrategyName: string = "Selected Cells"
export const ShortcutStrategyName: string = "Shortcut"
export const SmartEditStrategyName: string = "Smart Edit"
export const TeamSharingStrategyName: string = "Team Sharing"
export const ThemeStrategyName: string = "Theme"
export const UserFilterStrategyName: string = "User Filter"

// Strategy Glyphs
export const AlertGlyph: string = "bullhorn"
export const AdvancedSearchGlyph: string = "search"
export const ApplicationGlyph: string = "font"
export const BulkUpdateGlyph: string = "hand-up"
export const CalculatedColumnGlyph: string = "th-list"
export const CalendarGlyph: string = "calendar"
export const CellValidationGlyph: string = "flag"
export const ChartGlyph: string = "signal"
export const ColumnChooserGlyph: string = "list-alt"
export const ColumnFilterGlyph: string = "filter"
export const ColumnInfoGlyph: string = "italic"
export const ConditionalStyleGlyph: string = "tint"
export const CustomSortGlyph: string = "sort-by-attributes"
export const DashboardGlyph: string = "dashboard"
export const DataManagementGlyph: string = "folder-close"
export const DataSourceGlyph: string = "book"
export const ExportGlyph: string = "export"
export const FlashingCellGlyph: string = "flash"
export const FormatColumnGlyph: string = "picture"
export const FreeTextColumnGlyph: string = "picture"
export const FunctionsGlyph: string = "home"
export const LayoutGlyph: string = "th"
export const PlusMinusGlyph: string = "plus-sign"
export const QuickSearchGlyph: string = "eye-open"
export const SelectColumnGlyph: string = "compressed"
export const SelectedCellsGlyph: string = "th-large"
export const ShortcutGlyph: string = "road"
export const SmartEditGlyph: string = "pencil"
export const TeamSharingGlyph: string = "share"
export const ThemeGlyph: string = "leaf"
export const UserFilterGlyph: string = "user"

export function getIdForStrategyName(strategyName: string) {
    switch (strategyName) {
        case AlertStrategyName:
            return AlertStrategyId
        case AdvancedSearchStrategyName:
            return AdvancedSearchStrategyId
        case ApplicationStrategyName:
            return ApplicationStrategyId
        case BulkUpdateStrategyName:
            return BulkUpdateStrategyId
        case CalculatedColumnStrategyName:
            return CalculatedColumnStrategyId
        case CalendarStrategyName:
            return CalendarStrategyId
        case CellValidationStrategyName:
            return CellValidationStrategyId
        case ChartStrategyName:
            return ChartStrategyId
        case ColumnChooserStrategyName:
            return ColumnChooserStrategyId
        case ColumnFilterStrategyName:
            return ColumnFilterStrategyId
        case ColumnInfoStrategyName:
            return ColumnInfoStrategyId
        case ConditionalStyleStrategyName:
            return ConditionalStyleStrategyId
        case CustomSortStrategyName:
            return CustomSortStrategyId
        case DashboardStrategyName:
            return DashboardStrategyId
        case DataManagementStrategyName:
            return DataManagementStrategyId
        case DataSourceStrategyName:
            return DataSourceStrategyId
        case ExportStrategyName:
            return ExportStrategyId
        case FlashingCellsStrategyName:
            return FlashingCellsStrategyId
        case FormatColumnStrategyName:
            return FormatColumnStrategyId
        case FreeTextColumnStrategyName:
            return FreeTextColumnStrategyId
        case LayoutStrategyName:
            return LayoutStrategyId
        case PlusMinusStrategyName:
            return PlusMinusStrategyId
        case QuickSearchStrategyName:
            return QuickSearchStrategyId
        case SelectColumnStrategyName:
            return SelectColumnStrategyId;
        case SelectedCellsStrategyName:
            return SelectedCellsStrategyId;
        case ShortcutStrategyName:
            return ShortcutStrategyId
        case SmartEditStrategyName:
            return SmartEditStrategyId
        case TeamSharingStrategyName:
            return TeamSharingStrategyId
        case ThemeStrategyName:
            return ThemeStrategyId
        case UserFilterStrategyName:
            return UserFilterStrategyId

    }
}

export function getNameForStrategyId(strategyID: string) {
    switch (strategyID) {
        case AlertStrategyId:
            return AlertStrategyName
        case AdvancedSearchStrategyId:
            return AdvancedSearchStrategyName
        case ApplicationStrategyId:
            return ApplicationStrategyName
        case BulkUpdateStrategyId:
            return BulkUpdateStrategyName
        case CalculatedColumnStrategyId:
            return CalculatedColumnStrategyName
        case CalendarStrategyId:
            return CalendarStrategyName
        case CellValidationStrategyId:
            return CellValidationStrategyName
        case ChartStrategyId:
            return ChartStrategyName
        case ColumnChooserStrategyId:
            return ColumnChooserStrategyName
        case ColumnFilterStrategyId:
            return ColumnFilterStrategyName
        case ColumnInfoStrategyId:
            return ColumnInfoStrategyName
        case ConditionalStyleStrategyId:
            return ConditionalStyleStrategyName
        case CustomSortStrategyId:
            return CustomSortStrategyName
        case DashboardStrategyId:
            return DashboardStrategyName
        case DataManagementStrategyId:
            return DataManagementStrategyName
        case DataSourceStrategyId:
            return DataSourceStrategyName
        case ExportStrategyId:
            return ExportStrategyName
        case FlashingCellsStrategyId:
            return FlashingCellsStrategyName
        case FormatColumnStrategyId:
            return FormatColumnStrategyName
        case FreeTextColumnStrategyId:
            return FreeTextColumnStrategyName
        case LayoutStrategyId:
            return LayoutStrategyName
        case PlusMinusStrategyId:
            return PlusMinusStrategyName
        case QuickSearchStrategyId:
            return QuickSearchStrategyName
        case SelectColumnStrategyId:
            return SelectColumnStrategyName;
        case SelectedCellsStrategyId:
            return SelectedCellsStrategyName;
        case ShortcutStrategyId:
            return ShortcutStrategyName
        case SmartEditStrategyId:
            return SmartEditStrategyName
        case TeamSharingStrategyId:
            return TeamSharingStrategyName
        case ThemeStrategyId:
            return ThemeStrategyName
        case UserFilterStrategyId:
            return UserFilterStrategyName
    }
}

export function getGhyphiconForStrategyId(strategyID: string) {
    switch (strategyID) {
        case AlertStrategyId:
            return AlertGlyph
        case AdvancedSearchStrategyId:
            return AdvancedSearchGlyph
        case ApplicationStrategyId:
            return ApplicationGlyph
        case BulkUpdateStrategyId:
            return BulkUpdateGlyph
        case CalculatedColumnStrategyId:
            return CalculatedColumnGlyph
        case CalendarStrategyId:
            return CalendarGlyph
        case CellValidationStrategyId:
            return CellValidationGlyph
        case ChartStrategyId:
            return ChartGlyph
        case ColumnChooserStrategyId:
            return ColumnChooserGlyph
        case ColumnFilterStrategyId:
            return ColumnFilterGlyph
        case ColumnInfoStrategyId:
            return ColumnInfoGlyph
        case ConditionalStyleStrategyId:
            return ConditionalStyleGlyph
        case CustomSortStrategyId:
            return CustomSortGlyph
        case DataManagementStrategyId:
            return DataManagementGlyph;
        case ExportStrategyId:
            return ExportGlyph
        case FlashingCellsStrategyId:
            return FlashingCellGlyph
        case FormatColumnStrategyId:
            return FormatColumnGlyph
        case FreeTextColumnStrategyId:
            return FreeTextColumnGlyph
        case LayoutStrategyId:
            return LayoutGlyph
        case PlusMinusStrategyId:
            return PlusMinusGlyph
        case QuickSearchStrategyId:
            return QuickSearchGlyph
        case ShortcutStrategyId:
            return ShortcutGlyph
        case SelectColumnStrategyId:
            return SelectColumnGlyph
        case SelectedCellsStrategyId:
            return SelectedCellsGlyph
        case SmartEditStrategyId:
            return SmartEditGlyph
        case TeamSharingStrategyId:
            return TeamSharingGlyph;
        case ThemeStrategyId:
            return ThemeGlyph;
        case UserFilterStrategyId:
            return UserFilterGlyph;

    }


}
