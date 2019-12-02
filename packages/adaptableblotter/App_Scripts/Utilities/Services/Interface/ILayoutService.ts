import { AdaptableBlotterColumn } from '../../Interface/AdaptableBlotterColumn';
import { Layout, ColumnSort, PivotDetails } from '../../../PredefinedConfig/LayoutState';
export interface ILayoutService {
  getLayoutDescription(layout: Layout, columns: AdaptableBlotterColumn[]): string;
  getColumnSort(columnSorts: ColumnSort[], columns: AdaptableBlotterColumn[]): string;
  getSortOrder(sortOrder: 'Ascending' | 'Descending'): string;
  autoSaveLayout(): void;
  isPivotedLayout(pivotDetails: PivotDetails): boolean;
}
