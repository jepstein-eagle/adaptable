import { IUserState } from '../Interfaces/IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
export interface CustomSortState extends IUserState {
  CustomSorts?: ICustomSort[];
}

export interface ICustomSort extends IAdaptableBlotterObject {
  ColumnId: string;
  SortedValues: string[];
}
