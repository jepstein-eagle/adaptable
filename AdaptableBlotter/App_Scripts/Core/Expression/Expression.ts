import { IExpressionRange, IExpressionFilter } from '../Interface/IExpression';

export class Expression {
    constructor(
        public ColumnValuesExpression: Array<{ ColumnName: string, Values: Array<any> }>,
        public FiltersExpression: Array<{ ColumnName: string, Filters: Array<IExpressionFilter> }>,
        public RangeExpression: Array<{ ColumnName: string, Ranges: Array<IExpressionRange> }>)
         {
    }
}


