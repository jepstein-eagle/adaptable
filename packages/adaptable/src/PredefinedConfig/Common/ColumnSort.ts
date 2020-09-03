/**
 * Defines how a Column is sorted.
 *
 *  Contains 2 properties:
 *
 *  - `ColumnId`: The Id of the Column being sorted
 *
 * - `SortOrder`: Whether to sort the Column ascending or descending
 *
 */
export interface ColumnSort {
  /**
   * The Id of the Column being sorted
   */
  ColumnId: string;

  /**
   * How the column will be sorted (i.e. either 'Asc' or 'Desc')
   */
  SortOrder: 'Asc' | 'Desc';
}
