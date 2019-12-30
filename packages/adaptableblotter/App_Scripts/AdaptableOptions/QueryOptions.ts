/**
 * Options related to Queries (aka Expressions) in the Adaptable.
 *
 * Many functions in the Adaptable use Queries to enable users to identify a set of rows for a particular task (e.g. Search, Export, Conditional Style, Chart etc.)
 *
 * Each Query / Expression can include multiple column conditions and can be include any or all of Column Value Lists, Filters and Query Ranges.
 *
 * ```ts
 * queryOptions = {
 *  maxColumnValueItemsDisplayed: 1000,
 *  columnValuesOnlyInQueries: true
 *  ignoreCaseInQueries: false
 *};
 * ```
 */
export interface QueryOptions {
  /**
   * Sets how many items to display in column value listboxes when building queries.
   *
   * Useful when datasource is very large with a huge number of distinct values for a column.
   *
   * Note: This value is also used when populating the Column Filter and when using Bulk Update.
   *
   * **Default Value: 2,000**
   */
  maxColumnValueItemsDisplayed?: number;

  /**
   * Whether the query builder will include just ColumnValues in the UI it displays.
   *
   * If false (the default) the Query Builder UI will display 3 tabs: Column Values, Filters and Ranges.
   *
   * This option is useful primarily if you are running Server Searching and want more easily to translate the Adaptable Query JSON into something you can readily understand.
   *
   * **Default Value: false**
   */
  columnValuesOnlyInQueries?: boolean;

  /**
   * Whether or not to ignore case when running queries on text (string) columns.
   *
   * If set to false (the default is 'true') then [StartsWith 'c'] will return false for the value 'Canada' but true for 'charlie'.
   *
   * **Default Value: true**
   */
  ignoreCaseInQueries?: boolean;

  /**
   * Used when you want to dynamically provide the Adaptable with a list of column values each time its required (e.g. in Column Filters, or when building Queries or in Bulk Update).
   *
   * The property returns a promise that includes the Column Values whih the user (dev team) will provide each time it is needed.
   *
   * If this not set the Adaptable Blottter will use PermittedColumnValues (in User Interface State) if they have been set.
   *
   * Otherwise it will build a list of distince values for the column dynamically.
   *
   *  **Default Value: null**
   */
  getColumnValues?: (column: string) => Promise<IServerColumnValues>;
}

/**
 * Used for getting Column values from the server in the getColumnValues property of QueryOptions.
 *
 * It returns a list of column values to show and whether they should be treated as raw (i.e. underlying) values or as display values.
 *
 * The values returned (through a Promise) will populate the Column Filter, Column Values section in Query Builder and Bulk Update.
 */
export interface IServerColumnValues {
  /**
   * Whether the value being returned is the display or raw value.
   *
   * A raw value is used if you then convert it before dispalying it (e.g. you might have a cell formatter).
   */
  DistinctCriteriaPairValue: 'RawValue' | 'DisplayValue';

  /**
   * The values to display in the list.
   *
   * Always sent as an array of strings irrespective of the DataType of the column.
   */
  ColumnValues: string[];
}
