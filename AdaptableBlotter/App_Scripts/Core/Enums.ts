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
    GreaterThan,
    LessThan,
    Equals,
    NotEquals,
    GreaterThanOrEquals,
    LessThanOrEquals,
    Contains,
    StartsWith,
    Matches
}

export enum FlashingCellDuration{
    OneQuarterSecond,
    HalfSecond,
    ThreeQuarterSecond,
    Second
}

