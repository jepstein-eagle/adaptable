import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { Layout, PivotDetails } from '../../../PredefinedConfig/LayoutState';
import { ColumnSort } from '../../../PredefinedConfig/Common/ColumnSort';
export interface ILayoutService {
  getLayoutDescription(layout: Layout, columns: AdaptableColumn[]): string;
  getColumnSort(columnSorts: ColumnSort[], columns: AdaptableColumn[]): string;
  getSortOrder(sortOrder: 'Ascending' | 'Descending'): string;
  autoSaveLayout(): void;
  isPivotedLayout(pivotDetails: PivotDetails): boolean;
  isLayoutModified(layoutEntity: Layout): boolean;
}
