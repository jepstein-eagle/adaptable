import { IExpression } from '../Interface/IExpression';

export class ExpressionString {
    constructor(public ColumnValuesExpression: Array<{ ColumnName: string, Values: Array<any> }>,
        public FilterExpressionString: string,
        public RangeExpressionString: string) {
    }
}


