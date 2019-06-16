import { IUserState } from './IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
import { IStyle } from '../Common/IStyle';
export interface FormatColumnState extends IUserState {
  FormatColumns?: IFormatColumn[];
}

export interface IFormatColumn extends IAdaptableBlotterObject {
  ColumnId: string;
  Style: IStyle;
}
