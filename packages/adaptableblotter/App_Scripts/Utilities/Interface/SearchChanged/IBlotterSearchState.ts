import { IDataSource } from '../../../PredefinedConfig/IUserState Interfaces/DataSourceState';
import { IAdvancedSearch } from '../../../PredefinedConfig/IUserState Interfaces/AdvancedSearchState';
import { IColumnFilter } from '../../../PredefinedConfig/IUserState Interfaces/ColumnFilterState';

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
