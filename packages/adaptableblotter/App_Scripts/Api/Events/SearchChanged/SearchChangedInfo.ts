import { BlotterSortState } from './BlotterSortState';
import { BlotterSearchState } from './BlotterSearchState';
export interface SearchChangedInfo {
  /**
   * Which action in the grid caused the Search state to chagne
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
   */
  blotterSearchState: BlotterSearchState;
  /**
   * The current sort state in the Grid
   */
  blotterSortState: BlotterSortState;
  /**
   * Date the search should use - defaults to now
   * Uuseful if getting historical data
   */
  searchAsAtDate: Date;
}
