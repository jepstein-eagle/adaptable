import { IColumn } from '../IColumn';
import { ISelectedCell } from './ISelectedCell';
export interface ISelectedCellInfo {
  Columns: IColumn[];
  Selection: Map<any, ISelectedCell[]>;
}
