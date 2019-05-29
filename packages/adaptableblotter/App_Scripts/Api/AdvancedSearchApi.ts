import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import { IAdvancedSearch } from '../Utilities/Interface/BlotterObjects/IAdvancedSearch';
import * as AdvancedSearchRedux from '../Redux/ActionsReducers/AdvancedSearchRedux';
import { ApiBase } from './ApiBase';
import { IAdvancedSearchApi } from './Interface/IAdvancedSearchApi';
import { AdvancedSearchState } from '../Redux/ActionsReducers/Interface/IState';
import ArrayExtensions from '../Utilities/Extensions/ArrayExtensions';
import StringExtensions from '../Utilities/Extensions/StringExtensions';
import BlotterHelper from '../Utilities/Helpers/BlotterHelper';

export class AdvancedSearchApi extends ApiBase implements IAdvancedSearchApi {
  public getAdvancedSearchState(): AdvancedSearchState {
    return this.getBlotterState().AdvancedSearch;
  }

  public setAdvancedSearchState(advancedSearchState: AdvancedSearchState): void {
    // add/update each advanced search where the states are different
    const advancedSearches: IAdvancedSearch[] = this.getAllAdvancedSearch();

    if (advancedSearches != advancedSearchState.AdvancedSearches) {
      advancedSearchState.AdvancedSearches.forEach((advancedSearch: IAdvancedSearch) => {
        if (BlotterHelper.BlotterObjectExistsInState(advancedSearches, advancedSearch)) {
          this.editAdvancedSearch(advancedSearch);
        } else {
          this.addAdvancedSearch(advancedSearch);
        }
      });
    }
    // set or clear the current one
    if (
      this.getAdvancedSearchState().CurrentAdvancedSearch !=
      advancedSearchState.CurrentAdvancedSearch
    ) {
      if (StringExtensions.IsNotNullOrEmpty(advancedSearchState.CurrentAdvancedSearch)) {
        this.setAdvancedSearch(advancedSearchState.CurrentAdvancedSearch);
      } else {
        this.clearAdvancedSearch();
      }
    }
  }

  public setAdvancedSearch(advancedSearchName: string): void {
    const advancedSearch: IAdvancedSearch = this.getBlotterState().AdvancedSearch.AdvancedSearches.find(
      a => a.Name == advancedSearchName
    );
    if (
      this.checkItemExists(
        advancedSearch,
        advancedSearchName,
        StrategyConstants.AdvancedSearchStrategyName
      )
    ) {
      this.dispatchAction(AdvancedSearchRedux.AdvancedSearchSelect(advancedSearchName));
    }
  }

  public clearAdvancedSearch(): void {
    this.dispatchAction(AdvancedSearchRedux.AdvancedSearchSelect(''));
  }

  public addAdvancedSearch(advancedSearch: IAdvancedSearch): void {
    this.dispatchAction(AdvancedSearchRedux.AdvancedSearchAdd(advancedSearch));
  }

  public editAdvancedSearch(advancedSearch: IAdvancedSearch): void {
    this.dispatchAction(AdvancedSearchRedux.AdvancedSearchEdit(advancedSearch));
  }

  public deleteAdvancedSearch(advancedSearchName: string): void {
    const searchToDelete = this.getAdvancedSearchByName(advancedSearchName);
    this.dispatchAction(AdvancedSearchRedux.AdvancedSearchDelete(searchToDelete));
  }

  public getCurrentAdvancedSearch(): IAdvancedSearch {
    return this.getAdvancedSearchByName(this.getCurrentAdvancedSearchName());
  }

  public getCurrentAdvancedSearchName(): string {
    return this.getBlotterState().AdvancedSearch.CurrentAdvancedSearch;
  }

  public getAdvancedSearchByName(advancedSearchName: string): IAdvancedSearch | undefined {
    return this.getAllAdvancedSearch().find(a => a.Name == advancedSearchName);
  }

  public getAllAdvancedSearch(): IAdvancedSearch[] {
    return this.getBlotterState().AdvancedSearch.AdvancedSearches;
  }
}
