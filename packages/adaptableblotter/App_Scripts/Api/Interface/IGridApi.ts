import { IColumn } from '../../Utilities/Interface/IColumn';
import { GridState } from '../../PredefinedConfig/InternalState/GridState';
import { SelectedCellInfo } from '../../Utilities/Interface/Selection/SelectedCellInfo';
import { ColumnSort } from '../../PredefinedConfig/RunTimeState/LayoutState';
import { GridCell } from '../../Utilities/Interface/Selection/GridCell';
import { SelectedRowInfo } from '../../Utilities/Interface/Selection/SelectedRowInfo';

/**
 * Provides access to important elements of the Adaptable Blotter like columns, sorting, selected cells etc.
 *
 * Many of the methods deal with internal Grid state - i.e. things like column or sort collections that are created at run-time and never persisted as part of user state.
 */
export interface IGridApi {
  /**
   * Returns the whole of the current Grid State
   */
  getGridState(): GridState;
  /**
   * Repopulates the grid; typically used after listening to a SearchChanged event, so appropriately filtered data on the server can be sent to the Blotter.
   *
   * @param data can be any data from any datasource that is suitable for the underlying grid.
   */
  setGridData(data: any): void;

  /** Returns all the columns in the Adaptable Blotter
   *
   * Each column has a number of properties such as Visiblity and Data Type
   */
  getColumns(): IColumn[];

  /**
   * Returns all the visible columns in the Adaptable Blotter
   */
  getVisibleColumns(): IColumn[];

  /**
   * Returns all the numeric columns in the Adaptable Blotter
   */
  getNumericColumns(): IColumn[];

  /**
   * Returns all the Date columns in the Adaptable Blotter
   */
  getDateColumns(): IColumn[];

  /**
   * Returns all the current Column Sort information in the Adaptable Blotter
   */
  getColumnSorts(): ColumnSort[];

  /**
   * Returns all the current Selected Ceslls in the Adaptable Blotter
   */
  getSelectedCellInfo(): SelectedCellInfo;

  /**
   * Returns all the current Selected Rows in the Adaptable Blotter
   */
  getSelectedRowInfo(): SelectedRowInfo;

  /**
   * Updates a cell in the Adaptable Blotter
   * @param id the primaryKeyValue of the row (i.e. the value in the PrimaryKeyColumn identified in Adaptable Blotter Options)
   * @param columnId the column to update
   * @param newValue the new value to use
   */
  setValue(id: any, columnId: string, newValue: any): void;

  /**
   * Replaces an existing cell value in the Adaptable Blotter with that contained in this inputted Grid Cell
   * @param gridCell the new cell
   */

  setGridCell(gridCell: GridCell): void;

  /**
   * Replaces a batch of existing cell values in the Adaptable Blotter with those contained in the inputted Grid Cells
   * @param gridCells the new cells
   */
  setGridCellBatch(gridCells: GridCell[]): void;

  setGlue42On(): void;

  setGlue42Off(): void;
}
