import { IColumn } from '../../Utilities/Interface/IColumn';
import { ISelectedCellInfo } from '../../Utilities/Interface/SelectedCell/ISelectedCellInfo';
import { ICellSummmary } from '../../Utilities/Interface/SelectedCell/ICellSummmary';
import { InternalState } from './InternalState';
import { ColumnSort } from '../RunTimeState/LayoutState';
export interface GridState extends InternalState {
  Columns: IColumn[];
  ColumnSorts: ColumnSort[];
  SelectedCellInfo: ISelectedCellInfo;
  CellSummary: ICellSummmary;
  IsQuickFilterActive: boolean;
}
