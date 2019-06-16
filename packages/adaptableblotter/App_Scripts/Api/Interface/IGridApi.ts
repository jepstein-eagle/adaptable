import { IColumn } from '../../Utilities/Interface/IColumn';
import { GridState } from '../../PredefinedConfig/ISystemState Interfaces/GridState';
import { ISelectedCellInfo } from '../../Utilities/Interface/SelectedCell/ISelectedCellInfo';
import { IColumnSort } from '../../PredefinedConfig/IUserState Interfaces/LayoutState';

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

  getColumnSorts(): IColumnSort[];

  getSelectedCellInfo(): ISelectedCellInfo;
}
