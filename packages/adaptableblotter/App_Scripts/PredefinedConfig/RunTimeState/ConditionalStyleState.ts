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

/*
A collection of Conditional Styles

An IConditionalStyle consists of 5 properties: (see section below for more information).

ColumnId: The column which will be styled (if there is one)

ColumnCategoryId: The Column Category which will have all its columns styled.

ConditionalStyleScope: Where the Style will be applied.  Possible values are: Column, Row, ColumnCategory

Expression: When the Style should be applied.  Only rows that match the Expression will be styled.  See Expression Object Config for more details.

Style: The style to apply.  See Style Object Config for more details.

*/
