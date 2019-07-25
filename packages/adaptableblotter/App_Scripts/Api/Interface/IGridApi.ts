import { IColumn } from '../../Utilities/Interface/IColumn';
import { GridState } from '../../PredefinedConfig/InternalState/GridState';
import { ISelectedCellInfo } from '../../Utilities/Interface/SelectedCell/ISelectedCellInfo';
import { ColumnSort } from '../../PredefinedConfig/RunTimeState/LayoutState';
import { GridCell } from '../../Utilities/Interface/SelectedCell/GridCell';

export interface IGridApi {
  getGridState(): GridState;
  /**
   * Repopulates the grid; typically used after listening to a SearchChanged event, so appropriately filtered data on the server can be sent to the Blotter.
   * @param data can be any data from any datasource that is suitable for the underlying grid.
   */
  setGridData(data: any): void;

  getColumns(): IColumn[];

  getVisibleColumns(): IColumn[];

  getNumericColumns(): IColumn[];

  getColumnSorts(): ColumnSort[];

  getSelectedCellInfo(): ISelectedCellInfo;

  /**
   * Updates a cell in the Adaptable Blotter
   * @param id the primaryKeyValue of the row (i.e. the value in the PrimaryKeyColumn identified in Adaptable Blotter Options)
   * @param columnId the column to update
   * @param newValue the new value to use
   */
  setValue(id: any, columnId: string, newValue: any): void;

  setGridCell(gridCell: GridCell): void;

  setGridCellBatch(gridCells: GridCell[]): void;
}
