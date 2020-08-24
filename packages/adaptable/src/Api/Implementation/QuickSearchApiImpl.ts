import { AdaptableStyle } from '../../PredefinedConfig/Common/AdaptableStyle';
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { ApiBase } from './ApiBase';
import { QuickSearchApi } from '../QuickSearchApi';
import { QuickSearchState } from '../../PredefinedConfig/QuickSearchState';

export class QuickSearchApiImpl extends ApiBase implements QuickSearchApi {
  public getQuickSearchState(): QuickSearchState {
    return this.getAdaptableState().QuickSearch;
  }

  public setQuickSearchState(quickSearchState: QuickSearchState): void {
    let currentQuickSearchState = this.getQuickSearchState();
    // apply QuickSearch if different
    if (currentQuickSearchState.QuickSearchText != quickSearchState.QuickSearchText) {
      this.applyQuickSearch(quickSearchState.QuickSearchText);
    }

    if (currentQuickSearchState.Style != quickSearchState.Style) {
      this.setQuickSearchStyle(quickSearchState.Style);
    }
  }

  public applyQuickSearch(quickSearchText: string): void {
    this.dispatchAction(QuickSearchRedux.QuickSearchApply(quickSearchText));
  }

  public clearQuickSearch(): void {
    this.dispatchAction(QuickSearchRedux.QuickSearchApply(''));
  }

  public getQuickSearchValue(): string {
    return this.getQuickSearchState().QuickSearchText;
  }

  public getQuickSearchStyle(): AdaptableStyle {
    return this.getQuickSearchState().Style;
  }

  public setQuickSearchStyle(style: AdaptableStyle): void {
    this.dispatchAction(QuickSearchRedux.QuickSearchSetStyle(style));
  }

  public showQuickSearchPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.QuickSearchStrategyId,
      ScreenPopups.QuickSearchPopup
    );
  }
}
