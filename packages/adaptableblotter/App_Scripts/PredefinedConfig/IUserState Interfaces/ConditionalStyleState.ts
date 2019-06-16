import { IUserState } from '../Interfaces/IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
import { Expression } from '../Common Objects/Expression/Expression';
import { IStyle } from '../Common Objects/IStyle';
export interface ConditionalStyleState extends IUserState {
  ConditionalStyles?: IConditionalStyle[];
}

export interface IConditionalStyle extends IAdaptableBlotterObject {
  ColumnId?: string;
  ColumnCategoryId?: string;
  ConditionalStyleScope?: 'Column' | 'Row' | 'ColumnCategory';
  Expression?: Expression;
  Style?: IStyle;
}
