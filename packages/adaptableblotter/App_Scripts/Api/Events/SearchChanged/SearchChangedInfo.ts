import { BlotterSortState } from './BlotterSortState';
import { BlotterSearchState } from './BlotterSearchState';

/**
 * The main argument used in the **SearchChanged Event**
 *
 * Provides full details of the Search (and Sort) state in the Adaptable Blotter together with details of what triggered the event.
 */
export interface SearchChangedInfo {
  /**
   * Which Function in the Adaptable Blotter caused the Search state to change
   *
   * **Note: UserFilter is one of the SearchChangedTriggers because it can be included in a current search or column filter**
   *
   * (The Adaptable Blotter doesn't check whether the updated User Filter is being used - we aim on the side of caution and fire the event more often than is strictly necessary.)
   */
  searchChangedTrigger:
    | 'DataSource'
    | 'AdvancedSearch'
    | 'QuickSearch'
    | 'ColumnFilter'
    | 'UserFilter'
    | 'DataChange'
    | 'Sort';

  /**
   * All current active search and filters in the Grid
   *
   * Take care when translating a Search or Column Filter expression because they might contain System Filters which are "special" filters that have a bespoke resolution (e.g "This Year", "Positive").
   *
   * (You can set in System Filter state which and how many of these System Filters are available in the Blotter).
   */
  blotterSearchState: BlotterSearchState;
  /**
   * The current sort state in the Grid
   *
   * The Adaptable Blotter lists **all custom sorts** in this object even if they are not currently being applied.
   */
  blotterSortState: BlotterSortState;
  /**
   * Date the search should use - defaults to now
   *
   * Useful if getting historical data
   */
  searchAsAtDate: Date;
}
