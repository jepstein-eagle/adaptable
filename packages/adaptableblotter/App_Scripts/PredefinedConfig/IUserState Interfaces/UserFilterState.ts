import { IUserState } from '../Interfaces/IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
import { Expression } from '../Common Objects/Expression/Expression';
export interface UserFilterState extends IUserState {
  UserFilters?: IUserFilter[];
}

export interface IUserFilter extends IAdaptableBlotterObject {
  Name: string;
  Expression: Expression;
  ColumnId: string;
}
