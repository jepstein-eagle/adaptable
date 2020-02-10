import { AdaptableColumn } from './Common/AdaptableColumn';
import { SelectedCellInfo } from './Selection/SelectedCellInfo';
import { CellSummmary } from './Selection/CellSummmary';
import { InternalState } from './InternalState';
import { SelectedRowInfo } from './Selection/SelectedRowInfo';
import { AdaptableMenuItem } from './Common/Menu';
import { ColumnSort } from './Common/ColumnSort';

export interface GridState extends InternalState {
  Columns: AdaptableColumn[];
  ColumnSorts: ColumnSort[];
  SelectedCellInfo: SelectedCellInfo;
  SelectedRowInfo: SelectedRowInfo;
  CellSummary: CellSummmary;
  IsQuickFilterActive: boolean;
  MainMenuItems: AdaptableMenuItem[];
  IsLiveReportRunning: boolean;
  IsGridInPivotMode: boolean;
}
