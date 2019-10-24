import { AdaptableBlotterColumn } from '../../Utilities/Interface/AdaptableBlotterColumn';
import { GridState } from '../../PredefinedConfig/InternalState/GridState';
import { SelectedCellInfo } from '../../Utilities/Interface/Selection/SelectedCellInfo';
import { ColumnSort } from '../../PredefinedConfig/RunTimeState/LayoutState';
import { GridCell } from '../../Utilities/Interface/Selection/GridCell';
import { SelectedRowInfo } from '../../Utilities/Interface/Selection/SelectedRowInfo';
import { AdaptableBlotterMenuItem } from '../../Utilities/MenuItem';

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

  /**
   * Updates the Adaptable Blotter (and underlying grid) with rows that have changed.
   *
   * @param dataRows the rows which have been updated.  Send the whole row and the Adaptable Blotter and underlying grid will take care of the rest.
   */
  updateGridData(dataRows: any[]): void;

  addGridData(dataRows: any[]): void;

  deleteGridData(dataRows: any[]): void;

  /** Returns all the columns in the Adaptable Blotter
   *
   * Each column has a number of properties such as Visiblity and Data Type
   */
  getColumns(): AdaptableBlotterColumn[];

  /**
   * Returns all the visible columns in the Adaptable Blotter
   */
  getVisibleColumns(): AdaptableBlotterColumn[];

  /**
   * Returns all the numeric columns in the Adaptable Blotter
   */
  getNumericColumns(): AdaptableBlotterColumn[];

  /**
   * Returns all the Date columns in the Adaptable Blotter
   */
  getDateColumns(): AdaptableBlotterColumn[];

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

  setColumns(columns: AdaptableBlotterColumn[]): void;

  setMainMenuItems(menuItems: AdaptableBlotterMenuItem[]): void;

  setSelectedCells(selectedCellInfo: SelectedCellInfo): void;

  setSelectedRows(selectedRowInfo: SelectedRowInfo): void;

  showQuickFilterBar(): void;

  setGlue42On(): void;

  setGlue42Off(): void;

  setPivotModeOn(): void;

  setPivotModeOff(): void;

  isGridInPivotMode(): boolean;

  addAdaptableBlotterColumn(adaptableBlotterColumn: AdaptableBlotterColumn): void;

  setColumnSorts(columnSorts: ColumnSort[]): void;
}
