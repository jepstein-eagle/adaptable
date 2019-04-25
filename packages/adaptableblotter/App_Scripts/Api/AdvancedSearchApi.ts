import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import { IAdvancedSearch } from "../Utilities/Interface/BlotterObjects/IAdvancedSearch";
import * as AdvancedSearchRedux from '../Redux/ActionsReducers/AdvancedSearchRedux'
import { ApiBase } from "./ApiBase";
import { IAdvancedSearchApi } from './Interface/IAdvancedSearchApi';
import { AdvancedSearchState } from '../Redux/ActionsReducers/Interface/IState';



export class AdvancedSearchApi extends ApiBase implements IAdvancedSearchApi {

  public GetState(): AdvancedSearchState {
    return this.getBlotterState().AdvancedSearch;
}

public Set(advancedSearchName: string): void {
    let advancedSearch: IAdvancedSearch = this.getBlotterState().AdvancedSearch.AdvancedSearches.find(a => a.Name == advancedSearchName);
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
    let searchIndex: number = this.getBlotterState().AdvancedSearch.AdvancedSearches.findIndex(a => a.Name == advancedSearchName);
    this.dispatchAction(AdvancedSearchRedux.AdvancedSearchAddUpdate(searchIndex, advancedSearch))
  }

  public Delete(advancedSearchName: string): void {
    let searchToDelete = this.GetByName(advancedSearchName)
    this.dispatchAction(AdvancedSearchRedux.AdvancedSearchDelete(searchToDelete))
  }

  public GetCurrent(): IAdvancedSearch {
    let currentAdvancedSearchName: string = this.getBlotterState().AdvancedSearch.CurrentAdvancedSearch
    return this.GetByName(currentAdvancedSearchName)
  }

  public  GetCurrentName(): string {
    return this.getBlotterState().AdvancedSearch.CurrentAdvancedSearch
   }

  public GetByName(advancedSearchName: string): IAdvancedSearch {
    return this.getBlotterState().AdvancedSearch.AdvancedSearches.find(a => a.Name == advancedSearchName);
  }

  public GetAll(): IAdvancedSearch[] {
    return this.getBlotterState().AdvancedSearch.AdvancedSearches;
  }

}