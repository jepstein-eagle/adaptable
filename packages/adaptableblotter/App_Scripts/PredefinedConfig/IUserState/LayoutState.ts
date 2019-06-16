import { IUserState } from './IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';

export interface LayoutState extends IUserState {
  CurrentLayout?: string;
  Layouts?: Layout[];
}

export interface Layout extends IAdaptableBlotterObject {
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
