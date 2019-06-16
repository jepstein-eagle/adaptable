import { RunTimeState } from './RunTimeState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
import { IStyle } from '../Common/IStyle';
export interface FormatColumnState extends RunTimeState {
  FormatColumns?: FormatColumn[];
}

export interface FormatColumn extends IAdaptableBlotterObject {
  ColumnId: string;
  Style: IStyle;
}
