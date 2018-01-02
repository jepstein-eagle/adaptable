
// General Enums
// should really rename this DataType
export enum DataType {
    String,
    Number,
    Boolean,
    Date,
    Object
}

export enum ExpressionMode {
    SingleColumn,
    MultiColumn
}

export enum LeafExpressionOperator {
    Unknown,
    //Numeric and Date
    GreaterThan,
    LessThan,
    Equals,
    NotEquals,
    GreaterThanOrEqual,
    LessThanOrEqual,
    Between,
    //String
    Contains,
    StartsWith,
    EndsWith,
    Regex,
    // Cell Validations
    None,
    ValueChange,
    PercentChange,
    NotBetween,
    IsPositive,
    IsNegative,
    IsTrue,
    IsFalse
}

export enum MenuType {
    ConfigurationPopup,
    ActionPopup,
    ReduxAction
}

export enum PopoverType {
    Info,
    Warning,
    Error
}

// Enums used in Strategies
export enum SmartEditOperation {
    Add,
    Multiply,
    Replace
}

export enum ShortcutAction {
    Add = "Add",
    Subtract = "Subtract",
    Multiply = "Multiply",
    Divide = "Divide",
    Replace = "Replace"
}

export enum ConditionalStyleScope {
    Column,
    Row
}

export enum RangeScope {
    AllColumns,
    SelectedColumns
}

export enum ExportDestination {
    CSV,
    // JSON,    
    Clipboard,
    OpenfinExcel,
    iPushPull
    // Excel,
    // Symphony
}

export enum SortOrder {
    Unknown,
    Ascending,
    Descending
}

export enum QuickSearchDisplayType {
    ColourCell,
    ShowRow,
    ShowRowAndColourCell
}

export enum AuditLogTrigger {
    CellEdit,
    StateChange,
    AdaptableBlotterFunction,
    Ping
}

export enum CellValidationMode {
    Warning,
    Prevent
}

export enum SelectionMode {
    Multi,
    Single
}

//make sure enum items match IRawValueDisplayValuePair
export enum DistinctCriteriaPairValue {
    RawValue,
    DisplayValue
}

export enum FontWeight {
    Normal,
    Bold
}

export enum FontStyle {
    Normal,
    Italic
}

export enum FontSize {
    XSmall,
    Small,
    Medium,
    Large,
    XLarge
}

