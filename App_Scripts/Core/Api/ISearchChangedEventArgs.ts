import { IAdvancedSearch } from "../../Strategy/Interface/IAdvancedSearchStrategy";
import { IColumnFilter } from "../../Strategy/Interface/IColumnFilterStrategy";
import { SearchChangedTrigger } from "../Enums";
import { IGridSort } from "../Interface/Interfaces";
import { ICustomSort } from "../../Strategy/Interface/ICustomSortStrategy";

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
