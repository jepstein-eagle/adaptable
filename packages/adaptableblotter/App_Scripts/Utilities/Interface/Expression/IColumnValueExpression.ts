/**
 * Any column display (and optionally raw) values contained in the expression, grouped by column
 */
export interface IColumnValueExpression {
  ColumnId: string;
  ColumnDisplayValues: string[];
  ColumnRawValues?: string[];
}
