import { IStyle } from '../PredefinedConfig/Common/IStyle';
import { QuickSearchState } from '../PredefinedConfig/QuickSearchState';
export interface QuickSearchApi {
  /**
   * Retrieves all the Quick Search section from the Adaptable Blotter State
   */
  getQuickSearchState(): QuickSearchState;

  /**
   * Replaces (not merges) current Quick Search State with inputted one
   * @param quickSearchState
   */
  setQuickSearchState(quickSearchState: QuickSearchState): void;

  /**
   * Runs a QuickSearch using the supplied text
   * @param quickSearchText text to run QuickSearch on
   */
  applyQuickSearch(quickSearchText: string): void;

  /**
   * Clears Quick Search
   */
  clearQuickSearch(): void;

  /**
   * Retrieves the current Quick Search text
   */
  getQuickSearchValue(): string;

  /**
   *  Retrieves the current Quick Search style
   */
  getQuickSearchStyle(): IStyle;

  /**
   *  Retrieves the current Quick Search display action
   */
  getQuickSearchDisplayAction(): 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell';

  /**
   * Sets the display action for Quick Search
   * Will effect whether or not rows with no matching cells are displayed
   * @param displayAction the display action to use
   */
  setQuickSearchDisplayAction(
    displayAction: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell'
  ): void;

  /**
   * Sets the style for Quick Search
   * This style can be the name of a css style (which you must provide)
   * @param style the style to use
   */
  setQuickSearchStyle(style: IStyle): void;

  /**
   * Opens the Quick Search popup screen
   */
  showQuickSearchPopup(): void;
}
