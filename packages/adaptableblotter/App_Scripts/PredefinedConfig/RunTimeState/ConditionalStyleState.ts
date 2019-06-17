import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
import { Expression } from '../Common/Expression/Expression';
import { IStyle } from '../Common/IStyle';
export interface ConditionalStyleState extends RunTimeState {
  ConditionalStyles?: ConditionalStyle[];
}

export interface ConditionalStyle extends AdaptableBlotterObject {
  ColumnId?: string;
  ColumnCategoryId?: string;
  ConditionalStyleScope?: 'Column' | 'Row' | 'ColumnCategory';
  Expression?: Expression;
  Style?: IStyle;
}
