import { IColumn } from '../IColumn';
import { GridCell } from './GridCell';
export interface ISelectedCellInfo {
  Columns: IColumn[];
  GridCells: GridCell[];
}
