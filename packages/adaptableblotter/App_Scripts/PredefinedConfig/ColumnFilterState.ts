import { RunTimeState } from './RunTimeState';
import { AdaptableObject } from './Common/AdaptableObject';
import { Expression } from './Common/Expression';

export interface ColumnFilterState extends RunTimeState {
  ColumnFilters?: ColumnFilter[];
}

export interface ColumnFilter extends AdaptableObject {
  ColumnId: string;
  Filter: Expression;
}

/*


A collection of ColumnFilter object. Each ColumnFilter contains a single column Expression (see Expression Object Config). However, the Expression can contain as many criteria as you want.

*/
