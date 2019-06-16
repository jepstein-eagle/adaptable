import { IUserState } from './IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';

export interface LayoutState extends IUserState {
  CurrentLayout?: string;
  Layouts?: ILayout[];
}

export interface ILayout extends IAdaptableBlotterObject {
  Name: string;
  Columns: string[];
  ColumnSorts?: IColumnSort[];
  VendorGridInfo?: IVendorGridInfo;
}

export interface IColumnSort {
  Column: string;
  SortOrder: 'Unknown' | 'Ascending' | 'Descending';
}

export interface IVendorGridInfo {
  GroupState: any;
  ColumnState: any;
}
