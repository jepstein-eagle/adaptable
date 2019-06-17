import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';

export interface LayoutState extends RunTimeState {
  CurrentLayout?: string;
  Layouts?: Layout[];
}

export interface Layout extends AdaptableBlotterObject {
  Name: string;
  Columns: string[];
  ColumnSorts?: ColumnSort[];
  VendorGridInfo?: VendorGridInfo;
}

export interface ColumnSort {
  Column: string;
  SortOrder: 'Unknown' | 'Ascending' | 'Descending';
}

export interface VendorGridInfo {
  GroupState: any;
  ColumnState: any;
}
