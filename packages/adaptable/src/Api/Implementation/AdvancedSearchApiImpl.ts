import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import * as AdvancedSearchRedux from '../../Redux/ActionsReducers/AdvancedSearchRedux';
import { ApiBase } from './ApiBase';
import { AdvancedSearchApi } from '../AdvancedSearchApi';
import { AdvancedSearchState } from '../../PredefinedConfig/AdvancedSearchState';
export class AdvancedSearchApiImpl extends ApiBase implements AdvancedSearchApi {
  public getAdvancedSearchState(): AdvancedSearchState {
    return this.getAdaptableState().AdvancedSearch;
  }

  public setAdvancedSearch(query: string): void {
    this.dispatchAction(AdvancedSearchRedux.AdvancedSearchChange(query));
  }

  public clearAdvancedSearch(): void {
    this.dispatchAction(AdvancedSearchRedux.AdvancedSearchChange(''));
  }

  public getCurrentAdvancedSearch(): string | undefined {
    return this.getAdaptableState().AdvancedSearch.CurrentAdvancedSearch;
  }

  public showAdvancedSearchPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.AdvancedSearchStrategyId,
      ScreenPopups.AdvancedSearchPopup
    );
  }
}
