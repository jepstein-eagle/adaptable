export interface QueryOptions {
  /**
   * How many items to display in column value listboxes when building queries
   * Useful when datasource is very large
   */
  maxColumnValueItemsDisplayed?: number;
  /**
   * Whether the query builder will include just ColumnValues
   * Or should also include Filters and Ranges (the default)
   * Used primarily if running search on Server
   */
  columnValuesOnlyInQueries?: boolean;
  /**
   * When running queries on text columns to ignore case
   * Defaults to true - case is ignored by default
   * (e.g. [StartsWith 'c'] will return true for the value 'Canada')
   */
  ignoreCaseInQueries?: boolean;
  /**
   * Promise providing list of column values
   * Called each time a query is built or filter is opened
   */
  getColumnValues?: (column: string) => Promise<IServerColumnValues>;
}

export interface IServerColumnValues {
  DistinctCriteriaPairValue: 'RawValue' | 'DisplayValue';
  ColumnValues: string[];
}
