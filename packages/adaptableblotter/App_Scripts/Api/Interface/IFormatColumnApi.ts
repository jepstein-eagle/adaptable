import { IStyle } from '../../PredefinedConfig/Common/IStyle';
import {
  FormatColumnState,
  FormatColumn,
} from '../../PredefinedConfig/RunTimeState/FormatColumnState';

/**
 * Provides full and comprehensive run-time access to the Format Column function and associated state.
 *
 * Format Columns are columns which are given a style that is **always** applied (unlike Conditional Styles where the style is dependent on a rule being met).
 */
export interface IFormatColumnApi {
  /**
   * Retrieves the Format Column State
   */
  getFormatColumnState(): FormatColumnState;

  /**
   * Gets all Format Columns in the State
   */
  getAllFormatColumn(): FormatColumn[];

  /**
   * Adds a new Format Column
   * @param column The column to apply the Style to
   * @param style The Style to apply - (see [Style Object](https://api.adaptableblotter.com/interfaces/_predefinedconfig_common_istyle_.istyle.html) for more details)
   */
  addFormatColumn(column: string, style: IStyle): void;

  /**
   * Updates an existing Format Column
   * @param column The colunn to update the style for.
   * @param style The Style to update - (see [Style Object](https://api.adaptableblotter.com/interfaces/_predefinedconfig_common_istyle_.istyle.html) for more details)
   */
  updateFormatColumn(column: string, style: IStyle): void;

  /**
   * Deletes an existing Format Column
   * @param formatColumn The Format Column to delete
   */
  deleteFormatColumn(formatColumn: FormatColumn): void;

  /**
   * Deletes **all** Format Columns in the State
   */
  deleteAllFormatColumn(): void;
}
