import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import { IAdvancedSearch } from "./Interface/IAdaptableBlotterObjects";
import * as AdvancedSearchRedux from '../Redux/ActionsReducers/AdvancedSearchRedux'
import { ApiBase } from "./ApiBase";

export interface IAdvancedSearchApi {

  /**
   * Sets Advanced Search
   * @param advancedSearchName 
   */
  Set(advancedSearchName: string): void;
  Clear(): void;
  Add(advancedSearch: IAdvancedSearch): void;
  /**
   * Updates an existing Advanced Search. 
   * The first parameter is the name of the Search that is being edited. 
   * Its required in order to identify the object because the name property itself can be edited and there is no UID.
   * @param advancedSearchName 
   * @param advancedSearch 
   */
  Edit(advancedSearchName: string, advancedSearch: IAdvancedSearch): void;
  Delete(advancedSearchName: string): void;
  GetCurrent(): IAdvancedSearch;
  GetByName(advancedSearchName: string): IAdvancedSearch;
  GetAll(): IAdvancedSearch[];
  
}



export class AdvancedSearchApi extends ApiBase implements IAdvancedSearchApi {

  public Set(advancedSearchName: string): void {
    let advancedSearch: IAdvancedSearch = this.getState().AdvancedSearch.AdvancedSearches.find(a => a.Name == advancedSearchName);
    if (this.checkItemExists(advancedSearch, advancedSearchName, StrategyConstants.AdvancedSearchStrategyName)) {
      this.dispatchAction(AdvancedSearchRedux.AdvancedSearchSelect(advancedSearchName))
    }
  }

  public Clear(): void {
    this.dispatchAction(AdvancedSearchRedux.AdvancedSearchSelect(""))
  }

  public Add(advancedSearch: IAdvancedSearch): void {
    this.dispatchAction(AdvancedSearchRedux.AdvancedSearchAddUpdate(-1, advancedSearch))
  }

  public Edit(advancedSearchName: string, advancedSearch: IAdvancedSearch): void {
    let searchIndex: number = this.getState().AdvancedSearch.AdvancedSearches.findIndex(a => a.Name == advancedSearchName);
    this.dispatchAction(AdvancedSearchRedux.AdvancedSearchAddUpdate(searchIndex, advancedSearch))
  }

  public Delete(advancedSearchName: string): void {
    let searchToDelete = this.GetByName(advancedSearchName)
    this.dispatchAction(AdvancedSearchRedux.AdvancedSearchDelete(searchToDelete))
  }

  public GetCurrent(): IAdvancedSearch {
    let currentAdvancedSearchName: string = this.getState().AdvancedSearch.CurrentAdvancedSearch
    return this.GetByName(currentAdvancedSearchName)
  }

  public GetByName(advancedSearchName: string): IAdvancedSearch {
    return this.getState().AdvancedSearch.AdvancedSearches.find(a => a.Name == advancedSearchName);
  }

  public GetAll(): IAdvancedSearch[] {
    return this.getState().AdvancedSearch.AdvancedSearches;
  }

}