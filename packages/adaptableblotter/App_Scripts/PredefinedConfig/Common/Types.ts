/*
This page includes frequently used typed - particularly helpful for State and API where we can strongly type stuff
*/

/**
 * The Adaptable Blotter Toolbar collection
 *
 * When setting the `AvailableToolbars` or `VisibleToolbars` properties in Dashboard state, only the Toolbars listed here can be included.
 */
export type AdaptableDashboardToolbars = AdaptableDashboardToolbar[];

/**
 * List of all the Toolbars that the Adaptable Blotter provides
 */
export type AdaptableDashboardToolbar =
  | 'AdvancedSearch'
  | 'Alert'
  | 'Application'
  | 'BulkUpdate'
  | 'CellSummary'
  | 'Chart'
  | 'ColumnFilter'
  | 'Export'
  | 'Layout'
  | 'SmartEdit'
  | 'QuickSearch'
  | 'SystemStatus'
  | 'Theme';

export type AdaptableToolPanels = AdaptableToolPanel[];

export type AdaptableToolPanel =
  | 'AdvancedSearch'
  | 'Alert'
  | 'BulkUpdate'
  | 'CellSummary'
  | 'Chart'
  | 'ColumnFilter'
  | 'Dashboard'
  | 'Export'
  | 'Layout'
  | 'QuickSearch'
  | 'SmartEdit'
  | 'SystemStatus'
  | 'Theme';

/**
 * The Adaptable Function Button collection
 *
 * When setting the VisibleButtons` properties in Dashboard state, only the Function Buttons listed here can be included.
 */
export type AdaptableFunctionButtons = AdaptableFunctionButton[];

/**
 * List of all the Function button that the Adaptable Blotter provides.
 *
 * Essentially it is a list of all the Functions in the Adaptable Blotter as each Function has a popup for which this is a shortcut button.
 */
export type AdaptableFunctionButton =
  | 'AdvancedSearch'
  | 'Alert'
  | 'Application'
  | 'BulkUpdate'
  | 'CalculatedColumn'
  | 'Calendar'
  | 'CellSummary'
  | 'CellValidation'
  | 'Chart'
  | 'ColumnCategory'
  | 'ColumnChooser'
  | 'ColumnFilter'
  | 'ColumnInfo'
  | 'ConditionalStyle'
  | 'CustomSort'
  | 'Dashboard'
  | 'DataSource'
  | 'Export'
  | 'FlashingCells'
  | 'FormatColumn'
  | 'FreeTextColumn'
  | 'Home'
  | 'Layout'
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
  | 'AdvancedSearch'
  | 'Alert'
  | 'Application'
  | 'BulkUpdate'
  | 'CalculatedColumn'
  | 'Calendar'
  | 'CellSummary'
  | 'CellValidation'
  | 'Chart'
  | 'ColumnCategory'
  | 'ColumnFilter'
  | 'ConditionalStyle'
  | 'CustomSort'
  | 'Dashboard'
  | 'DataSource'
  | 'Entitlement'
  | 'Export'
  | 'FlashingCell'
  | 'FormatColumn'
  | 'FreeTextColumn'
  | 'Layout'
  | 'NamedFilter'
  | 'Partner'
  | 'PercentBar'
  | 'PlusMinus'
  | 'QuickSearch'
  | 'Reminder'
  | 'Shortcut'
  | 'SmartEdit'
  | 'SparklineColumn'
  | 'SystemFilter'
  | 'SystemStatus'
  | 'TeamSharing'
  | 'Theme'
  | 'ToolPanel'
  | 'UpdatedRow'
  | 'UserFilter'
  | 'UserInterface';

export type AdaptableFunctionName =
  | 'ActionColumn'
  | 'AdvancedSearch'
  | 'Alert'
  | 'Application'
  | 'BulkUpdate'
  | 'CalculatedColumn'
  | 'Calendar'
  | 'CellSummary'
  | 'CellValidation'
  | 'Chart'
  | 'ColumnCategory'
  | 'ColumnChooser'
  | 'ColumnFilter'
  | 'ColumnInfo'
  | 'ConditionalStyle'
  | 'CustomSort'
  | 'Dashboard'
  | 'DataSource'
  | 'Export'
  | 'FlashingCells'
  | 'FormatColumn'
  | 'FreeTextColumn'
  | 'Home'
  | 'Layout'
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
