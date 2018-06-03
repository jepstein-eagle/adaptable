import * as StrategyIds from './StrategyIds';

export const AboutGlyph: string = "info-sign"
export const AdvancedSearchGlyph: string = "search"
export const ApplicationGlyph: string = "font"
export const BulkUpdateGlyph: string = "hand-up"
export const CalculatedColumnGlyph: string = "th-list"
export const CalendarGlyph: string = "calendar"
export const CellValidationGlyph: string = "flag"
export const ColumnChooserGlyph: string = "list-alt"
export const ColumnFilterGlyph: string = "filter"
export const ColumnInfoGlyph: string = "stats"
export const ConditionalStyleGlyph: string = "tint"
export const CustomSortGlyph: string = "sort-by-attributes"
export const DashboardGlyph: string = "dashboard"
export const DataSourceGlyph: string = "book"
export const DataManagementGlyph: string = "folder-close"
export const ExportGlyph: string = "export"
export const FlashingCellGlyph: string = "flash"
export const FormatColumnGlyph: string = "picture"
export const FunctionsGlyph: string = "home"
export const LayoutGlyph: string = "th"
export const PlusMinusGlyph: string = "plus-sign"
export const QuickSearchGlyph: string = "eye-open"
export const ShortcutGlyph: string = "road"
export const SelectColumnGlyph: string = "compressed"
export const SelectedCellsGlyph: string = "compressed"
export const SmartEditGlyph: string = "pencil"
export const TeamSharingGlyph: string = "share"
export const ThemeGlyph: string = "leaf"
export const UserFilterGlyph: string = "user"

export function getGhyphiconForStrategy(strategyID: string) {
    switch (strategyID) {
        case StrategyIds.AboutStrategyId:
            return AboutGlyph
        case StrategyIds.AdvancedSearchStrategyId:
            return AdvancedSearchGlyph
        case StrategyIds.ApplicationStrategyId:
            return ApplicationGlyph
        case StrategyIds.BulkUpdateStrategyId:
            return BulkUpdateGlyph
        case StrategyIds.CalculatedColumnStrategyId:
            return CalculatedColumnGlyph
        case StrategyIds.CalendarStrategyId:
            return CalendarGlyph
        case StrategyIds.CellValidationStrategyId:
            return CellValidationGlyph
        case StrategyIds.ColumnChooserStrategyId:
            return ColumnChooserGlyph
        case StrategyIds.ColumnFilterStrategyId:
            return ColumnFilterGlyph
        case StrategyIds.ColumnInfoStrategyId:
            return ColumnInfoGlyph
        case StrategyIds.ConditionalStyleStrategyId:
            return ConditionalStyleGlyph
        case StrategyIds.CustomSortStrategyId:
            return CustomSortGlyph
        case StrategyIds.DataManagementStrategyId:
            return DataManagementGlyph;
        case StrategyIds.ExportStrategyId:
            return ExportGlyph
        case StrategyIds.FlashingCellsStrategyId:
            return FlashingCellGlyph
        case StrategyIds.FormatColumnStrategyId:
            return FormatColumnGlyph
        case StrategyIds.LayoutStrategyId:
            return LayoutGlyph
        case StrategyIds.PlusMinusStrategyId:
            return PlusMinusGlyph
        case StrategyIds.QuickSearchStrategyId:
            return QuickSearchGlyph
        case StrategyIds.ShortcutStrategyId:
            return ShortcutGlyph
        case StrategyIds.SelectColumnStrategyId:
            return SelectColumnGlyph
        case StrategyIds.SelectedCellsStrategyId:
            return SelectedCellsGlyph
        case StrategyIds.SmartEditStrategyId:
            return SmartEditGlyph
        case StrategyIds.TeamSharingStrategyId:
            return TeamSharingGlyph;
        case StrategyIds.ThemeStrategyId:
            return ThemeGlyph;
        case StrategyIds.UserFilterStrategyId:
            return UserFilterGlyph;

    }
}