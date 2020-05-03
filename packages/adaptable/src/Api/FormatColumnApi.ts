import { AdaptableStyle } from '../PredefinedConfig/Common/AdaptableStyle';
import { FormatColumnState, FormatColumn } from '../PredefinedConfig/FormatColumnState';

/**
 * Provides full and comprehensive run-time access to the Format Column function and associated state.
 *
 * Includes functions for retrieving, adding, editing and deleting Format Columns.
 *
 * A Format Column is a column that is given a specific `Style` or `DisplayFormat` that is always rendered.
 *
 * ### Further Information
 * - [Format Column State](_src_predefinedconfig_formatcolumnstate_.formatcolumnstate.html)
 * - [Format Column Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/format-column-function.md)
 * - [Format Column Demo](https://demo.adaptableblotter.com/style/aggridformatcolumndemo/)
 * - [Format Column Video](https://youtu.be/tYTGQ1ufhbc)
 */
export interface FormatColumnApi {
  /**
   * Retrieves the Format Column section from Adaptable State
   */
  getFormatColumnState(): FormatColumnState;

  /**
   * Retrieves all Format Columns in Adaptable State
   */
  getAllFormatColumn(): FormatColumn[];

  /**
   * Retrieves all Format Columns in Adaptable State which have the `Style` property set
   */
  getAllFormatColumnWithStyle(): FormatColumn[];

  /**
   * Retrieves all Format Columns in Adaptable State which have the `DisplayFormat` property set
   */
  getAllFormatColumnWithDisplayFormat(): FormatColumn[];

  /**
   * Adds a new Format Column
   * @param column The column to apply the Style to
   * @param style The Style to apply - (see [Style Object](https://api.adaptabletools.com/interfaces/_predefinedconfig_common_istyle_.istyle.html) for more details)
   */
  addFormatColumn(column: string, style: AdaptableStyle): void;

  /**
   * Updates an existing Format Column
   * @param column The colunn to update the style for.
   * @param style The Style to update - (see [Style Object](https://api.adaptabletools.com/interfaces/_predefinedconfig_common_istyle_.istyle.html) for more details)
   */
  updateFormatColumn(column: string, style: AdaptableStyle): void;

  /**
   * Deletes an existing Format Column
   * @param formatColumn The Format Column to delete
   */
  deleteFormatColumn(formatColumn: FormatColumn): void;

  /**
   * Deletes **all** Format Columns in the Adaptable State
   */
  deleteAllFormatColumn(): void;

  /**
   * Applies the display format for all Format Columns in the State
   *
   * Should rarely be used but available just in case it is necessary for whatever reason
   */
  applyFormatColumnDisplayFormats(): void;

  /**
   * Opens the Format Column popup screen
   */
  showFormatColumnPopup(): void;
}
