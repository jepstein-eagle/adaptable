export enum SmartEditOperation {
    Sum,
    Ratio,
    Absolute
}

export enum ColumnType {
    String,
    Number,
    Boolean,
    Date,
    Object
}

export enum ShortcutAction {
    Add,
    Subtract,
    Multiply,
    Divide,
    Replace
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

export enum FlashingCellDuration {
    OneQuarterSecond,
    HalfSecond,
    ThreeQuarterSecond,
    Second
}

export enum ConditionalStyleScope {
    Column,
    Row
}

export enum ConditionalStyleColour {
    Red,
    Green,
    Blue,
    Yellow,
    Orange,
    Purple,
    Pink,
    GreenFont,
    RedFont
}

