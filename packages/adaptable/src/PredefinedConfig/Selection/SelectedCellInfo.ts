import { AdaptableColumn } from '../Common/AdaptableColumn';
import { GridCell } from './GridCell';
export interface SelectedCellInfo {
  Columns: AdaptableColumn[];
  GridCells: GridCell[];
}
