/**
 * Any filters - user, system or column - contained in the expression, grouped by column
 */
export interface FilterExpression {
  ColumnId: string;
  Filters: string[];
}
