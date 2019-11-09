import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import * as AdvancedSearchRedux from '../../Redux/ActionsReducers/AdvancedSearchRedux';
import { ApiBase } from './ApiBase';
import { AdvancedSearchApi } from '../AdvancedSearchApi';
import { AdvancedSearchState, AdvancedSearch } from '../../PredefinedConfig/AdvancedSearchState';
import StringExtensions from '../../Utilities/Extensions/StringExtensions';
import BlotterHelper from '../../Utilities/Helpers/BlotterHelper';
import { TypeUuid } from '../../PredefinedConfig/Uuid';

export class AdvancedSearchApiImpl extends ApiBase implements AdvancedSearchApi {
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
    const advancedSearch: AdvancedSearch = this.getBlotterState().AdvancedSearch.AdvancedSearches!.find(
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

  public deleteAdvancedSearch(advancedSearch: AdvancedSearch | undefined): void {
    // todo something if doesnt exist?
    if (advancedSearch) {
      this.dispatchAction(AdvancedSearchRedux.AdvancedSearchDelete(advancedSearch));
    }
  }

  public deleteAdvancedSearchByName(advancedSearchName: string): void {
    const searchToDelete = this.getAdvancedSearchByName(advancedSearchName);
    this.deleteAdvancedSearch(searchToDelete);
  }

  public deleteAdvancedSearchByUuid(uid: TypeUuid): void {
    const searchToDelete = this.getAdvancedSearchByUuid(uid);
    this.deleteAdvancedSearch(searchToDelete);
  }

  public getCurrentAdvancedSearch(): AdvancedSearch | undefined {
    return this.getAdvancedSearchByName(this.getCurrentAdvancedSearchName());
  }

  public getCurrentAdvancedSearchName(): string | undefined {
    return this.getBlotterState().AdvancedSearch.CurrentAdvancedSearch;
  }

  public getAdvancedSearchByName(
    advancedSearchName: string | undefined
  ): AdvancedSearch | undefined {
    return this.getAllAdvancedSearch().find(a => a.Name == advancedSearchName);
  }

  public getAdvancedSearchByUuid(uuid: TypeUuid): AdvancedSearch | undefined {
    return this.getAllAdvancedSearch().find(a => a.Uuid == uuid);
  }

  public getAllAdvancedSearch(): AdvancedSearch[] {
    let searches: AdvancedSearch[] | undefined = this.getBlotterState().AdvancedSearch
      .AdvancedSearches;
    if (searches == undefined) {
      searches = [];
    }
    return searches;
  }

  public showAdvancedSearchPopup(): void {
    this.blotter.api.internalApi.showPopupScreen(
      StrategyConstants.AdvancedSearchStrategyId,
      ScreenPopups.AdvancedSearchPopup
    );
  }
}
