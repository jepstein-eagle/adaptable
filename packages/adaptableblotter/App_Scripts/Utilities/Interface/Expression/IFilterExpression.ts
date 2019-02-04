/**
 * Any filters - user, system or column - contained in the expression, grouped by column
 */
export interface IFilterExpression {
  ColumnId: string;
  Filters: string[];
}
