import { RunTimeState } from './RunTimeState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
import { Expression } from '../Common/Expression/Expression';
export interface ColumnFilterState extends RunTimeState {
  ColumnFilters?: ColumnFilter[];
}

export interface ColumnFilter extends IAdaptableBlotterObject {
  ColumnId: string;
  Filter: Expression;
}
