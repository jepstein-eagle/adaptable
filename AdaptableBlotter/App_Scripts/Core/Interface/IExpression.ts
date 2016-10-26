export interface IExpression {
    IsSatisfied(getColumnValue: (columnName: string) => any, getDisplayColumnValue: (columnName: string) => string) : boolean
    ToFriendlyString() : string
}