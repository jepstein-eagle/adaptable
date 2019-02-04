import { IAdaptableBlotterObject } from './IAdaptableBlotterObject';
import { IStyle } from "../IStyle";
export interface IFormatColumn extends IAdaptableBlotterObject {
  ColumnId: string;
  Style: IStyle;
}
