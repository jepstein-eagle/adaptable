import * as StrategyIds from './StrategyIds';


export const AdvancedSearchGlyph: string = "search"
export const CalculatedColumnGlyph: string = "th-list"
export const CalendarGlyph: string = "calendar"
export const CellValidationGlyph: string = "flag"
export const ColumnChooserGlyph: string = "list-alt"
export const ColumnInfoGlyph: string = "stats"
export const ConditionalStyleGlyph: string = "tint"
export const CustomSortGlyph: string = "sort-by-attributes"
export const DashboardGlyph: string = "dashboard"
export const ExportGlyph: string = "export"
export const ColumnFilterGlyph: string = "filter"
export const UserFilterGlyph: string = "user"
export const FormatColumnGlyph: string = "picture"
export const FlashingCellGlyph: string = "flash"
export const LayoutGlyph: string = "th"
export const PlusMinusGlyph: string = "plus-sign"
export const QuickSearchGlyph: string = "eye-open"
export const ShortcutGlyph: string = "road"
export const SmartEditGlyph: string = "pencil"
export const TeamSharingGlyph: string = "share"
export const ThemeGlyph: string = "leaf"

export function getGhyphiconForStrategy(strategyID: string) {
    switch (strategyID) {
        case StrategyIds.AdvancedSearchStrategyId:
            return AdvancedSearchGlyph
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
        case StrategyIds.FormatColumnStrategyId:
            return FormatColumnGlyph
        case StrategyIds.LayoutStrategyId:
            return LayoutGlyph
        case StrategyIds.PlusMinusStrategyId:
            return PlusMinusGlyph
        case StrategyIds.ShortcutStrategyId:
            return ShortcutGlyph
        case StrategyIds.UserFilterStrategyId:
            return UserFilterGlyph;

    }
}