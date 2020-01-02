/**
 * Defines how a Column is sorted.
 *
 *  Contains 2 properties:
 *
 *  - `Column`: The name of the Column being sorted
 *
 * - `SortOrder`: Whether to sort the Column ascending or descending
 *
 */
export interface ColumnSort {
  /**
   * The name of the Column being sorted
   */
  Column: string;

  /**
   * How the column will be sorted (i.e. either 'Ascending' or 'Descending')
   */
  SortOrder: 'Ascending' | 'Descending';
}
