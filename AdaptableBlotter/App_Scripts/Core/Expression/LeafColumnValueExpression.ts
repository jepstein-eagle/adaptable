import { IExpression } from '../Interface/IExpression';
import { LeafExpressionOperator } from '../Enums';

//tODO : need to handle type and shit correctly
export class LeafColumnValueExpression implements IExpression {
    constructor(private columnIdentifier: string, private leafExpressionOperator: LeafExpressionOperator, private valueOperand: any) {
    }

    public IsSatisfied(getColumnValue: (columnName: string) => any, getDisplayColumnValue: (columnName: string) => string): boolean {
        switch (this.leafExpressionOperator) {
            case LeafExpressionOperator.GreaterThan:
                return getColumnValue(this.columnIdentifier) > this.valueOperand;
            case LeafExpressionOperator.LessThan:
                return getColumnValue(this.columnIdentifier) < this.valueOperand;
            case LeafExpressionOperator.Equals:
                return getColumnValue(this.columnIdentifier) == this.valueOperand;
            case LeafExpressionOperator.NotEquals:
                return getColumnValue(this.columnIdentifier) != this.valueOperand;
            case LeafExpressionOperator.GreaterThanOrEquals:
                return getColumnValue(this.columnIdentifier) >= this.valueOperand;
            case LeafExpressionOperator.LessThanOrEquals:
                return getColumnValue(this.columnIdentifier) <= this.valueOperand;
            case LeafExpressionOperator.Contains:
                return getColumnValue(this.columnIdentifier).indexOf(this.valueOperand) >= 0;
            case LeafExpressionOperator.StartsWith:
                return getColumnValue(this.columnIdentifier).indexOf(this.valueOperand) == 0;
            default:
                return false;
        }
    }

    public ToFriendlyString(): string {
        return "([" + this.columnIdentifier + "]" + " " + LeafExpressionOperator[this.leafExpressionOperator] + " " + this.valueOperand.toString() + ")"
    }
}