import { IColumn } from '../IColumn';
import { ISelectedCell } from './ISelectedCell';
export interface ISelectedCellInfo {
  Columns: IColumn[];
  SelectedCells: ISelectedCell[];
}
