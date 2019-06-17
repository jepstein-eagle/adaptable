import { QueryRange } from './QueryRange';

/**
 * Any ranges contained in the expression, grouped by column
 */
export interface RangeExpression {
  ColumnId: string;
  Ranges: QueryRange[];
}
