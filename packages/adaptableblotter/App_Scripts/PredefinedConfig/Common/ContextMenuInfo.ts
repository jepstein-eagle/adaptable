import { GridCell } from '../../Utilities/Interface/Selection/GridCell';
import { AdaptableBlotterColumn } from '../../Utilities/Interface/AdaptableBlotterColumn';

export interface ContextMenuInfo {
  // the cell that has been clicked
  gridCell: GridCell;
  // the column in which the cell was clicked
  column: AdaptableBlotterColumn;
  // whether or not the cell clicked is one that is currently selected.
  // important for strategies like Smart Edit where we act on more than one cell
  // our assumption is that we will only do things if the cell clicked is also selected
  isSelectedCell: boolean;
  // whether or not the column that has been clicked is the ONLY column with selected cells
  // important as some strategies will only do stuff if there is just one selected column (e.g. Pie chart) but others dont mind (e.g. cell summary)
  isSingleSelectedColumn: boolean;
  // this will be the node
  rowNode: any;
  primaryKeyValue: any;
}
