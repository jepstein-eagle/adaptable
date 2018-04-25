import { IAdvancedSearch } from "../../Strategy/Interface/IAdvancedSearchStrategy";
import { IColumnFilter } from "../../Strategy/Interface/IColumnFilterStrategy";
import { SearchChangedTrigger } from "../Enums";

export interface ISearchChangedEventArgs {
  SearchChangedTrigger: SearchChangedTrigger
  AdvancedSearch: IAdvancedSearch
  QuickSearch: string
  ColumnFilters: IColumnFilter[]
}
