import { IAdvancedSearch, ICustomSort, IColumnFilter, IGridSort } from "./AdaptableBlotterObjects";
import { SearchChangedTrigger } from "../Enums";

export interface IBlotterSearchState {
  AdvancedSearch: IAdvancedSearch;
  QuickSearch: string;
  ColumnFilters: IColumnFilter[];
}

export interface IBlotterSortState {
  GridSorts: IGridSort[];
  CustomSorts: ICustomSort[];
}

export interface ISearchChangedEventArgs {
  SearchChangedTrigger: SearchChangedTrigger;
  BlotterSearchState: IBlotterSearchState;
  BlotterSortState: IBlotterSortState;
}
