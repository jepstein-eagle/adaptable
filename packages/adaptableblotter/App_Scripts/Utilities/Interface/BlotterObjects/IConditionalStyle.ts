import { Expression } from '../../Expression';
import { IAdaptableBlotterObject } from './IAdaptableBlotterObject';
import { IStyle } from '../IStyle';
export interface IConditionalStyle extends IAdaptableBlotterObject {
  ColumnId?: string;
  ColumnCategoryId?: string;
  ConditionalStyleScope: 'Column' | 'Row' | 'ColumnCategory';
  Expression: Expression;
  Style: IStyle;
}
