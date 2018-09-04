
// General Enums


export enum DataType {
    String = 'String',
    Number = 'Number',
    Boolean = 'Boolean',
    Date = 'Date',
    Object = 'Object',
    All = 'All',
    Unknown = 'Unknown'
}

export enum ExpressionMode {
    SingleColumn = 'SingleColumn',
    MultiColumn = 'MultiColumn'
}

export enum LeafExpressionOperator {
    Unknown = 'Unknown',
    //Numeric and Date
    GreaterThan = 'GreaterThan',
    LessThan = 'LessThan',
    Equals = 'Equals',
    NotEquals = 'NotEquals',
    GreaterThanOrEqual = 'GreaterThanOrEqual',
    LessThanOrEqual = 'LessThanOrEqual',
    Between = 'Between',
    //String
    Contains = 'Contains',
    NotContains = 'NotContains',
    StartsWith = 'StartsWith',
    EndsWith = 'EndsWith',
    Regex = 'Regex',
    // Cell Validations
    None = 'None',
    ValueChange = 'ValueChange',
    PercentChange = 'PercentChange',
    NotBetween = 'NotBetween',
    IsPositive = 'IsPositive',
    IsNegative = 'IsNegative',
    IsNotNumber = 'IsNotNumber',
    IsTrue = 'IsTrue',
    IsFalse = 'IsFalse'
}

export enum MathOperation {
    Add = 'Add',
    Subtract = 'Subtract',
    Multiply = 'Multiply',
    Divide = 'Divide',
    Replace = 'Replace'
}

// Enums used in Strategies

export enum ActionMode {
    WarnUser = 'Warn User',
    StopEdit = 'Stop Edit'
}

export enum LayoutSource {
    Existing = 'Existing',
    New = 'New'
}

export enum ConditionalStyleScope {
    Column = 'Column',
    Row = 'Row'
}

export enum ReportColumnScope {
    AllColumns = 'AllColumns',
    VisibleColumns = 'VisibleColumns',
    SelectedColumns = 'SelectedColumns',
    BespokeColumns = 'BespokeColumns'
}


export enum ReportRowScope {
    AllRows = 'AllRows',
    VisibleRows = 'VisibleRows',
    SelectedRows = 'SelectedRows',
    ExpressionRows = 'ExpressionRows'
}

export enum ExportDestination {
    CSV = 'CSV',
    Clipboard = 'Clipboard',
    OpenfinExcel = 'OpenfinExcel',
    iPushPull = 'iPushPull'
}

export enum SortOrder {
    Unknown = 'Unknown',
    Ascending = 'Ascending',
    Descending = 'Descending'
}

export enum DisplayAction {
    HighlightCell = 'HighlightCell',
    ShowRow = 'ShowRow',
    ShowRowAndHighlightCell = 'ShowRowAndHighlightCell'
}

export enum AuditLogTrigger {
    CellEdit = 'CellEdit',
    StateChange = 'StateChange',
    AdaptableBlotterFunction = 'AdaptableBlotterFunction',
    Ping = 'Ping'
}

export enum RangeOperandType {
    Column = "Column",
    Value = "Value"
}

export enum SelectionMode {
    Multi = 'Multi',
    Single = 'Single'
}

//make sure enum items match IRawValueDisplayValuePair
export enum DistinctCriteriaPairValue {
    RawValue = 'RawValue',
    DisplayValue = 'DisplayValue'
}

export enum FontWeight {
    Normal = 'Normal',
    Bold = 'Bold'
}

export enum FontStyle {
    Normal = 'Normal',
    Italic = 'Italic'
}

export enum FontSize {
    XSmall = 'XSmall',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
    XLarge = 'XLarge'
}


export enum PanelWidth {
    Wide = '800px',
    Medium = '600px',
    Narrow = '400px'
}

export enum QueryBuildStatus {
    SelectFirstColumn,
    SelectFurtherColumn,
    ColumnSelected,
    SingleConditionsAdded,
    MultipleConditionsAdded,
}

export enum SearchChangedTrigger {
    DataSource = "DataSource",
    AdvancedSearch = "AdvancedSearch",
    QuickSearch = "QuickSearch",
    ColumnFilter = "ColumnFilter",
    UserFilter = "UserFilter",
    DataChange = "DataChange",
    Sort = "Sort",
}

export enum Visibility {
    Minimised = "Minimised",
    Visible = "Visible",
    Hidden = "Hidden",
}

export enum QueryTab  {
    ColumnValue = "ColumnValue",
    Filter = "Filter",
    Range = "Range",
}

export enum ContextMenuTab  {
    Menu = "Menu",
    Filter = "Filter",
}


export enum StatusColour {
    Red = 'Red',
    Amber = 'Amber',
    Green = 'Green'
}


export enum MessageType {
    Info = 'Info',
    Warning = 'Warning',
    Error = 'Error'
}

export enum SelectedCellOperation{
    Sum='Sum',
    Average='Average',
    Median ='Median',
    Distinct='Distinct',
    Max='Max',
    Min='Min',
    Count = 'Count',
    Only = 'Only',
    VWAP = 'VWAP'
}

export enum ChartType {
    BarChart = 'Bar Chart',
    LineChart = 'Line Chart',
}

export enum PinnedColumnDirection {
    Left = 'Leftt',
    Right = 'Right',
}
