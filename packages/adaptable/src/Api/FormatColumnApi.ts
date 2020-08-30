import { AdaptableStyle } from '../PredefinedConfig/Common/AdaptableStyle';
import { FormatColumnState, FormatColumn } from '../PredefinedConfig/FormatColumnState';
import { AdaptableColumn } from '../types';

/**
 * Provides full and comprehensive run-time access to the Format Column function and associated state.
 *
 * Includes functions for retrieving, adding, editing and deleting Format Columns.
 *
 * A Format Column is a column that is given a specific `Style`, `DisplayFormat` or `CellAlignment` that is always (i.e. unconditionally) rendered.
 *
 * --------------
 *
 * ### Further Information
 *
 * - {@link FormatColumnState|Format Column State}
 *
 * - [Format Column Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/format-column-function.md)
 *
 * - [Format Column Demo](https://demo.adaptableblotter.com/style/aggridformatcolumndemo/)
 *
 * - [Format Column Video](https://youtu.be/tYTGQ1ufhbc)
 *
 * --------------
 *
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
   * Retrieves all Format Columns in Adaptable State which have the `CellAlignment` property set
   */
  getAllFormatColumnWithCellAlignment(): FormatColumn[];

  addFormatColumn(formatColumn: FormatColumn): void;

  editFormatColumn(formatColumn: FormatColumn): void;

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

  getFormatColumnForColumn(column: AdaptableColumn): FormatColumn | undefined;
  getFormatColumnWithStyleForColumn(column: AdaptableColumn): FormatColumn | undefined;
  getFormatColumnWithDisplayFormatForColumn(column: AdaptableColumn): FormatColumn | undefined;

  hasStyleFormatColumns(): boolean;

  //  getFormatColumnsWithAllScope(): FormatColumn[] | undefined;
  //  getFormatColumnsWithDataTypeScope(): FormatColumn[] | undefined;
  //  getFormatColumnsWithColumnScope(): FormatColumn[] | undefined;
}
