import { IVendorGridInfo } from "../IVendorGridInfo";
import { IAdaptableBlotterObject } from "./IAdaptableBlotterObject";
import { IGridSort } from "../IGridSort";
export interface ILayout extends IAdaptableBlotterObject {
  Name: string;
  Columns: string[];
  GridSorts: IGridSort[];
  VendorGridInfo?: IVendorGridInfo;
}
