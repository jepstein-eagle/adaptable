import { IUserState } from './IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
export interface CustomSortState extends IUserState {
  CustomSorts?: CustomSort[];
}

export interface CustomSort extends IAdaptableBlotterObject {
  ColumnId: string;
  SortedValues: string[];
}
