
// General Enums
// should really rename this DataType
export enum ColumnType {
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
    Configuration,
    Action
}

export enum PopoverType {
    Info,
    Warning,
    Error
}

// Enums used in Strategies
export enum SmartEditOperation {
    Sum,
    Ratio,
    Absolute
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

export enum SortOrder {
    Unknown,
    Ascending,
    Descending
}

export enum QuickSearchDisplayType {
    HideNonMatchingRow,
    ColourCell,
    HideRowAndColourCell

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
