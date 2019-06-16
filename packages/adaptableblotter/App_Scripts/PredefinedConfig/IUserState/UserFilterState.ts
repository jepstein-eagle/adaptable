import { IUserState } from './IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
import { Expression } from '../Common/Expression/Expression';
export interface UserFilterState extends IUserState {
  UserFilters?: UserFilter[];
}

export interface UserFilter extends IAdaptableBlotterObject {
  Name: string;
  Expression: Expression;
  ColumnId: string;
}
