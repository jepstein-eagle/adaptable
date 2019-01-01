import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import { IAdvancedSearch } from "./Interface/IAdaptableBlotterObjects";
import * as AdvancedSearchRedux from '../Redux/ActionsReducers/AdvancedSearchRedux'
import { ApiBase } from "./ApiBase";

export interface IAdvancedSearchApi {
   
     // Advanced Search api methods
  advancedSearchSet(advancedSearchName: string): void
  advancedSearchClear(): void
  advancedSearchAdd(advancedSearch: IAdvancedSearch): void
  advancedSearchEdit(advancedSearchName: string, advancedSearch: IAdvancedSearch): void
  advancedSearchDelete(advancedSearchName: string): void
  advancedSearchGetCurrent(): IAdvancedSearch
  advancedSearchGetByName(advancedSearchName: string): IAdvancedSearch
  advancedSearchGetAll(): IAdvancedSearch[]
}



export class AdvancedSearchApi extends ApiBase implements IAdvancedSearchApi {

  // Advanced Search api methods
  public advancedSearchSet(advancedSearchName: string): void {
    let advancedSearch: IAdvancedSearch = this.getState().AdvancedSearch.AdvancedSearches.find(a => a.Name == advancedSearchName);
    if (this.checkItemExists(advancedSearch, advancedSearchName, StrategyConstants.AdvancedSearchStrategyName)) {
      this.dispatchAction(AdvancedSearchRedux.AdvancedSearchSelect(advancedSearchName))
    }
  }

  public advancedSearchClear(): void {
    this.dispatchAction(AdvancedSearchRedux.AdvancedSearchSelect(""))
  }

  public advancedSearchAdd(advancedSearch: IAdvancedSearch): void {
    this.dispatchAction(AdvancedSearchRedux.AdvancedSearchAddUpdate(-1, advancedSearch))
  }

  public advancedSearchEdit(advancedSearchName: string, advancedSearch: IAdvancedSearch): void {
    let searchIndex: number = this.getState().AdvancedSearch.AdvancedSearches.findIndex(a => a.Name == advancedSearchName);
    this.dispatchAction(AdvancedSearchRedux.AdvancedSearchAddUpdate(searchIndex, advancedSearch))
  }

  public advancedSearchDelete(advancedSearchName: string): void {
    let searchToDelete = this.advancedSearchGetByName(advancedSearchName)
    this.dispatchAction(AdvancedSearchRedux.AdvancedSearchDelete(searchToDelete))
  }

  public advancedSearchGetCurrent(): IAdvancedSearch {
    let currentAdvancedSearchName: string = this.getState().AdvancedSearch.CurrentAdvancedSearch
    return this.advancedSearchGetByName(currentAdvancedSearchName)
  }

  public advancedSearchGetByName(advancedSearchName: string): IAdvancedSearch {
    return this.getState().AdvancedSearch.AdvancedSearches.find(a => a.Name == advancedSearchName);
  }

  public advancedSearchGetAll(): IAdvancedSearch[] {
    return this.getState().AdvancedSearch.AdvancedSearches;
  }

}