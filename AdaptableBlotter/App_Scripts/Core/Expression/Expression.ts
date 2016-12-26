import { IRangeExpression, INamedExpression } from '../Interface/IExpression';

export class Expression {
    constructor(
        public ColumnValuesExpressions: Array<{ ColumnName: string, ColumnValues: Array<any> }>,
        public NamedExpressions: Array<{ ColumnName: string, Named: Array<INamedExpression> }>,
        public RangeExpressions: Array<{ ColumnName: string, Ranges: Array<IRangeExpression> }>) {
    }
}


