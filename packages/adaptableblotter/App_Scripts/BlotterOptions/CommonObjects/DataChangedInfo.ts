/**
 * Defines a proposed Cell Change
 *
 * Contains details of the current value, the proposed new value, the column.
 *
 * Also provides a primaryKeyValue to enable you to identify the Row in your Data Source,
 *
 * and a RowNode object (which will vary by underlying DataGrid) that contains details of the Row in which the cell is situated.
 */
export interface DataChangedInfo {
  /**
   * The current value in the Cell before the proposed edit
   */
  OldValue: any;

  /**
   * The proposed new value for the cell
   */
  NewValue: any;

  /**
   * The id of the Column in which the cell is situated
   */
  ColumnId: string;

  /**
   * The value in the primary key column for the row where the edited cell is situated
   */
  PrimaryKeyValue: any;

  /**
   * An object representign the Data Grid row which contains the cell being edited.
   *
   * This will vary depending on which underlying DataGrid is being used.
   */
  RowNode?: any;
}
