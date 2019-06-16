import { IUserState } from './IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
export interface ColumnCategoryState extends IUserState {
  ColumnCategories?: IColumnCategory[];
}

export interface IColumnCategory extends IAdaptableBlotterObject {
  ColumnCategoryId: string;
  ColumnIds: string[];
}
