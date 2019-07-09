/**
 * Options related to Queries (aka Expressions) in the Adaptable Blotter.
 *
 * Many functions in the Adaptable Blotter use Queries to enable users to identify a set of rows for a particular task (e.g. Search, Export, Conditional Style, Chart etc.)
 *
 * Each Query / Expression can include multiple column conditions and can be include any or all of Column Value Lists, Filters and Query Ranges.
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
   * If false (the default) the Query Builder UI will dispaly 3 tabs: Column Values, Filters and Ranges.
   *
   * This option is useful primarily if you aare running Search on your Server and want easily to translate the Adaptable Blotter Query JSON into something you can use.
   *
   * **Default Value: false**
   */
  columnValuesOnlyInQueries?: boolean;

  /**
   * Whether or not to ignore case when running queries on text (string) columns.
   *
   * If set to false then [StartsWith 'c'] will return false for the value 'Canada' but true for 'charlie'.
   *
   * **Default Value: true**
   */
  ignoreCaseInQueries?: boolean;

  /**
   * Used when you want to provide the Adaptable Blotter with a list of column values each time its required (e.g. in Column Filters, when building Queries and in Bulk Update).
   *
   * It is called each time a query is built or filter is opened and it returns a promise that includes the Column Values whih the user (dev team) will provide each time it is needed.
   *
   * If this not set the Adaptable Blottter will use PermittedColumnValues (in User Interface State) if they have been set.  Otherwise it will build a list of distince values for the column dynamically.
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
  DistinctCriteriaPairValue: 'RawValue' | 'DisplayValue';
  ColumnValues: string[];
}
