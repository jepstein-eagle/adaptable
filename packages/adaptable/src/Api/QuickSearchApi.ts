import { AdaptableStyle } from '../PredefinedConfig/Common/AdaptableStyle';
import { QuickSearchState } from '../PredefinedConfig/QuickSearchState';

/**
 * Provides full and comprehensive run-time access to the Quick Search function and associated state.
 *
 * Quick Search runs a simply text-based search across all **visible columns**
 *
 * There are wildcards available (e.g s* for >15) to improve the search behaviour.
 *
 * --------------
 *
 *  ### Further AdapTable Help Resources
 *
 * - [Quick Search Demo](https://demo.adaptabletools.com/search/aggridquicksearchdemo/)
 *
 * - {@link QuickSearchState|Quick Search State}
 *
 * - {@link SearchOptions|Search Options}
 *
 * - [Quick Search Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/quick-search-function.md)
 *
 * --------------
 */
export interface QuickSearchApi {
  /**
   * Retrieves all the Quick Search section from Adaptable State
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
  getQuickSearchStyle(): AdaptableStyle;

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
  setQuickSearchStyle(style: AdaptableStyle): void;

  /**
   * Opens the Quick Search popup screen
   */
  showQuickSearchPopup(): void;
}
