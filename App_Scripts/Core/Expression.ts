import { IRange } from './Interface/IRange';

export class Expression {
    constructor(
        public ColumnDisplayValuesExpressions: Array<{ ColumnName: string, ColumnDisplayValues: Array<string> }>,
        public ColumnRawValuesExpressions: Array<{ ColumnName: string, ColumnRawValues: Array<any> }>,
        public FilterExpressions: Array<{ ColumnName: string, Filters: Array<string> }>,
        public RangeExpressions: Array<{ ColumnName: string, Ranges: Array<IRange> }>) {
    }
} 