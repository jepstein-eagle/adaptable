
// General Enums
// should really rename this DataType
export enum DataType {
    String,
    Number,
    Boolean,
    Date,
    Object
}

export enum BooleanOperator {
    And,
    Or,
    Not
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
    Add,
    Subtract,
    Multiply,
    Divide,
    Replace
}

export enum ConditionalStyleScope {
    Column,
    Row
}

export enum RangeScope {
    AllColumns,
    SelectedColumns
}

export enum RangeExportDestination {
    CSV,
    JSON,
    Clipboard,
    Excel,
    Symphony
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


// not sure about this...
export enum NotificationType {
    CellUpdated,
    CellEdited,
    UserDataEdited,
    FunctionExecuted
}

export enum CellChangeType {
    Any,
    Equals,
    NotEquals,
    GreaterThan,
    LessThan,
    NotBetween,
    ValueChange,
    PercentChange
}


export enum PopupType {
    DisappearAutomatically,
    ManualClose
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

