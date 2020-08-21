import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { Layout } from '../../../PredefinedConfig/LayoutState';

export interface ILayoutService {
  getLayoutDescription(layout: Layout, columns: AdaptableColumn[]): string;

  createDefaultLayoutIfNeeded(): Layout | null;
}
