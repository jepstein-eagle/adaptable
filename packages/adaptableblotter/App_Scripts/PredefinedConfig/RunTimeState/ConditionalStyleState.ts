import { RunTimeState } from './RunTimeState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
import { Expression } from '../Common/Expression/Expression';
import { IStyle } from '../Common/IStyle';
export interface ConditionalStyleState extends RunTimeState {
  ConditionalStyles?: ConditionalStyle[];
}

export interface ConditionalStyle extends IAdaptableBlotterObject {
  ColumnId?: string;
  ColumnCategoryId?: string;
  ConditionalStyleScope?: 'Column' | 'Row' | 'ColumnCategory';
  Expression?: Expression;
  Style?: IStyle;
}
