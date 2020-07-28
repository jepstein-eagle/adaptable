import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { Layout, PivotDetails } from '../../../PredefinedConfig/LayoutState';
import { ColumnSort } from '../../../PredefinedConfig/Common/ColumnSort';
export interface ILayoutService {
  getLayoutDescription(layout: Layout, columns: AdaptableColumn[]): string;
  getColumnSort(columnSorts: ColumnSort[], columns: AdaptableColumn[]): string;
  getSortOrder(sortOrder: 'Ascending' | 'Descending'): string;

  areEqual(layout1: Layout, layout2: Layout): boolean;
  createDefaultLayoutIfNeeded(): Layout | null;
  isPivotedLayout(pivotDetails: PivotDetails): boolean;

  getSortsForLayout(layout: Layout): ColumnSort[];
}
