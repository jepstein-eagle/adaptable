import {
  AdvancedSearchState,
  AdvancedSearch,
} from '../../PredefinedConfig/RunTimeState/AdvancedSearchState';

export interface IAdvancedSearchApi {
  /**
   * Retrieves the Advanced Search State
   */
  getAdvancedSearchState(): AdvancedSearchState;

  /**
   * Replaces the Advanced Search state with the inputted one
   * @param advancedSearchState
   */
  setAdvancedSearchState(advancedSearchState: AdvancedSearchState): void;

  /**
   * Applies Advanced Search on the given Advanced Search name
   * @param advancedSearchName
   */
  setAdvancedSearch(advancedSearchName: string): void;

  /**
   * Clears the Advanced Search
   */
  clearAdvancedSearch(): void;

  /**
   * Adds a new Advanced Search to the State
   * @param advancedSearch advanced search to add
   */
  addAdvancedSearch(advancedSearch: AdvancedSearch): void;

  /**
   * Updates an existing Advanced Search with the provided object
   * @param advancedSearch
   */
  editAdvancedSearch(advancedSearch: AdvancedSearch): void;

  /**
   *
   * @param advancedSearchName
   */
  deleteAdvancedSearch(advancedSearchName: string): void;
  getCurrentAdvancedSearch(): AdvancedSearch;
  getCurrentAdvancedSearchName(): string;
  getAdvancedSearchByName(advancedSearchName: string): AdvancedSearch | undefined;
  getAllAdvancedSearch(): AdvancedSearch[];
}
