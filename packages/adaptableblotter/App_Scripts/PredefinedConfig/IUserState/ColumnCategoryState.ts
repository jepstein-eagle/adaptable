import { IUserState } from './IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
export interface ColumnCategoryState extends IUserState {
  ColumnCategories?: ColumnCategory[];
}

export interface ColumnCategory extends IAdaptableBlotterObject {
  ColumnCategoryId: string;
  ColumnIds: string[];
}
