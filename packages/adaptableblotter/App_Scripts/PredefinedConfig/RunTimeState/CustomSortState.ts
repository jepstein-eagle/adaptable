import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
export interface CustomSortState extends RunTimeState {
  CustomSorts?: CustomSort[];
}

export interface CustomSort extends AdaptableBlotterObject {
  ColumnId: string;
  SortedValues: string[];
}

/*
A collection of Custom Sorts

An ICustomSort consists of 2 properties: (see section below for more information).

ColumnId: The column which will be sorted

Sorted Values: The values to apply in the sort order list. Any values not included will be sorted alphabetically.
*/
