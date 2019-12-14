import { BlotterEventArgs, AdaptableBlotterEventData } from './BlotterEvents';
import { DataSource } from '../../PredefinedConfig/DataSourceState';
import { AdvancedSearch } from '../../PredefinedConfig/AdvancedSearchState';
import { ColumnFilter } from '../../PredefinedConfig/ColumnFilterState';
import { ColumnSort } from '../../PredefinedConfig/LayoutState';
import { CustomSort } from '../../PredefinedConfig/CustomSortState';

/**
 * EventArgs sent as part of the onSearchChanged Event
 *
 * It includes full and comprehensive details of the state of **all the search and filter related functions** in the Adaptable Blotter
 *
 * It also includes a SearchChangedTrigger which tells you **which function** was responsible for the change in Search state.
 */
export interface SearchChangedEventArgs extends BlotterEventArgs {
  data: SearchEventData[];
}

/**
 * Provides details of the state of all Search and Filter related functions in the Adaptable Blotter.
 */
export interface SearchEventData extends AdaptableBlotterEventData {
  id: SearchChangedInfo;
}
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

/**
 * The current Search and Filter in the Blotter
 */
export interface BlotterSearchState {
  /**
   * Current Data Source (if any selected)
   */
  dataSource: DataSource;
  /**
   * Current Advanced Search (if any selected)
   */
  advancedSearch: AdvancedSearch;
  /**
   * Current live Quick Search text. (Value can be null / empty)
   */
  quickSearch: string;
  /**
   * Details of any column filters currently applied
   */
  columnFilters: ColumnFilter[];
}

/**
 * Overview of the current sorting state in the grid
 */
export interface BlotterSortState {
  /**
   * Which columns (if any) have sorting applied and,if so, which direction
   */
  columnSorts: ColumnSort[];
  /**
   * Whether any columns have non-standard sorts applied to them.  Note: this data is always sent even if no custom sorts are currently applied.
   */
  customSorts: CustomSort[];
}
