import { AdaptableBlotterColumn } from './Common/AdaptableBlotterColumn';
import { SelectedCellInfo } from '../Utilities/Interface/Selection/SelectedCellInfo';
import { ICellSummmary } from '../Utilities/Interface/Selection/ICellSummmary';
import { InternalState } from './InternalState';
import { SelectedRowInfo } from '../Utilities/Interface/Selection/SelectedRowInfo';
import { ColumnSort } from './LayoutState';
import { AdaptableBlotterMenuItem } from './Common/Menu';

export interface GridState extends InternalState {
  Columns: AdaptableBlotterColumn[];
  ColumnSorts: ColumnSort[];
  SelectedCellInfo: SelectedCellInfo;
  SelectedRowInfo: SelectedRowInfo;
  CellSummary: ICellSummmary;
  IsQuickFilterActive: boolean;
  MainMenuItems: AdaptableBlotterMenuItem[];
  IsGlue42Available: boolean;
  isIPushPullAvailable: boolean;
  IsLiveReportRunning: boolean;
  IsGridInPivotMode: boolean;
}
