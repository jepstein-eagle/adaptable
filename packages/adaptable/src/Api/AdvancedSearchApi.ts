import { AdvancedSearchState, AdvancedSearch } from '../PredefinedConfig/AdvancedSearchState';
import { TypeUuid } from '../PredefinedConfig/Uuid';

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

  /**
   * Replaces the current Advanced Search state with the inputted one
   *
   * **warning: use this method very carefully!**
   *
   * @param advancedSearchState the Advanced Search State to set
   */
  setAdvancedSearchState(advancedSearchState: AdvancedSearchState): void;

  /**
   * Applies the Advanced Search function using the given Advanced Search name
   *
   * **note: the name provided must be in one of the Advanced Searches currently in Adaptable State**
   *
   * @param advancedSearchName the name of the Advanced Search that should be applied
   */
  setAdvancedSearch(advancedSearchName: string): void;

  /**
   * Clears the Advanced Search so that all rows in the Grid are displayed (subject to any other filters or quick search you might have applied).
   *
   * **note: this method does not delete the current Advanced Search**
   */
  clearAdvancedSearch(): void;

  /**
   * Adds a new Advanced Search to the Advanced Search State
   *
   * @param advancedSearch advanced search to add
   */
  addAdvancedSearch(advancedSearch: AdvancedSearch): void;

  /**
   * Updates (essentially) an existing Advanced Search with the provided alternative.
   *
   * The comparison will be on Uuid not *Name*, which allows you to change the name of an Advanced Search.
   *
   * @param advancedSearch the Advanced Search object
   */
  editAdvancedSearch(advancedSearch: AdvancedSearch): void;

  /**
   *Deletes the advanced search from the State
   *
   * @param advancedSearch the Advanced Search object to delete
   */
  deleteAdvancedSearch(advancedSearch: AdvancedSearch): void;

  /**
   *Deletes the advanced search with the given name from the State
   *
   * @param advancedSearchName the name of the Advanced Search object to delete
   */
  deleteAdvancedSearchByName(advancedSearchName: string): void;

  /**
   *Deletes the advanced search with the given Uuid from the State
   *
   * @param uuid the uuid of the Advanced Search to retrieve
   */
  deleteAdvancedSearchByUuid(uuid: TypeUuid): void;

  /**
   *Returns the currently selected Advanced Search
   */
  getCurrentAdvancedSearch(): AdvancedSearch | undefined;

  /**
   * Returns the name of the currently selected Advanced Search
   */
  getCurrentAdvancedSearchName(): string | undefined;

  /**
   * Returns the Advanced Search in the State which has the inputted uuid
   *
   * @param uuid the uuid of the Advanced Search to retrieve
   */
  getAdvancedSearchByUuid(uuid: TypeUuid): AdvancedSearch | undefined;

  /**
   * Returns the Advanced Search in the State which has the inputted name
   *
   * @param advancedSearchName the name of the Advanced Search to retrieve
   */
  getAdvancedSearchByName(advancedSearchName: string): AdvancedSearch | undefined;

  /**
   * Returns all the Advanced Searches in the State
   */
  getAllAdvancedSearch(): AdvancedSearch[];

  /**
   * Opens the Advanced Search popup screen
   */
  showAdvancedSearchPopup(): void;
}
