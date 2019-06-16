import { RunTimeState } from './RunTimeState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
export interface ColumnCategoryState extends RunTimeState {
  ColumnCategories?: ColumnCategory[];
}

export interface ColumnCategory extends IAdaptableBlotterObject {
  ColumnCategoryId: string;
  ColumnIds: string[];
}
