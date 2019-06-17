import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
import { Expression } from '../Common/Expression/Expression';
export interface UserFilterState extends RunTimeState {
  UserFilters?: UserFilter[];
}

export interface UserFilter extends AdaptableBlotterObject {
  Name: string;
  Expression: Expression;
  ColumnId: string;
}
