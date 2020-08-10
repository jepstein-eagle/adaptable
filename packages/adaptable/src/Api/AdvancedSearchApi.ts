import { AdvancedSearchState } from '../PredefinedConfig/AdvancedSearchState';

/**
 * Provides full and comprehensive run-time access to the Advanced Search function and associated state.
 *
 * Advanced Search enables you to build saveable searches using *Queries* that can be run across multiple columns using a wide variety of *Search Criteria*.
 *
 * --------------
 *
 *  ### Further AdapTable Help Resources
 *
 * - [Advanced Search Demo](https://demo.adaptabletools.com/search/aggridadvancedsearchdemo/)
 *
 * - {@link AdvancedSearchState|Advanced Search State}
 *
 * - {@link SearchOptions|Search Options}
 *
 * - [Advanced Search Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/advanced-search-function.md)
 *
 * - [Server Functionality Guide](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-server-functionality-guide.md)
 *
 */
export interface AdvancedSearchApi {
  /**
   * Retrieves the Advanced Search section from Adaptable State
   */
  getAdvancedSearchState(): AdvancedSearchState;

  setAdvancedSearch(query: string): void;

  /**
   * Clears the Advanced Search so that all rows in the Grid are displayed (subject to any other filters or quick search you might have applied).
   *
   * **note: this method does not delete the current Advanced Search**
   */
  clearAdvancedSearch(): void;

  getCurrentAdvancedSearch(): string | undefined;

  /**
   * Opens the Advanced Search popup screen
   */
  showAdvancedSearchPopup(): void;
}
