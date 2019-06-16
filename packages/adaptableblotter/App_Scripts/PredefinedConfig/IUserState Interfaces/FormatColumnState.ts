import { IUserState } from '../Interfaces/IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
import { IStyle } from '../Common Objects/IStyle';
export interface FormatColumnState extends IUserState {
  FormatColumns?: IFormatColumn[];
}

export interface IFormatColumn extends IAdaptableBlotterObject {
  ColumnId: string;
  Style: IStyle;
}
