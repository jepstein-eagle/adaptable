import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
import { Expression } from '../Common/Expression/Expression';
export interface ColumnFilterState extends RunTimeState {
  ColumnFilters?: ColumnFilter[];
}

export interface ColumnFilter extends AdaptableBlotterObject {
  ColumnId: string;
  Filter: Expression;
}
