import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { Layout } from '../../../PredefinedConfig/LayoutState';
import { ColumnSort } from '../../../PredefinedConfig/Common/ColumnSort';
export interface ILayoutService {
  getLayoutDescription(layout: Layout, columns: AdaptableColumn[]): string;
  getColumnSort(columnSorts: ColumnSort[], columns: AdaptableColumn[]): string;
  getSortOrder(sortOrder: 'Asc' | 'Desc'): string;

  areEqual(layout1: Layout, layout2: Layout): boolean;
  createDefaultLayoutIfNeeded(): Layout | null;

  getSortsForLayout(layout: Layout): ColumnSort[];
}
