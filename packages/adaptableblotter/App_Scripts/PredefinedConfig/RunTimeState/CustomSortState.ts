import { RunTimeState } from './RunTimeState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
export interface CustomSortState extends RunTimeState {
  CustomSorts?: CustomSort[];
}

export interface CustomSort extends IAdaptableBlotterObject {
  ColumnId: string;
  SortedValues: string[];
}
