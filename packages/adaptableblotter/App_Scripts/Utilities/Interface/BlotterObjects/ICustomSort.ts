import { IAdaptableBlotterObject } from './IAdaptableBlotterObject';
export interface ICustomSort extends IAdaptableBlotterObject {
  ColumnId: string;
  SortedValues: string[];
}
