import { IColumn } from '../../Utilities/Interface/IColumn';
import { ISelectedCellInfo } from '../../Utilities/Interface/SelectedCell/ISelectedCellInfo';
import { ICellSummmary } from '../../Utilities/Interface/SelectedCell/ICellSummmary';
import { ISystemState } from './ISystemState';
import { IColumnSort } from '../IUserState/LayoutState';
export interface GridState extends ISystemState {
  Columns: IColumn[];
  ColumnSorts: IColumnSort[];
  SelectedCellInfo: ISelectedCellInfo;
  CellSummary: ICellSummmary;
  IsQuickFilterActive: boolean;
}
