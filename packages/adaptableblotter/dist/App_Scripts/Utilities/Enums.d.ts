export declare enum DataType {
    String = "String",
    Number = "Number",
    Boolean = "Boolean",
    Date = "Date",
    Object = "Object",
    All = "All",
    Unknown = "Unknown"
}
export declare enum ExpressionMode {
    SingleColumn = "SingleColumn",
    MultiColumn = "MultiColumn"
}
export declare enum AccessLevel {
    ReadOnly = "ReadOnly",
    Hidden = "Hidden",
    Full = "Full"
}
export declare enum LeafExpressionOperator {
    Unknown = "Unknown",
    GreaterThan = "GreaterThan",
    LessThan = "LessThan",
    Equals = "Equals",
    NotEquals = "NotEquals",
    GreaterThanOrEqual = "GreaterThanOrEqual",
    LessThanOrEqual = "LessThanOrEqual",
    Between = "Between",
    Contains = "Contains",
    NotContains = "NotContains",
    StartsWith = "StartsWith",
    EndsWith = "EndsWith",
    Regex = "Regex",
    None = "None",
    ValueChange = "ValueChange",
    PercentChange = "PercentChange",
    NotBetween = "NotBetween",
    IsPositive = "IsPositive",
    IsNegative = "IsNegative",
    IsNotNumber = "IsNotNumber",
    IsTrue = "IsTrue",
    IsFalse = "IsFalse",
    NoDuplicates = "NoDuplicates",
    PrimaryKeyDuplicate = "PrimaryKeyDuplicate"
}
export declare enum MathOperation {
    Add = "Add",
    Subtract = "Subtract",
    Multiply = "Multiply",
    Divide = "Divide",
    Replace = "Replace"
}
export declare enum ActionMode {
    WarnUser = "Warn User",
    StopEdit = "Stop Edit"
}
export declare enum LayoutSource {
    Existing = "Existing",
    New = "New"
}
export declare enum ConditionalStyleScope {
    Column = "Column",
    Row = "Row",
    ColumnCategory = "ColumnCategory"
}
export declare enum ReportColumnScope {
    AllColumns = "AllColumns",
    VisibleColumns = "VisibleColumns",
    SelectedColumns = "SelectedColumns",
    BespokeColumns = "BespokeColumns"
}
export declare enum ReportRowScope {
    AllRows = "AllRows",
    VisibleRows = "VisibleRows",
    SelectedRows = "SelectedRows",
    ExpressionRows = "ExpressionRows"
}
export declare enum ExportDestination {
    CSV = "CSV",
    Clipboard = "Clipboard",
    OpenfinExcel = "OpenfinExcel",
    iPushPull = "iPushPull"
}
export declare enum SortOrder {
    Unknown = "Unknown",
    Ascending = "Ascending",
    Descending = "Descending"
}
export declare enum DisplayAction {
    HighlightCell = "HighlightCell",
    ShowRow = "ShowRow",
    ShowRowAndHighlightCell = "ShowRowAndHighlightCell"
}
export declare enum AuditLogTrigger {
    CellEdit = "CellEdit",
    StateChange = "StateChange",
    AdaptableBlotterFunction = "AdaptableBlotterFunction",
    Ping = "Ping"
}
export declare enum RangeOperandType {
    Column = "Column",
    Value = "Value"
}
export declare enum SelectionMode {
    Multi = "Multi",
    Single = "Single"
}
export declare enum DistinctCriteriaPairValue {
    RawValue = "RawValue",
    DisplayValue = "DisplayValue"
}
export declare enum FontWeight {
    Normal = "Normal",
    Bold = "Bold"
}
export declare enum FontStyle {
    Normal = "Normal",
    Italic = "Italic"
}
export declare enum FontSize {
    XSmall = "XSmall",
    Small = "Small",
    Medium = "Medium",
    Large = "Large",
    XLarge = "XLarge"
}
export declare enum PanelWidth {
    Wide = "800px",
    Medium = "600px",
    Narrow = "400px"
}
export declare enum QueryBuildStatus {
    SelectFirstColumn = 0,
    SelectFurtherColumn = 1,
    ColumnSelected = 2,
    SingleConditionsAdded = 3,
    MultipleConditionsAdded = 4
}
export declare enum SearchChangedTrigger {
    DataSource = "DataSource",
    AdvancedSearch = "AdvancedSearch",
    QuickSearch = "QuickSearch",
    ColumnFilter = "ColumnFilter",
    UserFilter = "UserFilter",
    DataChange = "DataChange",
    Sort = "Sort"
}
export declare enum StateChangedTrigger {
    AdvancedSearch = "AdvancedSearch",
    Alert = "Alert",
    BulkUpdate = "BulkUpdate",
    CalculatedColumn = "CalculatedColumn",
    Calendar = "Calendar",
    CellValidation = "CellValidation",
    PercentBar = "PercentBar",
    Chart = "Chart",
    ColumnFilter = "ColumnFilter",
    ConditionalStyle = "ConditionalStyle",
    CustomSort = "CustomSort",
    Dashboard = "Dashboard",
    DataSource = "DataSource",
    Export = "Export",
    FlashingCell = "FlashingCell",
    FormatColumn = "FormatColumn",
    FreeTextColumn = "FreeTextColumn",
    Layout = "Layout",
    ColumnCategory = "ColumnCategory",
    PlusMinus = "PlusMinus",
    QuickSearch = "QuickSearch",
    CellSummary = "CellSummary",
    Shortcut = "Shortcut",
    SmartEdit = "SmartEdit",
    Theme = "Theme",
    UserFilter = "UserFilter"
}
export declare enum Visibility {
    Minimised = "Minimised",
    Visible = "Visible",
    Hidden = "Hidden"
}
export declare enum QueryTab {
    ColumnValue = "ColumnValue",
    Filter = "Filter",
    Range = "Range"
}
export declare enum ContextMenuTab {
    Menu = "Menu",
    Filter = "Filter"
}
export declare enum StatusColour {
    Red = "Red",
    Amber = "Amber",
    Green = "Green",
    Blue = "Blue"
}
export declare enum MessageType {
    Info = "Info",
    Success = "Success",
    Warning = "Warning",
    Error = "Error"
}
export declare enum CellSumaryOperation {
    Sum = "Sum",
    Average = "Average",
    Median = "Median",
    Distinct = "Distinct",
    Max = "Max",
    Min = "Min",
    Count = "Count"
}
export declare enum CellSumaryOptionalOperation {
    Only = "Only",
    VWAP = "VWAP"
}
export declare enum PinnedColumnDirection {
    Left = "Leftt",
    Right = "Right"
}
export declare enum FilterOnDataChangeOptions {
    Always = "Always",
    Never = "Never",
    Throttle = "Throttle"
}
export declare enum LicenceType {
    Community = "Community",
    Standard = "Standard",
    Enterprise = "Enterprise"
}
