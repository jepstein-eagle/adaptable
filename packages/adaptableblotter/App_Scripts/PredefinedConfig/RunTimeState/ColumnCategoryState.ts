import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
export interface ColumnCategoryState extends RunTimeState {
  ColumnCategories?: ColumnCategory[];
}

export interface ColumnCategory extends AdaptableBlotterObject {
  ColumnCategoryId: string;
  ColumnIds: string[];
}

/*
A collection of Column Category objects. Each Column Category contains a name (ColumnCategoryId) and a group of columns associated with that Category.
*/
