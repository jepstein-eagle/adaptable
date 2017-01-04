import { IRangeExpression, IUserFilterExpression } from '../Interface/IExpression';

export class Expression {
    constructor(
        public ColumnValuesExpressions: Array<{ ColumnName: string, ColumnValues: Array<any> }>,
        public UserFilterExpressions: Array<{ ColumnName: string, Named: Array<string> }>,
        public RangeExpressions: Array<{ ColumnName: string, Ranges: Array<IRangeExpression> }>) {
    }
}


