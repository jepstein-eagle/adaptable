import { IColumnSort } from '../../../PredefinedConfig/IUserState Interfaces/LayoutState';
import { ICustomSort } from '../../../PredefinedConfig/IUserState Interfaces/CustomSortState';

/**
 * Overview of the current sorting state in the grid
 */
export interface IBlotterSortState {
  /**
   * Which columns (if any) have sorting applied and,if so, which direction
   */
  columnSorts: IColumnSort[];
  /**
   * Whether any columns have non-standard sorts applied to them.  Note: this data is always sent even if no custom sorts are currently applied.
   */
  customSorts: ICustomSort[];
}
