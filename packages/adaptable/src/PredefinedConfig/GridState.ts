import { AdaptableColumn } from './Common/AdaptableColumn';
import { SelectedCellInfo } from './Selection/SelectedCellInfo';
import { CellSummmary } from './Selection/CellSummmary';
import { InternalState } from './InternalState';
import { SelectedRowInfo } from './Selection/SelectedRowInfo';
import { AdaptableMenuItem } from './Common/Menu';
import { ColumnSort } from './Common/ColumnSort';
import { Layout } from './LayoutState';

export interface GridState extends InternalState {
  Columns: AdaptableColumn[];
  CurrentLayout: Layout | null;
  ColumnSorts: ColumnSort[];
  SelectedCellInfo: SelectedCellInfo;
  SelectedRowInfo: SelectedRowInfo;
  CellSummary: CellSummmary;
  IsQuickFilterVisible: boolean;
  MainMenuItems: AdaptableMenuItem[];
  IsGridInPivotMode: boolean;
  IsGridInTreeMode: boolean;
}
