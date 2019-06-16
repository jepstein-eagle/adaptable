import { IUserState } from './IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
import { Expression } from '../Common/Expression/Expression';
export interface ColumnFilterState extends IUserState {
  ColumnFilters?: ColumnFilter[];
}

export interface ColumnFilter extends IAdaptableBlotterObject {
  ColumnId: string;
  Filter: Expression;
}
