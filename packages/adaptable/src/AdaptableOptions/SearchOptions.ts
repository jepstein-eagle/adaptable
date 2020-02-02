import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';

/**
 * Search options section of Adaptable Options.
 *
 *  Includes options for running search on the server and how to manage Quick Search.
 *
 * **Search Options Example**
 *
 * ```ts
 * searchOptions = {
 *  serverSearchOption: 'AdvancedSearch',
 *};
 * ```
 */
export interface SearchOptions {
  /**
   * Which searching and filtering options, if any, should take place on the server.
   *
   * Leave unset (default is 'None') to perform all searching and filtering on the client.
   *
   *  **Note: Modern browsers are very powerful and AdapTable is very powerful and performant so only perform server searching if you have more than 150-200,000 records that you need filtering.**
   *
   * This allows you to perform a mixture of client and server searching e.g. run Column Filters on the client but Advanced Search on the server.
   *
   * If an option is set to be run on the Server then AdapTable will not do any relevant searching or filtering, but it **will** fire the [`SearchChanged` event](_api_events_searchchanged_.searchchangedeventargs.html).
   *
   * This event provides full details of the current search and filter state in AdapTable, together with what triggered the event.
   *
   * **Default Value: None**
   */
  serverSearchOption?: 'None' | 'AdvancedSearch' | 'AllSearch' | 'AllSearchandSort';

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
}
