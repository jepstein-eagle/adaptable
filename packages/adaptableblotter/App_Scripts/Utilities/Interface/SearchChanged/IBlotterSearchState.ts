import { DataSource } from '../../../PredefinedConfig/IUserState/DataSourceState';
import { AdvancedSearch } from '../../../PredefinedConfig/IUserState/AdvancedSearchState';
import { ColumnFilter } from '../../../PredefinedConfig/IUserState/ColumnFilterState';

/**
 * The current Search and Filter in the Blotter
 */
export interface IBlotterSearchState {
  /**
   * Current Static Data Source (if any selected)
   */
  dataSource: DataSource;
  /**
   * Current Advanced Search (if any selected)
   */
  advancedSearch: AdvancedSearch;
  /**
   * Current live Quick Search text. (Value can be null)
   */
  quickSearch: string;
  /**
   * Details of any column filters currently applied
   */
  columnFilters: ColumnFilter[];
}
