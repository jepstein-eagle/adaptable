/*
This page includes frequently used typed - particularly helpful for State and Api where we can strongly type stuff
*/

/**
 * Adaptable Toolbar collection
 *
 * When setting the `Toolbars` property in `DashboardTab` in Dashboard state, only the Toolbars listed here can be included.
 */
export type AdaptableDashboardToolbars = AdaptableDashboardToolbar[];

/**
 * List of all the Toolbars that Adaptable provides
 */
export type AdaptableDashboardToolbar =
  | 'Query'
  | 'Alert'
  | 'BulkUpdate'
  | 'CellSummary'
  | 'Chart'
  | 'Filter'
  | 'DataSource'
  | 'Export'
  | 'Glue42'
  | 'OpenFin'
  | 'IPushPull'
  | 'Layout'
  | 'QuickSearch'
  | 'SmartEdit'
  | 'SystemStatus'
  | 'Theme';

export type AdaptableToolPanels = AdaptableToolPanel[];

export type AdaptableToolPanel =
  // | 'Query'
  | 'Alert'
  | 'BulkUpdate'
  | 'CellSummary'
  | 'Chart'
  | 'Filter'
  | 'Dashboard'
  | 'Export'
  | 'Layout'
  | 'QuickSearch'
  | 'SmartEdit'
  | 'SystemStatus'
  | 'Theme';

/**
 * Adaptable Function Button collection
 *
 * When setting the VisibleButtons` properties in Dashboard state, only the Function Buttons listed here can be included.
 */
export type AdaptableFunctionButtons = AdaptableFunctionButton[];

/**
 * List of all the Function button that Adaptable provides.
 *
 * Essentially it is a list of all the Functions in Adaptable as each Function has a popup for which this is a shortcut button.
 */
export type AdaptableFunctionButton =
  | 'Query'
  | 'Alert'
  | 'BulkUpdate'
  | 'CalculatedColumn'
  | 'Calendar'
  | 'CellSummary'
  | 'CellValidation'
  | 'Chart'
  | 'Filter'
  | 'ColumnInfo'
  | 'ConditionalStyle'
  | 'CustomSort'
  | 'Dashboard'
  | 'DataSource'
  | 'Export'
  | 'FlashingCells'
  | 'FormatColumn'
  | 'FreeTextColumn'
  | 'Glue42'
  | 'GradientColumn'
  | 'GridInfo'
  | 'Layout'
  | 'OpenFin'
  | 'PercentBar'
  | 'PieChart'
  | 'PlusMinus'
  | 'QuickSearch'
  | 'Reminder'
  | 'Shortcut'
  | 'SmartEdit'
  | 'SparklineColumn'
  | 'Sparkline'
  | 'StateManagement'
  | 'SystemStatus'
  | 'TeamSharing'
  | 'Theme'
  | 'UpdatedRow'
  | 'UserFilter';

export type AdaptableStateKeys = AdaptableStateKey[];

export type AdaptableStateKey =
  | 'ActionColumn'
  | 'Query'
  | 'Alert'
  | 'Application'
  | 'BulkUpdate'
  | 'CalculatedColumn'
  | 'Calendar'
  | 'CellSummary'
  | 'CellValidation'
  | 'Chart'
  | 'ConditionalStyle'
  | 'CustomSort'
  | 'Dashboard'
  | 'DataSource'
  | 'Entitlement'
  | 'Export'
  | 'FlashingCell'
  | 'FormatColumn'
  | 'FreeTextColumn'
  | 'Glue42'
  | 'GradientColumn'
  | 'IPushPull'
  | 'Layout'
  | 'OpenFin'
  | 'PercentBar'
  | 'PlusMinus'
  | 'QuickSearch'
  | 'Schedule'
  | 'Shortcut'
  | 'SmartEdit'
  | 'SparklineColumn'
  | 'Filter'
  | 'SystemStatus'
  | 'Theme'
  | 'ToolPanel'
  | 'UpdatedRow'
  | 'UserFilter'
  | 'UserInterface';

export type AdaptableFunctionName =
  | 'ActionColumn'
  | 'Query'
  | 'Alert'
  | 'BulkUpdate'
  | 'CalculatedColumn'
  | 'Calendar'
  | 'CellSummary'
  | 'CellValidation'
  | 'Chart'
  | 'Filter'
  | 'ColumnInfo'
  | 'ConditionalStyle'
  | 'CustomSort'
  | 'Dashboard'
  | 'DataSource'
  | 'Export'
  | 'FlashingCells'
  | 'FormatColumn'
  | 'FreeTextColumn'
  | 'Glue42'
  | 'GradientColumn'
  | 'GridInfo'
  | 'IPushPull'
  | 'Layout'
  | 'OpenFin'
  | 'PercentBar'
  | 'PieChart'
  | 'PlusMinus'
  | 'QuickSearch'
  | 'Reminder'
  | 'Schedule'
  | 'Shortcut'
  | 'SmartEdit'
  | 'SparklineColumn'
  | 'Sparkline'
  | 'StateManagement'
  | 'SystemStatus'
  | 'TeamSharing'
  | 'Theme'
  | 'ToolPanel'
  | 'UpdatedRow'
  | 'UserFilter';
