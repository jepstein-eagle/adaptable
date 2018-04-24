import { IAdvancedSearch } from "../../Strategy/Interface/IAdvancedSearchStrategy";
import { IColumnFilter } from "../../Strategy/Interface/IColumnFilterStrategy";
import { SearchChangedTrigger } from "../Enums";

export interface ISearchChangedArgs {
  SearchChangedTrigger: SearchChangedTrigger
  AdvancedSearch: IAdvancedSearch
  QuickSearchText: string
  ColumnFilters: IColumnFilter[]
}
