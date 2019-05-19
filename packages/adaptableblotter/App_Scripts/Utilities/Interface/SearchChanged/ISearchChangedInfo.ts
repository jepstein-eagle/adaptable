import { IBlotterSortState } from './IBlotterSortState';
import { IBlotterSearchState } from './IBlotterSearchState';
export interface ISearchChangedInfo {
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
  blotterSearchState: IBlotterSearchState;
  /**
   * The current sort state in the Grid
   */
  blotterSortState: IBlotterSortState;
  /**
   * Date the search should use - defaults to now
   * Uuseful if getting historical data
   */
  searchAsAtDate: Date;
}
