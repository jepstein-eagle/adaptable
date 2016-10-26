import { IExpression } from '../Interface/IExpression';
import { LeafExpressionOperator } from '../Enums';

export class LeafColumnValuesExpression implements IExpression {
    constructor(private columnIdentifier: string, private valueOperand: Array<string>) {
    }

    //TODO : Handle types differently
    public IsSatisfied(getColumnValue: (columnName: string) => any, getDisplayColumnValue: (columnName: string) => string): boolean {
        return this.valueOperand.indexOf(getDisplayColumnValue(this.columnIdentifier))>=0;
    }

    public ToFriendlyString(): string {
        return "([" + this.columnIdentifier + "]" + " In (" + this.valueOperand.join() + ")"
    }
}

// export class LeafDisplayValueExpression implements IExpression {
//     constructor(private columnIdentifier: string, private leafExpressionOperator: LeafExpressionOperator, private valueOperand: string) {
//     }

//     public IsSatisfied(getColumnValue: (columnName: string) => any, getDisplayColumnValue: (columnName: string) => string): boolean {
//         switch (this.leafExpressionOperator) {
//             case LeafExpressionOperator.GreaterThan:
//                 return getDisplayColumnValue(this.columnIdentifier) > this.valueOperand;
//             case LeafExpressionOperator.LessThan:
//                 return getDisplayColumnValue(this.columnIdentifier) < this.valueOperand;
//             case LeafExpressionOperator.Equals:
//                 return getDisplayColumnValue(this.columnIdentifier) == this.valueOperand;
//             case LeafExpressionOperator.NotEquals:
//                 return getDisplayColumnValue(this.columnIdentifier) != this.valueOperand;
//             case LeafExpressionOperator.GreaterThanOrEquals:
//                 return getDisplayColumnValue(this.columnIdentifier) >= this.valueOperand;
//             case LeafExpressionOperator.LessThanOrEquals:
//                 return getDisplayColumnValue(this.columnIdentifier) <= this.valueOperand;
//             case LeafExpressionOperator.Contains:
//                 return getDisplayColumnValue(this.columnIdentifier).indexOf(this.valueOperand) >= 0;
//             case LeafExpressionOperator.StartsWith:
//                 return getDisplayColumnValue(this.columnIdentifier).indexOf(this.valueOperand) == 0;
//             default:
//                 return false;
//         }
//     }

//     public ToFriendlyString(): string {
//         return "([" + this.columnIdentifier + "]" + " " + LeafExpressionOperator[this.leafExpressionOperator] + " " + this.valueOperand.toString() + ")"
//     }
// }