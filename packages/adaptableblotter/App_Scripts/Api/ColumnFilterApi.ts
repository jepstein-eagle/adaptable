import { ColumnFilterState, ColumnFilter } from '../PredefinedConfig/ColumnFilterState';

export interface ColumnFilterApi {
  /**
   * Retrieves the Column Filter State section of Predefined Config
   */
  getColumnFilterState(): ColumnFilterState;

  /**
   * Sets Column Filters
   *
   * @param columnFilters the Column Filters to set
   */
  setColumnFilter(columnFilters: ColumnFilter[]): void;

  /**
   * Clears the given Column Filter
   *
   * @param columnFilter the Column Filter to clear
   */
  clearColumnFilter(columnFilter: ColumnFilter): void;

  /**
   * Clears the Column Filter for a given Column
   *
   * @param column the Column for which the Column Filter should be cleared
   */
  clearColumnFilterByColumn(column: string): void;

  /**
   * Clears the Column Filters for a given set of Columns
   *
   * @param columns the Columns for which the Column Filter should be cleared
   */
  clearColumnFilterByColumns(columns: string[]): void;

  /**
   * Clears all Column Filters in the State
   */
  clearAllColumnFilter(): void;

  /**
   * Retrieves all the Column Filters in the Column Filter State (of Predefined Config)
   */
  getAllColumnFilter(): ColumnFilter[];

  /**
   * Retrieves all the Column Filters in the Column Filter State (of Predefined Config) for a given Column
   *
   * @param column the column to retrieve the Column Filters for
   */
  getAllColumnFilterForColumn(column: string): ColumnFilter[];

  createColumnFilterForCell(column: string, primarykeyValues: any[]): void;
}
