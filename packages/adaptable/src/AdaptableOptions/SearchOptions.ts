import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';

/**
 * Search options section of Adaptable Options.
 *
 *  Includes options for running some (or all) search functions on the server and to exclude some columns from Quick Search.
 *
 * --------------
 *
 * ### Search Options Example**
 *
 * ```ts
 * searchOptions = {
 *  serverSearchOption: 'AdvancedSearch',
 *  clearSearchesOnStartUp: true,
 *  excludeColumnFromQuickSearch: (column: AdaptableColumn) => {
 *      if (column.ColumnId === 'country' || column.ReadOnly) {
 *        return true;
 *      }
 *      return false;
 *    },
 *};
 * ```
 *
 * In this example we will: perform `AdvancedSearch` on the server; clear any previously running Searches (from the last session) at startup; and exclude the 'country' column, and all ReadOnly columns, from Quick Search.
 *
 */
export interface SearchOptions {
  /**
   *  A function allowing you to specify for each Column whether it should be excluded from Quick Search.
   *
   * This is useful if you have a particular cell renderer which will cause the column to return false positives (as Quick Search will search on the underlying value).
   *
   * By default every column IS included in Quick Search
   *
   * ```ts
   *   adaptableOptions.searchOptions = {
   *    excludeColumnFromQuickSearch: (column: AdaptableColumn) => {
   *      if (column.ColumnId === 'country' || column.ReadOnly) {
   *        return true;
   *      }
   *      return false;
   *    },
   *  };
   * ```
   *
   * In this example, the 'country' column, and all ReadOnly columns, will be excluded from Quick Search
   *
   */
  excludeColumnFromQuickSearch?: (column: AdaptableColumn) => boolean;

  /**
   * Which searching and filtering options, if any, should take place on the server.
   *
   * Leave unset (default is 'None') to perform all searching and filtering on the client.
   *
   * --------------
   *
   * Read the [Server Functionality Guide](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-server-functionality-guide.md) for full details of server searching options.
   *
   * --------------
   *
   *  **Note: Modern browsers are very powerful and AdapTable is very fast and performant so only run server searching if you have more than 150-200,000 records that you need filtering.**
   *
   * AdapTable allows you to perform a mixture of client and server searching e.g. you can run Column Filters on the client but Advanced Search on the server.
   *
   * There are 4 options available:
   *
   * - `None` - the default. All searching and filtering will take place on the client (use this option if you have fewer than 150,000 rows).
   *
   * - `AdvancedSearch` - runs just {@link AdvancedSearch|Advanced Search} on the server and all other search (e.g. Quick Search) and filtering (e.g. Column Filters) on the client.  (This is a popular option).
   *
   * - `AllSearch` - runs all search and filtering functions on the server (i.e. Advanced Search, Quick Search, Column Filters etc)
   *
   * - `AllSearchandSort` - runs all search and filtering functions on the server (i.e. Advanced Search, Quick Search, Column Filters etc) and will also run all sorting on the server.
   *
   * ### SearchChanged Event
   *
   * If a search function has been selected to be run on the Server then AdapTable will not do any relevant searching or filtering when the function runs.
   *
   * However, it **will** fire the [`SearchChanged` event](_src_api_events_searchchanged_.searchchangedeventargs.html).
   *
   * This event provides the full current search and filter state in AdapTable, together with a `SearchChangedTrigger` property detailing which AdapTable function caused the event to fire.
   *
   * Note; If you select server searching then you will need to perform any filtering and searching yourself and feed back the data to AdapTable. So you will need some way of 'translating' AdapTable's JSON Objects into a form meaningful to you, and then sending the return result set back to AdapTable.
   *
   * There are a number of different api methods you can use but the most common is {@link GridApi.setGridData|Set Grid Data}
   *
   * Once the data is sent to AdapTable, it will automatically make any changes to your sorting, styles etc as required.
   *
   * ### DataSource Selector
   *
   * If the `SearchChangedTrigger` is *DataSource* then you will not need to perform any JSON translation (though you will still, of course, need to provide AdapTable with the new dataset).
   *
   * This is because the DataSource property only contains the *name* of the selected {@link DataSource|Data Source} which you have provided in your Predefined Config.  (This will typically be a Stored Procedure name or something recognisable to you).
   *
   * DataSources can be parametised so you can include variables to improve the search.
   *
   * > DataSources are a good way of running 'big' searches on the server which can be predicted in advance without having to do any dynamic conversion of AdapTable configuration.
   *
   *
   * **Default Value: None**
   *
   */
  serverSearchOption?: 'None' | 'AdvancedSearch' | 'AllSearch' | 'AllSearchandSort';

  /**
   * Whether to clear all searches when AdapTable loads.
   *
   * Used in the rare scenario when the user wants no previous searches to be re-applied at startup
   *
   * Note: a neater implementation would be to use the state management functions
   *
   * **Default Value: false**
   */
  clearSearchesOnStartUp?: boolean;
}
