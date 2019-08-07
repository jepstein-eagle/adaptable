import { IColumn } from '../IColumn';
import { GridCell } from './GridCell';
export interface SelectedCellInfo {
  Columns: IColumn[];
  GridCells: GridCell[];
}
