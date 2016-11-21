import { IExpressionRange } from '../Interface/IExpression';

export class ExpressionString {
    constructor(
        public ColumnValuesExpression: Array<{ ColumnName: string, Values: Array<any> }>,
        public FilterExpressionString: string,
        public RangeExpression: Array<{ ColumnName: string, Ranges: Array<IExpressionRange> }>)
         {
    }
}


