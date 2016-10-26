import { IExpression } from '../Interface/IExpression';

export class EmptyExpression implements IExpression {

    public IsSatisfied(getColumnValue: (columnName: string) => any, getDisplayColumnValue: (columnName: string) => string): boolean {
        return true;
    }

    public ToFriendlyString(): string {
        return "Any";
    }
}


