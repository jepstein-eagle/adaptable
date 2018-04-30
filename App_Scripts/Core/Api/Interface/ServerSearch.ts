import { IAdvancedSearch, ICustomSort, IColumnFilter, IGridSort } from "./AdaptableBlotterObjects";

/**
 * EventArgs sent as part of the onSearchedChanged Event
 */
export interface ISearchChangedEventArgs {
  /**
   * Enum stating what caused the Search state in the Grid to chagne
   */
  SearchChangedTrigger: SearchChangedTrigger;

  /**
   * Overview of the current active search and filters in the Grid
   */
  BlotterSearchState: IBlotterSearchState;

  /**
   * Overview of the current sort state in the Grid
   */
  BlotterSortState: IBlotterSortState;
}


/**
 * The current Search and Filter in the Blotter
 */
export interface IBlotterSearchState {
  /**
   * What the current Advanced search is
   */
  AdvancedSearch: IAdvancedSearch;

  /**
   * The text of the current live Quick Search. (Value can be null)
   */
  QuickSearch: string;

  /**
   * Details of any column filters that are currently applied
   */
  ColumnFilters: IColumnFilter[];
}


/**
 * Overview of the current sorting state in the grid
 */
export interface IBlotterSortState {
  /**
   * Which columns (if any) have sorting applied and,if so, which direction
   */
  GridSorts: IGridSort[];

  /**
   * Whether any columns have non-standard sorts applied to them.  Note: this data is always sent even if no custom sorts are currently applied.
   */
  CustomSorts: ICustomSort[];
}


/**
 * Provide information on what action caused the search and filter state to change.
 */
export enum SearchChangedTrigger {
  AdvancedSearch = 'AdvancedSearch',
  QuickSearch = 'QuickSearch',
  ColumnFilter = 'ColumnFilter',
  UserFilter = 'UserFilter',
  DataChange = 'DataChange',
  Sort = 'Sort',
}

export enum ServerSearchOption {
  None = 'None',
  AdvancedSearch = 'AdvancedSearch',
  AllSearch = 'AllSearch',
  AllSearchandSort = 'AllSearchandSort'
}