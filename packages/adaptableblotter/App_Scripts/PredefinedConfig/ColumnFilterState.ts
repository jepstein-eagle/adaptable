import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from './Common/AdaptableBlotterObject';
import { Expression } from './Common/Expression';

export interface ColumnFilterState extends RunTimeState {
  ColumnFilters?: ColumnFilter[];
}

export interface ColumnFilter extends AdaptableBlotterObject {
  ColumnId: string;
  Filter: Expression;
}

/*


A collection of ColumnFilter object. Each ColumnFilter contains a single column Expression (see Expression Object Config). However, the Expression can contain as many criteria as you want.

*/
