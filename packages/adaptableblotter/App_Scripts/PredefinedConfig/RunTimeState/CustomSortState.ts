import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
export interface CustomSortState extends RunTimeState {
  CustomSorts?: CustomSort[];
}

export interface CustomSort extends AdaptableBlotterObject {
  ColumnId: string;
  SortedValues: string[];
}
