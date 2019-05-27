import { IStyle } from '../../Utilities/Interface/IStyle';
import { QuickSearchState } from '../../Redux/ActionsReducers/Interface/IState';
import { DisplayAction } from '../../Utilities/Enums';
export interface IQuickSearchApi {
  getQuickSearchState(): QuickSearchState;
  setQuickSearchState(quickSearchState: QuickSearchState): void;
  /**
   * Runs QuickSearch on the supplied text
   * @param quickSearchText text to run QuickSearch on
   */
  applyQuickSearch(quickSearchText: string): void;
  /**
   * Clears Quick Search
   */
  clearQuickSearch(): void;
  /**
   * Retrieves the current quick search text
   */
  getQuickSearchValue(): string;
  getQuickSearchStyle(): IStyle;
  getQuickSearchDisplayAction(): 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell';

  setQuickSearchDisplayAction(
    displayAction: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell'
  ): void;
  setQuickSearchStyle(style: IStyle): void;
}
