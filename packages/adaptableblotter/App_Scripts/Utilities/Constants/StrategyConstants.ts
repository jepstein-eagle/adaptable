// Strategy Ids
export const AdvancedSearchStrategyId: string = 'AdvancedSearch';
export const AlertStrategyId: string = 'Alert';
export const ApplicationStrategyId: string = 'Application';
export const BulkUpdateStrategyId: string = 'BulkUpdate';
export const CalculatedColumnStrategyId: string = 'CalculatedColumn';
export const CalendarStrategyId: string = 'Calendar';
export const CellSummaryStrategyId: string = 'CellSummary';
export const CellValidationStrategyId: string = 'CellValidation';
export const ChartStrategyId: string = 'Chart';
export const ColumnCategoryStrategyId: string = 'ColumnCategory';
export const ColumnChooserStrategyId: string = 'ColumnChooser';
export const ColumnFilterStrategyId: string = 'ColumnFilter';
export const ColumnInfoStrategyId: string = 'ColumnInfo';
export const ConditionalStyleStrategyId: string = 'ConditionalStyle';
export const CustomSortStrategyId: string = 'CustomSort';
export const DashboardStrategyId: string = 'Dashboard';
export const DataSourceStrategyId: string = 'DataSource';
export const ExportStrategyId: string = 'Export';
export const FlashingCellsStrategyId: string = 'FlashingCells';
export const UpdatedRowStrategyId: string = 'Updated Row';
export const FormatColumnStrategyId: string = 'FormatColumn';
export const FreeTextColumnStrategyId: string = 'FreeTextColumn';
export const HomeStrategyId: string = 'Home';
export const LayoutStrategyId: string = 'Layout';
export const PercentBarStrategyId: string = 'PercentBar';
export const SparklineColumnStrategyId: string = 'SparklineColumn';
export const SparklineStrategyId: string = 'Sparkline';
export const PieChartStrategyId: string = 'PieChart';
export const PlusMinusStrategyId: string = 'PlusMinus';
export const QuickSearchStrategyId: string = 'QuickSearch';
export const ReminderStrategyId: string = 'Reminder';
export const ShortcutStrategyId: string = 'Shortcut';
export const SmartEditStrategyId: string = 'SmartEdit';
export const StateManagementStrategyId: string = 'StateManagement';
export const TeamSharingStrategyId: string = 'TeamSharing';
export const ThemeStrategyId: string = 'Theme';
export const UserFilterStrategyId: string = 'UserFilter';

// Strategy Names
export const AdvancedSearchStrategyName: string = 'Advanced Search';
export const AlertStrategyName: string = 'Alert';
export const ApplicationStrategyName: string = 'Application';
export const BulkUpdateStrategyName: string = 'Bulk Update';
export const CalculatedColumnStrategyName: string = 'Calculated Column';
export const CalendarStrategyName: string = 'Calendar';
export const CellSummaryStrategyName: string = 'Cell Summary';
export const CellValidationStrategyName: string = 'Cell Validation';
export const ChartStrategyName: string = 'Chart';
export const ColumnCategoryStrategyName: string = 'Column Category';
export const ColumnChooserStrategyName: string = 'Column Chooser';
export const ColumnFilterStrategyName: string = 'Column Filter';
export const ColumnInfoStrategyName: string = 'Column Information';
export const ConditionalStyleStrategyName: string = 'Conditional Style';
export const CustomSortStrategyName: string = 'Custom Sort';
export const DashboardStrategyName: string = 'Dashboard';
export const DataSourceStrategyName: string = 'Data Source';
export const ExportStrategyName: string = 'Export';
export const FlashingCellsStrategyName: string = 'Flashing Cells';
export const UpdatedRowStrategyName: string = 'Updated Row';
export const FormatColumnStrategyName: string = 'Format Column';
export const FreeTextColumnStrategyName: string = 'Free Text Column';
export const LayoutStrategyName: string = 'Layout';
export const PercentBarStrategyName: string = 'Percent Bar';
export const SparklineColumnStrategyName: string = 'Sparkline Column';
export const SparklineStrategyName: string = 'Sparkline';
export const PieChartStrategyName: string = 'Pie Chart';
export const PlusMinusStrategyName: string = 'Plus Minus';
export const QuickSearchStrategyName: string = 'Quick Search';
export const ReminderStrategyName: string = 'Reminder';
export const ShortcutStrategyName: string = 'Shortcut';
export const SmartEditStrategyName: string = 'Smart Edit';
export const StateManagementStrategyName: string = 'Manage State';
export const TeamSharingStrategyName: string = 'Team Sharing';
export const ThemeStrategyName: string = 'Theme';
export const UserFilterStrategyName: string = 'User Filter';

// Strategy Glyphs
export const AdvancedSearchGlyph: string = 'advanced-search';
export const AlertGlyph: string = 'alert';
export const ApplicationGlyph: string = 'application';
export const BulkUpdateGlyph: string = 'bulk-update';
export const CalculatedColumnGlyph: string = 'phone-setup';
export const CalendarGlyph: string = 'calendar';
export const CellSummaryGlyph: string = 'cell-summary';
export const CellValidationGlyph: string = 'flag';
export const ChartGlyph: string = 'chart';
export const ColumnCategoryGlyph: string = 'table-chart';
export const ColumnChooserGlyph: string = 'view-columns';
export const ColumnFilterGlyph: string = 'column-filter';
export const ColumnInfoGlyph: string = 'column-info';
export const ConditionalStyleGlyph: string = 'conditional-style';
export const CustomSortGlyph: string = 'swap-vert';
export const DashboardGlyph: string = 'dashboard';
export const DataSourceGlyph: string = 'data-source';
export const ExportGlyph: string = 'export';
export const FlashingCellGlyph: string = 'flash';
export const UpdatedRowGlyph: string = 'system-update';
export const FormatColumnGlyph: string = 'color-lens';
export const FreeTextColumnGlyph: string = 'short-text';
export const FunctionsGlyph: string = 'home';
export const LayoutGlyph: string = 'layout';
export const PercentBarGlyph: string = 'linear-scale';
export const SparklineColumnGlyph: string = 'linear-scale';
export const SparklinesGlyph: string = 'linear-scale';
export const PieChartGlyph: string = 'pie-chart';
export const PlusMinusGlyph: string = 'add-circle';
export const QuickSearchGlyph: string = 'quick-search';
export const ReminderGlyph: string = 'alarm';
export const ShortcutGlyph: string = 'link';
export const SmartEditGlyph: string = 'smart-edit';
export const StateManagementGlyph: string = 'assignment';
export const TeamSharingGlyph: string = 'share';
export const ThemeGlyph: string = 'theme';
export const UserFilterGlyph: string = 'person';

export function getIdForStrategyName(strategyName: string) {
  switch (strategyName) {
    case AdvancedSearchStrategyName:
      return AdvancedSearchStrategyId;
    case AlertStrategyName:
      return AlertStrategyId;
    case ApplicationStrategyName:
      return ApplicationStrategyId;
    case BulkUpdateStrategyName:
      return BulkUpdateStrategyId;
    case CalculatedColumnStrategyName:
      return CalculatedColumnStrategyId;
    case CalendarStrategyName:
      return CalendarStrategyId;
    case CellValidationStrategyName:
      return CellValidationStrategyId;
    case ChartStrategyName:
      return ChartStrategyId;
    case ColumnCategoryStrategyName:
      return ColumnCategoryStrategyId;
    case ColumnChooserStrategyName:
      return ColumnChooserStrategyId;
    case ColumnFilterStrategyName:
      return ColumnFilterStrategyId;
    case ColumnInfoStrategyName:
      return ColumnInfoStrategyId;
    case ConditionalStyleStrategyName:
      return ConditionalStyleStrategyId;
    case CustomSortStrategyName:
      return CustomSortStrategyId;
    case DashboardStrategyName:
      return DashboardStrategyId;
    case DataSourceStrategyName:
      return DataSourceStrategyId;
    case ExportStrategyName:
      return ExportStrategyId;
    case FlashingCellsStrategyName:
      return FlashingCellsStrategyId;
    case FormatColumnStrategyName:
      return FormatColumnStrategyId;
    case FreeTextColumnStrategyName:
      return FreeTextColumnStrategyId;
    case LayoutStrategyName:
      return LayoutStrategyId;
    case PercentBarStrategyName:
      return PercentBarStrategyId;
    case SparklineColumnStrategyName:
      return SparklineColumnStrategyId;
    case SparklineStrategyName:
      return SparklineStrategyId;
    case PieChartStrategyName:
      return PieChartStrategyId;
    case PlusMinusStrategyName:
      return PlusMinusStrategyId;
    case QuickSearchStrategyName:
      return QuickSearchStrategyId;
    case ReminderStrategyName:
      return ReminderStrategyId;
    case CellSummaryStrategyName:
      return CellSummaryStrategyId;
    case ShortcutStrategyName:
      return ShortcutStrategyId;
    case SmartEditStrategyName:
      return SmartEditStrategyId;
    case StateManagementStrategyName:
      return StateManagementStrategyId;
    case TeamSharingStrategyName:
      return TeamSharingStrategyId;
    case ThemeStrategyName:
      return ThemeStrategyId;
    case UserFilterStrategyName:
      return UserFilterStrategyId;
  }
}

export function getNameForStrategyId(strategyID: string) {
  switch (strategyID) {
    case AdvancedSearchStrategyId:
      return AdvancedSearchStrategyName;
    case AlertStrategyId:
      return AlertStrategyName;
    case ApplicationStrategyId:
      return ApplicationStrategyName;
    case BulkUpdateStrategyId:
      return BulkUpdateStrategyName;
    case CalculatedColumnStrategyId:
      return CalculatedColumnStrategyName;
    case CalendarStrategyId:
      return CalendarStrategyName;
    case CellValidationStrategyId:
      return CellValidationStrategyName;
    case ChartStrategyId:
      return ChartStrategyName;
    case ColumnCategoryStrategyId:
      return ColumnCategoryStrategyName;
    case ColumnChooserStrategyId:
      return ColumnChooserStrategyName;
    case ColumnFilterStrategyId:
      return ColumnFilterStrategyName;
    case ColumnInfoStrategyId:
      return ColumnInfoStrategyName;
    case ConditionalStyleStrategyId:
      return ConditionalStyleStrategyName;
    case CustomSortStrategyId:
      return CustomSortStrategyName;
    case DashboardStrategyId:
      return DashboardStrategyName;
    case DataSourceStrategyId:
      return DataSourceStrategyName;
    case ExportStrategyId:
      return ExportStrategyName;
    case FlashingCellsStrategyId:
      return FlashingCellsStrategyName;
    case FormatColumnStrategyId:
      return FormatColumnStrategyName;
    case FreeTextColumnStrategyId:
      return FreeTextColumnStrategyName;
    case LayoutStrategyId:
      return LayoutStrategyName;
    case PercentBarStrategyId:
      return PercentBarStrategyName;
    case SparklineStrategyId:
      return SparklineStrategyName;
    case SparklineColumnStrategyId:
      return SparklineColumnStrategyName;
    case PieChartStrategyId:
      return PieChartStrategyName;
    case PlusMinusStrategyId:
      return PlusMinusStrategyName;
    case QuickSearchStrategyId:
      return QuickSearchStrategyName;
    case QuickSearchStrategyId:
      return ReminderStrategyName;
    case ReminderStrategyId:
      return ReminderStrategyName;
    case CellSummaryStrategyId:
      return CellSummaryStrategyName;
    case ShortcutStrategyId:
      return ShortcutStrategyName;
    case SmartEditStrategyId:
      return SmartEditStrategyName;
    case StateManagementStrategyId:
      return StateManagementStrategyName;
    case TeamSharingStrategyId:
      return TeamSharingStrategyName;
    case ThemeStrategyId:
      return ThemeStrategyName;
    case UserFilterStrategyId:
      return UserFilterStrategyName;
  }
}

export function getGhyphiconForStrategyId(strategyID: string) {
  switch (strategyID) {
    case AdvancedSearchStrategyId:
      return AdvancedSearchGlyph;
    case AlertStrategyId:
      return AlertGlyph;
    case ApplicationStrategyId:
      return ApplicationGlyph;
    case BulkUpdateStrategyId:
      return BulkUpdateGlyph;
    case CalculatedColumnStrategyId:
      return CalculatedColumnGlyph;
    case CalendarStrategyId:
      return CalendarGlyph;
    case CellValidationStrategyId:
      return CellValidationGlyph;
    case ChartStrategyId:
      return ChartGlyph;
    case ColumnCategoryStrategyId:
      return ColumnCategoryGlyph;
    case ColumnChooserStrategyId:
      return ColumnChooserGlyph;
    case ColumnFilterStrategyId:
      return ColumnFilterGlyph;
    case ColumnInfoStrategyId:
      return ColumnInfoGlyph;
    case ConditionalStyleStrategyId:
      return ConditionalStyleGlyph;
    case CustomSortStrategyId:
      return CustomSortGlyph;
    case ExportStrategyId:
      return ExportGlyph;
    case FlashingCellsStrategyId:
      return FlashingCellGlyph;
    case FormatColumnStrategyId:
      return FormatColumnGlyph;
    case FreeTextColumnStrategyId:
      return FreeTextColumnGlyph;
    case LayoutStrategyId:
      return LayoutGlyph;
    case PercentBarStrategyId:
      return PercentBarGlyph;
    case SparklineStrategyId:
      return SparklinesGlyph;
    case SparklineColumnStrategyId:
      return SparklineColumnGlyph;
    case PieChartStrategyId:
      return PieChartGlyph;
    case PlusMinusStrategyId:
      return PlusMinusGlyph;
    case QuickSearchStrategyId:
      return QuickSearchGlyph;
    case ReminderStrategyId:
      return ReminderGlyph;
    case ShortcutStrategyId:
      return ShortcutGlyph;
    case CellSummaryStrategyId:
      return CellSummaryGlyph;
    case SmartEditStrategyId:
      return SmartEditGlyph;
    case StateManagementStrategyName:
      return StateManagementGlyph;
    case TeamSharingStrategyId:
      return TeamSharingGlyph;
    case ThemeStrategyId:
      return ThemeGlyph;
    case UserFilterStrategyId:
      return UserFilterGlyph;
  }
}
