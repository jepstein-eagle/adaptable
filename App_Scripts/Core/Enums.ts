
// General Enums
// should really rename this DataType
export enum DataType {
    String = "String",
    Number = "Number",
    Boolean = "Boolean",
    Date = "Date",
    Object = "Object"
}

export enum ExpressionMode {
    SingleColumn = "SingleColumn",
    MultiColumn = "MultiColumn"
}

export enum LeafExpressionOperator {
    Unknown = "Unknown",
    //Numeric and Date
    GreaterThan = "GreaterThan",
    LessThan = "LessThan",
    Equals = "Equals",
    NotEquals = "NotEquals",
    GreaterThanOrEqual = "GreaterThanOrEqual",
    LessThanOrEqual = "LessThanOrEqual",
    Between = "Between",
    //String
    Contains = "Contains",
    StartsWith = "StartsWith",
    EndsWith = "EndsWith",
    Regex = "Regex",
    // Cell Validations
    None = "None",
    ValueChange = "ValueChange",
    PercentChange = "PercentChange",
    NotBetween = "NotBetween",
    IsPositive = "IsPositive",
    IsNegative = "IsNegative",
    IsTrue = "IsTrue",
    IsFalse = "IsFalse"
}

export enum MenuType {
    ConfigurationPopup = "ConfigurationPopup",
    ActionPopup = "ActionPopup",
    ReduxAction = "ReduxAction"
}

export enum PopoverType {
    Info = "Info",
    Warning = "Warning",
    Error = "Error"
}

// Enums used in Strategies
export enum SmartEditOperation {
    Add = "Add",
    Multiply = "Multiply",
    Replace = "Replace"
}

export enum ShortcutAction {
    Add = "Add",
    Subtract = "Subtract",
    Multiply = "Multiply",
    Divide = "Divide",
    Replace = "Replace"
}

export enum ConditionalStyleScope {
    Column = "Column",
    Row = "Row"
}

export enum RangeScope {
    AllColumns = "AllColumns",
    SelectedColumns = "SelectedColumns"
}

export enum ExportDestination {
    CSV = "CSV",
    Clipboard = "Clipboard",
    OpenfinExcel = "OpenfinExcel",
    iPushPull = "iPushPull"
}

export enum SortOrder {
    Unknown = "Unknown",
    Ascending = "Ascending",
    Descending = "Descending"
}

export enum QuickSearchDisplayType {
    ColourCell = "ColourCell",
    ShowRow = "ShowRow",
    ShowRowAndColourCell = "ShowRowAndColourCell"
}

export enum AuditLogTrigger {
    CellEdit = "CellEdit",
    StateChange = "StateChange",
    AdaptableBlotterFunction = "AdaptableBlotterFunction",
    Ping = "Ping"
}

export enum CellValidationMode {
    Warning = "Warning",
    Prevent = "Prevent"
}

export enum SelectionMode {
    Multi = "Multi",
    Single = "Single"
}

//make sure enum items match IRawValueDisplayValuePair
export enum DistinctCriteriaPairValue {
    RawValue = "RawValue",
    DisplayValue = "DisplayValue"
}

export enum FontWeight {
    Normal = "Normal",
    Bold = "Bold"
}

export enum FontStyle {
    Normal = "Normal",
    Italic = "Italic"
}

export enum FontSize {
    XSmall = "XSmall",
    Small = "Small",
    Medium = "Medium",
    Large = "Large",
    XLarge = "XLarge"
}

