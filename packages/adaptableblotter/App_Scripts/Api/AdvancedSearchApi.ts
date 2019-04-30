import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import { IAdvancedSearch } from "../Utilities/Interface/BlotterObjects/IAdvancedSearch";
import * as AdvancedSearchRedux from '../Redux/ActionsReducers/AdvancedSearchRedux'
import { ApiBase } from "./ApiBase";
import { IAdvancedSearchApi } from './Interface/IAdvancedSearchApi';
import { AdvancedSearchState } from '../Redux/ActionsReducers/Interface/IState';



export class AdvancedSearchApi extends ApiBase implements IAdvancedSearchApi {

  public getAdvancedSearchState(): AdvancedSearchState {
    return this.getBlotterState().AdvancedSearch;
}

public setAdvancedSearch(advancedSearchName: string): void {
    let advancedSearch: IAdvancedSearch = this.getBlotterState().AdvancedSearch.AdvancedSearches.find(a => a.Name == advancedSearchName);
    if (this.checkItemExists(advancedSearch, advancedSearchName, StrategyConstants.AdvancedSearchStrategyName)) {
      this.dispatchAction(AdvancedSearchRedux.AdvancedSearchSelect(advancedSearchName))
    }
  }

  public clearAdvancedSearch(): void {
    this.dispatchAction(AdvancedSearchRedux.AdvancedSearchSelect(""))
  }

  public addAdvancedSearch(advancedSearch: IAdvancedSearch): void {
    this.dispatchAction(AdvancedSearchRedux.AdvancedSearchAddUpdate(-1, advancedSearch))
  }

  public editAdvancedSearch(advancedSearchName: string, advancedSearch: IAdvancedSearch): void {
    let searchIndex: number = this.getBlotterState().AdvancedSearch.AdvancedSearches.findIndex(a => a.Name == advancedSearchName);
    this.dispatchAction(AdvancedSearchRedux.AdvancedSearchAddUpdate(searchIndex, advancedSearch))
  }

  public deleteAdvancedSearch(advancedSearchName: string): void {
    let searchToDelete = this.getAdvancedSearchByName(advancedSearchName)
    this.dispatchAction(AdvancedSearchRedux.AdvancedSearchDelete(searchToDelete))
  }

  public getCurrentAdvancedSearch(): IAdvancedSearch {
    let currentAdvancedSearchName: string = this.getBlotterState().AdvancedSearch.CurrentAdvancedSearch
    return this.getAdvancedSearchByName(currentAdvancedSearchName)
  }

  public  getCurrentAdvancedSearchName(): string {
    return this.getBlotterState().AdvancedSearch.CurrentAdvancedSearch
   }

  public getAdvancedSearchByName(advancedSearchName: string): IAdvancedSearch {
    return this.getBlotterState().AdvancedSearch.AdvancedSearches.find(a => a.Name == advancedSearchName);
  }

  public getAllAdvancedSearch(): IAdvancedSearch[] {
    return this.getBlotterState().AdvancedSearch.AdvancedSearches;
  }

}