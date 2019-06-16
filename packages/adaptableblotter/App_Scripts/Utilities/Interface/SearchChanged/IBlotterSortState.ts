import { ColumnSort } from '../../../PredefinedConfig/RunTimeState/LayoutState';
import { CustomSort } from '../../../PredefinedConfig/RunTimeState/CustomSortState';

/**
 * Overview of the current sorting state in the grid
 */
export interface IBlotterSortState {
  /**
   * Which columns (if any) have sorting applied and,if so, which direction
   */
  columnSorts: ColumnSort[];
  /**
   * Whether any columns have non-standard sorts applied to them.  Note: this data is always sent even if no custom sorts are currently applied.
   */
  customSorts: CustomSort[];
}
