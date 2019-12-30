import { AdaptableColumn } from './Common/AdaptableColumn';
import { SelectedCellInfo } from '../Utilities/Interface/Selection/SelectedCellInfo';
import { ICellSummmary } from '../Utilities/Interface/Selection/ICellSummmary';
import { InternalState } from './InternalState';
import { SelectedRowInfo } from '../Utilities/Interface/Selection/SelectedRowInfo';
import { ColumnSort } from './LayoutState';
import { AdaptableMenuItem } from './Common/Menu';

export interface GridState extends InternalState {
  Columns: AdaptableColumn[];
  ColumnSorts: ColumnSort[];
  SelectedCellInfo: SelectedCellInfo;
  SelectedRowInfo: SelectedRowInfo;
  CellSummary: ICellSummmary;
  IsQuickFilterActive: boolean;
  MainMenuItems: AdaptableMenuItem[];
  IsGlue42Available: boolean;
  IsIPushPullAvailable: boolean;
  IsLiveReportRunning: boolean;
  IsGridInPivotMode: boolean;
}
