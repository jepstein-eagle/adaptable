import { IUserState } from './IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
import { Expression } from '../Common/Expression/Expression';
import { IStyle } from '../Common/IStyle';
export interface ConditionalStyleState extends IUserState {
  ConditionalStyles?: ConditionalStyle[];
}

export interface ConditionalStyle extends IAdaptableBlotterObject {
  ColumnId?: string;
  ColumnCategoryId?: string;
  ConditionalStyleScope?: 'Column' | 'Row' | 'ColumnCategory';
  Expression?: Expression;
  Style?: IStyle;
}
