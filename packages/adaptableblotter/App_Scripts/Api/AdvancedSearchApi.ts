import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as AdvancedSearchRedux from '../Redux/ActionsReducers/AdvancedSearchRedux';
import { ApiBase } from './ApiBase';
import { IAdvancedSearchApi } from './Interface/IAdvancedSearchApi';
import {
  AdvancedSearchState,
  AdvancedSearch,
} from '../PredefinedConfig/IUserState/AdvancedSearchState';
import StringExtensions from '../Utilities/Extensions/StringExtensions';
import BlotterHelper from '../Utilities/Helpers/BlotterHelper';

export class AdvancedSearchApi extends ApiBase implements IAdvancedSearchApi {
  public getAdvancedSearchState(): AdvancedSearchState {
    return this.getBlotterState().AdvancedSearch;
  }

  public setAdvancedSearchState(advancedSearchState: AdvancedSearchState): void {
    // add/update each advanced search where the states are different
    const advancedSearches: AdvancedSearch[] = this.getAllAdvancedSearch();

    if (advancedSearches != advancedSearchState.AdvancedSearches) {
      advancedSearchState.AdvancedSearches.forEach((advancedSearch: AdvancedSearch) => {
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
    const advancedSearch: AdvancedSearch = this.getBlotterState().AdvancedSearch.AdvancedSearches.find(
      (a: AdvancedSearch) => a.Name == advancedSearchName
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

  public addAdvancedSearch(advancedSearch: AdvancedSearch): void {
    this.dispatchAction(AdvancedSearchRedux.AdvancedSearchAdd(advancedSearch));
  }

  public editAdvancedSearch(advancedSearch: AdvancedSearch): void {
    this.dispatchAction(AdvancedSearchRedux.AdvancedSearchEdit(advancedSearch));
  }

  public deleteAdvancedSearch(advancedSearchName: string): void {
    const searchToDelete = this.getAdvancedSearchByName(advancedSearchName);
    this.dispatchAction(AdvancedSearchRedux.AdvancedSearchDelete(searchToDelete));
  }

  public getCurrentAdvancedSearch(): AdvancedSearch {
    return this.getAdvancedSearchByName(this.getCurrentAdvancedSearchName());
  }

  public getCurrentAdvancedSearchName(): string {
    return this.getBlotterState().AdvancedSearch.CurrentAdvancedSearch;
  }

  public getAdvancedSearchByName(advancedSearchName: string): AdvancedSearch | undefined {
    return this.getAllAdvancedSearch().find(a => a.Name == advancedSearchName);
  }

  public getAllAdvancedSearch(): AdvancedSearch[] {
    return this.getBlotterState().AdvancedSearch.AdvancedSearches;
  }
}
