import { AdaptableEventArgs, AdaptableEventData, AdaptableEventInfo } from './AdaptableEvents';
import { DataSource } from '../../PredefinedConfig/DataSourceState';
import { CustomSort } from '../../PredefinedConfig/CustomSortState';
import { ColumnSort } from '../../PredefinedConfig/Common/ColumnSort';
import { UserFilter } from '../../PredefinedConfig/UserFilterState';
import { ColumnFilter } from '../../PredefinedConfig/FilterState';

/**
 * EventArgs sent as part of the on'SearchChanged' Event
 *
 * It includes full and comprehensive details of the state of **all the search and filter related functions** in Adaptable
 *
 * It also includes a SearchChangedTrigger which tells you **which function** was responsible for the change in Search state.
 */
export interface SearchChangedEventArgs extends AdaptableEventArgs {
  data: SearchEventData[];
}

/**
 * Provides details of the state of all Search and Filter related functions in Adaptable.
 */
export interface SearchEventData extends AdaptableEventData {
  id: SearchChangedInfo;
}
/**
 * The main argument used in the **SearchChanged Event**
 *
 * Provides full details of the Search (and Sort) state in Adaptable together with details of what triggered the event.
 */
export interface SearchChangedInfo extends AdaptableEventInfo {
  /**
   * Which Function in Adaptable caused the Search state to change
   *
   * **Note: UserFilter is one of the SearchChangedTriggers because it can be included in a current search or column filter**
   *
   * (Adaptable doesn't check whether the updated User Filter is being used - we aim on the side of caution and fire the event more often than is strictly necessary.)
   */
  searchChangedTrigger:
    | 'DataSource'
    | 'AdvancedSearch'
    | 'QuickSearch'
    | 'Filter'
    | 'UserFilter'
    | 'DataChange'
    | 'Sort';

  /**
   * All current active search and filters in the Grid
   *
   * Take care when translating a Search or Column Filter expression because they might contain System Filters which are "special" filters that have a bespoke resolution (e.g "This Year", "Positive").
   *
   * (You can set in System Filter state which and how many of these System Filters are available in Adaptable).
   */
  adaptableSearchState: AdaptableSearchState;
  /**
   * The current sort state in the Grid
   *
   * Adaptable lists **all custom sorts** in this object even if they are not currently being applied.
   */
  adaptableSortState: AdaptableSortState;
  /**
   * Date the search should use - defaults to now
   *
   * Useful if getting historical data
   */
  searchAsAtDate: Date;
}

/**
 * The current Search and Filter in Adaptable
 */
export interface AdaptableSearchState {
  /**
   * Current Data Source (if any selected)
   */
  dataSource: DataSource | undefined;
  /**
   * Current Advanced Search (if any selected)
   */
  advancedSearch: string | undefined;
  /**
   * Current live Quick Search text. (Value can be null / empty)
   */
  quickSearch: string | undefined;
  /**
   * Details of any column filters **currently applied**
   */
  columnFilters: ColumnFilter[] | undefined;
  /**
   * Details of **all User Filters** in the Adaptable State
   */
  userFilters: UserFilter[] | undefined;
}

/**
 * Overview of the current sorting state in the grid
 */
export interface AdaptableSortState {
  /**
   * Which columns (if any) have sorting applied and,if so, which direction
   */
  columnSorts: ColumnSort[];
  /**
   * Whether any columns have non-standard sorts applied to them.  Note: this data is always sent even if no custom sorts are currently applied.
   */
  customSorts: CustomSort[];
}
