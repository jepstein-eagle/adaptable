import { IAdvancedSearch } from '../../Utilities/Interface/BlotterObjects/IAdvancedSearch';
import { AdvancedSearchState } from '../../Redux/ActionsReducers/Interface/IState';

export interface IAdvancedSearchApi {
  getAdvancedSearchState(): AdvancedSearchState;
  setAdvancedSearchState(advancedSearchState: AdvancedSearchState): void;

  /**
   * Sets Advanced Search
   * @param advancedSearchName
   */
  setAdvancedSearch(advancedSearchName: string): void;
  clearAdvancedSearch(): void;
  addAdvancedSearch(advancedSearch: IAdvancedSearch): void;
  /**
   * Updates an existing Advanced Search.
   * The first parameter is the name of the Search that is being edited.
   * Its required in order to identify the object because the name property itself can be edited and there is no UID.
   * @param advancedSearchName
   * @param advancedSearch
   */
  editAdvancedSearch(advancedSearch: IAdvancedSearch): void;
  deleteAdvancedSearch(advancedSearchName: string): void;
  getCurrentAdvancedSearch(): IAdvancedSearch;
  getCurrentAdvancedSearchName(): string;
  getAdvancedSearchByName(advancedSearchName: string): IAdvancedSearch | undefined;
  getAllAdvancedSearch(): IAdvancedSearch[];
}
