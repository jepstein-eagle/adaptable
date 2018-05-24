import * as StrategyIds from './StrategyIds';

export const AboutGlyph: string = "info-sign"
export const ApplicationGlyph: string = "header"
export const AdvancedSearchGlyph: string = "search"
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
export const ExportGlyph: string = "export"
export const FormatColumnGlyph: string = "picture"
export const FlashingCellGlyph: string = "flash"
export const FunctionsGlyph: string = "home"
export const LayoutGlyph: string = "th"
export const PlusMinusGlyph: string = "plus-sign"
export const QuickSearchGlyph: string = "eye-open"
export const ShortcutGlyph: string = "road"
export const SelectColumnGlyph: string = "compressed"
export const SmartEditGlyph: string = "pencil"
export const TeamSharingGlyph: string = "share"
export const ThemeGlyph: string = "leaf"
export const UserFilterGlyph: string = "user"
export const DataManagementGlyph: string = "folder-close"

export function getGhyphiconForStrategy(strategyID: string) {
    switch (strategyID) {
        case StrategyIds.AboutStrategyId:
            return AboutGlyph
        case StrategyIds.AdvancedSearchStrategyId:
            return AdvancedSearchGlyph
        case StrategyIds.BulkUpdateStrategyId:
            return BulkUpdateGlyph
        case StrategyIds.CalculatedColumnStrategyId:
            return CalculatedColumnGlyph
        case StrategyIds.CellValidationStrategyId:
            return CellValidationGlyph
        case StrategyIds.ColumnFilterStrategyId:
            return ColumnFilterGlyph
        case StrategyIds.ConditionalStyleStrategyId:
            return ConditionalStyleGlyph
        case StrategyIds.CustomSortStrategyId:
            return CustomSortGlyph
        case StrategyIds.ExportStrategyId:
            return ExportGlyph
        case StrategyIds.FormatColumnStrategyId:
            return FormatColumnGlyph
        case StrategyIds.LayoutStrategyId:
            return LayoutGlyph
        case StrategyIds.PlusMinusStrategyId:
            return PlusMinusGlyph
        case StrategyIds.ShortcutStrategyId:
            return ShortcutGlyph
        case StrategyIds.SelectColumnStrategyId:
            return SelectColumnGlyph
        case StrategyIds.UserFilterStrategyId:
            return UserFilterGlyph;
        case StrategyIds.DataManagementStrategyId:
            return DataManagementGlyph;

    }
}