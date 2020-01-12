import { AdaptableColumn } from './Common/AdaptableColumn';
import { SelectedCellInfo } from '../Utilities/Interface/Selection/SelectedCellInfo';
import { CellSummmary } from '../Utilities/Interface/Selection/CellSummmary';
import { InternalState } from './InternalState';
import { SelectedRowInfo } from '../Utilities/Interface/Selection/SelectedRowInfo';
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
  IsGlue42Available: boolean;
  IsLiveReportRunning: boolean;
  IsGridInPivotMode: boolean;
}
