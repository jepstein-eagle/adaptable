import { IExpression } from '../Interface/IExpression';
import { EmptyExpression } from './EmptyExpression';

export class Expression implements IExpression {
    constructor(public ColumnValuesExpression: IExpression, public FilterExpression: IExpression, public RangeExpression: IExpression) {

    }
    public IsSatisfied(getColumnValue: (columnName: string) => any, getDisplayColumnValue: (columnName: string) => string): boolean {
        return this.ColumnValuesExpression.IsSatisfied(getColumnValue,getDisplayColumnValue)
        && this.FilterExpression.IsSatisfied(getColumnValue,getDisplayColumnValue)
        && this.RangeExpression.IsSatisfied(getColumnValue,getDisplayColumnValue);
    }

    public ToFriendlyString(): string {
                let value = ""
        if(!(this.ColumnValuesExpression instanceof EmptyExpression))
        {
            value += "(" + this.ColumnValuesExpression.ToFriendlyString + ")"
        }
        if(!(this.FilterExpression instanceof EmptyExpression))
        {
            if(value!="")
            {
                value += " AND "
            }
            value += "(" + this.FilterExpression + ")"
        }
        if(!(this.RangeExpression instanceof EmptyExpression))
        {
            if(value!="")
            {
                value += " AND "
            }
            value += "(" + this.RangeExpression + ")"
        }
        if(value == "")
        {
            value = "Any"
        }
        return value;
    }
}


