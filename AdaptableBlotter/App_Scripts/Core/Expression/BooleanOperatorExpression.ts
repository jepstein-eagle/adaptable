import { IExpression } from '../Interface/IExpression';
import { BooleanOperator } from '../Enums';
import {EmptyExpression} from './EmptyExpression'

export class BooleanOperatorExpression implements IExpression {
    constructor(private expressionLeft: IExpression, private expressionRight: IExpression, private booleanOperator: BooleanOperator) {
    }

    public IsSatisfied(getColumnValue: (columnName: string) => any, getDisplayColumnValue: (columnName: string) => string): boolean {
        switch (this.booleanOperator) {
            case BooleanOperator.And:
                return this.expressionLeft.IsSatisfied(getColumnValue, getDisplayColumnValue) &&
                    this.expressionRight.IsSatisfied(getColumnValue, getDisplayColumnValue);
            case BooleanOperator.Or:
                return this.expressionLeft.IsSatisfied(getColumnValue, getDisplayColumnValue) ||
                    this.expressionRight.IsSatisfied(getColumnValue, getDisplayColumnValue);
            case BooleanOperator.Not:
                return !this.expressionLeft.IsSatisfied(getColumnValue, getDisplayColumnValue);
        }
        return false;
    }

    public ToFriendlyString(): string {
        if (this.expressionRight) {
            return "(" + this.expressionLeft.ToFriendlyString() + " " + BooleanOperator[this.booleanOperator] + " " + this.expressionRight.ToFriendlyString() + ")";
        }
        else if(this.booleanOperator == BooleanOperator.Not){
            return "(" + BooleanOperator[this.booleanOperator] + " " + this.expressionLeft.ToFriendlyString() + ")";
        }
        else if(this.expressionRight instanceof EmptyExpression)
        {
            return this.expressionLeft.ToFriendlyString();
        }
    }
}


