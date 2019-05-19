import { IColumnFilter } from '../BlotterObjects/IColumnFilter';
import { IAdvancedSearch } from '../BlotterObjects/IAdvancedSearch';
import { IDataSource } from '../BlotterObjects/IDataSource';
/**
 * The current Search and Filter in the Blotter
 */
export interface IBlotterSearchState {
  /**
   * Current Static Data Source (if any selected)
   */
  dataSource: IDataSource;
  /**
   * Current Advanced Search (if any selected)
   */
  advancedSearch: IAdvancedSearch;
  /**
   * Current live Quick Search text. (Value can be null)
   */
  quickSearch: string;
  /**
   * Details of any column filters currently applied
   */
  columnFilters: IColumnFilter[];
}
