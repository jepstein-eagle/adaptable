import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
export interface ColumnCategoryState extends RunTimeState {
  ColumnCategories?: ColumnCategory[];
}

export interface ColumnCategory extends AdaptableBlotterObject {
  ColumnCategoryId: string;
  ColumnIds: string[];
}
