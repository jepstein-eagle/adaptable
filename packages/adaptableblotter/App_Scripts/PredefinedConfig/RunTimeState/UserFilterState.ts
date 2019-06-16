import { RunTimeState } from './RunTimeState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
import { Expression } from '../Common/Expression/Expression';
export interface UserFilterState extends RunTimeState {
  UserFilters?: UserFilter[];
}

export interface UserFilter extends IAdaptableBlotterObject {
  Name: string;
  Expression: Expression;
  ColumnId: string;
}
