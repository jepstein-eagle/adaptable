
// General Enums
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
    EndWith,
    MatchesRegex
}

export enum MenuType{
    Configuration,
    Action
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

export enum CellStyle {
    Red,
    Green,
    LightGreen,
    Blue,
    Yellow,
    LightYellow,
    Orange,
    Purple,
    Pink,
    GreenFont,
    RedFont
}

export enum SearchStringOperator{
    Equals,
    NotEquals,
    Contains,
    StartsWith
}
