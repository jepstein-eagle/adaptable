import { AdaptableBlotterColumn } from '../Utilities/Interface/AdaptableBlotterColumn';
import { SelectedCellInfo } from '../Utilities/Interface/Selection/SelectedCellInfo';
import { ICellSummmary } from '../Utilities/Interface/Selection/ICellSummmary';
import { InternalState } from './InternalState';
import { SelectedRowInfo } from '../Utilities/Interface/Selection/SelectedRowInfo';
import { AdaptableBlotterMenuItem } from './Common/AdaptableBlotterMenuItem';
import { ColumnSort } from './LayoutState';

export interface GridState extends InternalState {
  Columns: AdaptableBlotterColumn[];
  ColumnSorts: ColumnSort[];
  SelectedCellInfo: SelectedCellInfo;
  SelectedRowInfo: SelectedRowInfo;
  CellSummary: ICellSummmary;
  IsQuickFilterActive: boolean;
  MainMenuItems: AdaptableBlotterMenuItem[];
  IsGlue42Running: boolean;
  IsIPushPullRunning: boolean;
  IsGridInPivotMode: boolean;
}
