import { IAdvancedSearch, ICustomSort, IColumnFilter, IGridSort } from "./AdaptableBlotterObjects";

/**
 * EventArgs sent as part of the onSearchedChanged Event
 */
export interface ISearchChangedEventArgs {
  /**
   * Which action in the grid caused the Search state to chagne
   */
  SearchChangedTrigger: "AdvancedSearch" | "QuickSearch" | "ColumnFilter" | "UserFilter"| "DataChange"| "Sort";

  /**
   * All current active search and filters in the Grid
   */
  BlotterSearchState: IBlotterSearchState;

  /**
   * The current sort state in the Grid
   */
  BlotterSortState: IBlotterSortState;
}


/**
 * The current Search and Filter in the Blotter
 */
export interface IBlotterSearchState {
  /**
   * Current Advanced Search (if any selected)
   */
  AdvancedSearch: IAdvancedSearch;

  /**
   * Current live Quick Search text. (Value can be null)
   */
  QuickSearch: string;

  /**
   * Details of any column filters currently applied
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




