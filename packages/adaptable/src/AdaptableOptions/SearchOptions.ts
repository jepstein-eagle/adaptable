/**
 * Search options section of Adaptable Options.
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
   * Leave unset (default is 'None') to perform everything on the client.
   *
   * This allows you to perform a mixture e.g. do Column Filters on the client but Advanced Seearch on the server.
   *
   * **Default Value: None**
   */
  serverSearchOption?: 'None' | 'AdvancedSearch' | 'AllSearch' | 'AllSearchandSort';
}
