import { DataSource } from '../../../PredefinedConfig/RunTimeState/DataSourceState';
import { AdvancedSearch } from '../../../PredefinedConfig/RunTimeState/AdvancedSearchState';
import { ColumnFilter } from '../../../PredefinedConfig/RunTimeState/ColumnFilterState';

/**
 * The current Search and Filter in the Blotter
 */
export interface BlotterSearchState {
  /**
   * Current Data Source (if any selected)
   */
  dataSource: DataSource;
  /**
   * Current Advanced Search (if any selected)
   */
  advancedSearch: AdvancedSearch;
  /**
   * Current live Quick Search text. (Value can be null / empty)
   */
  quickSearch: string;
  /**
   * Details of any column filters currently applied
   */
  columnFilters: ColumnFilter[];
}
