import { IRange } from './Interface/IRange';

export class Expression {
    constructor(
        public ColumnDisplayValuesExpressions: Array<{ ColumnName: string, ColumnDisplayValues: Array<string> }>,
        public ColumnRawValuesExpressions: Array<{ ColumnName: string, ColumnRawValues: Array<any> }>,
        public UserFilterExpressions: Array<{ ColumnName: string, UserFilters: Array<string> }>,
        public RangeExpressions: Array<{ ColumnName: string, Ranges: Array<IRange> }>) {
    }
} 