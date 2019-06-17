import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
import { IStyle } from '../Common/IStyle';
export interface FormatColumnState extends RunTimeState {
  FormatColumns?: FormatColumn[];
}

export interface FormatColumn extends AdaptableBlotterObject {
  ColumnId: string;
  Style: IStyle;
}
