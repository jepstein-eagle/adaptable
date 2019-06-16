import { IUserState } from './IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
import { IStyle } from '../Common/IStyle';
export interface FormatColumnState extends IUserState {
  FormatColumns?: FormatColumn[];
}

export interface FormatColumn extends IAdaptableBlotterObject {
  ColumnId: string;
  Style: IStyle;
}
