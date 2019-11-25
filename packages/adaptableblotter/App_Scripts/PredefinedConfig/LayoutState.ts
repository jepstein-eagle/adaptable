import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from './Common/AdaptableBlotterObject';

export interface LayoutState extends RunTimeState {
  CurrentLayout?: string;
  Layouts?: Layout[];
}

export interface Layout extends AdaptableBlotterObject {
  Name: string;
  Columns: string[];
  ColumnSorts?: ColumnSort[];
  GroupedColumns?: string[];
  PivotDetails?: PivotDetails;
  /**
   * **Do not set this when creating a layout**
   *
   *  This is state saved automatically by the Adaptable Blotter
   */
  VendorGridInfo?: VendorGridInfo;
  /**
   * **Do not set this when creating a layout**
   *
   *  This is state saved automatically by the Adaptable Blotter
   */
  BlotterGridInfo?: BlotterGridInfo; // do do
}

export interface ColumnSort {
  Column: string;
  SortOrder: 'Ascending' | 'Descending';
}

export interface VendorGridInfo {
  GroupState?: any;
  ColumnState?: any;
  ColumnGroupState?: any;
  InPivotMode?: boolean;
}

export interface BlotterGridInfo {
  CurrentColumns?: string[];
  CurrentColumnSorts?: ColumnSort[];
}

export interface PivotDetails {
  PivotColumns?: string[];
  AggregationColumns?: string[];
}
