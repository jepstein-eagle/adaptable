import { IVendorGridInfo } from '../IVendorGridInfo';
import { IAdaptableBlotterObject } from './IAdaptableBlotterObject';
import { IColumnSort } from '../IColumnSort';
export interface ILayout extends IAdaptableBlotterObject {
  Name: string;
  Columns: string[];
  ColumnSorts?: IColumnSort[];
  VendorGridInfo?: IVendorGridInfo;
}
