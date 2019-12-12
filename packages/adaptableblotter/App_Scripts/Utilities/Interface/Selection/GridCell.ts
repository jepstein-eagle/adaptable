/**
 * Defines a Cell in the Adaptable Blotter
 *
 * Ever cell is an intersection of a ColumnID and a Primary Key Value
 */
export interface GridCell {
  /**
   * The column in which cell exists
   */
  columnId: string;
  /**
   * The value which the cell contains
   */
  value: any;

  /**
   * The value in the primary key column for that row - this is how the Adaptable Blotter will find the cell
   */
  primaryKeyValue: any;
}
