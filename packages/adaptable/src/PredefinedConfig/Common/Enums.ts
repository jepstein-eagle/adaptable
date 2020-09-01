// General Enums

export enum DataType {
  String = 'String',
  Number = 'Number',
  NumberArray = 'NumberArray',
  Boolean = 'Boolean',
  Date = 'Date',
  Object = 'Object',
  All = 'All',
  Unknown = 'Unknown',
}

export enum MathOperation {
  Add = 'Add',
  Subtract = 'Subtract',
  Multiply = 'Multiply',
  Divide = 'Divide',
  Replace = 'Replace',
}

// Enums used in Strategies

export enum ActionMode {
  WarnUser = 'Warn User',
  StopEdit = 'Stop Edit',
}

export enum ReportColumnScope {
  AllColumns = 'AllColumns',
  VisibleColumns = 'VisibleColumns',
  SelectedColumns = 'SelectedColumns',
  ScopeColumns = 'ScopeColumns',
  CustomColumns = 'CustomColumns',
}

export enum ReportRowScope {
  AllRows = 'AllRows',
  VisibleRows = 'VisibleRows',
  SelectedCellRows = 'SelectedCellRows',
  SelectedRows = 'SelectedRows',
  ExpressionRows = 'ExpressionRows',
  CustomRows = 'CustomRows',
}

export enum ExportDestination {
  Excel = 'Excel',
  CSV = 'CSV',
  Clipboard = 'Clipboard',
  JSON = 'JSON',
  OpenfinExcel = 'OpenfinExcel',
  Glue42 = 'Glue42',
}

export enum ScheduleType {
  Report = 'Report',
  ipushpull = 'ipushpull',
  Glue42 = 'Glue42',
  Reminder = 'Reminder',
  OpenFin = 'OpenFin',
}

export enum SortOrder {
  Asc = 'Asc',
  Desc = 'Desc',
}

export enum SelectionMode {
  Multi = 'Multi',
  Single = 'Single',
}

// make sure enum items match IRawValueDisplayValuePair
export enum CellValueType {
  RawValue = 'RawValue',
  DisplayValue = 'DisplayValue',
}

export enum FontWeight {
  Normal = 'Normal',
  Bold = 'Bold',
}

export enum FontStyle {
  Normal = 'Normal',
  Italic = 'Italic',
}

export enum FontSize {
  XSmall = 'XSmall',
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  XLarge = 'XLarge',
}

export enum SearchChangedTrigger {
  DataSource = 'DataSource',
  CurrentQuery = 'CurrentQuery',
  Filter = 'Filter',
  DataChange = 'DataChange',
  Sort = 'Sort',
}

export enum ColumnMenuTab {
  Menu = 'Menu',
  Filter = 'Filter',
}

export enum StatusColour {
  Red = 'var(--ab-color-error)',
  Amber = 'var(--ab-color-warn)',
  Green = 'var(--ab-color-success)',
  Blue = 'var(--ab-color-info)',
}

export enum MessageType {
  Info = 'Info',
  Success = 'Success',
  Warning = 'Warning',
  Error = 'Error',
}

export enum CellSummaryOperation {
  Sum = 'Sum',
  Average = 'Average',
  Median = 'Median',
  Mode = 'Mode',
  Distinct = 'Distinct',
  Max = 'Max',
  Min = 'Min',
  Count = 'Count',
}

export enum FilterOnDataChangeOptions {
  Always = 'Always',
  Never = 'Never',
  Throttle = 'Throttle',
}

export enum DayOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}
