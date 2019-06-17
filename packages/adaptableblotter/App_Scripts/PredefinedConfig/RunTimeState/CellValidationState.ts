import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
import { Expression } from '../Common/Expression/Expression';
import { QueryRange } from '../Common/Expression/QueryRange';
export interface CellValidationState extends RunTimeState {
  CellValidations?: CellValidationRule[];
}

export interface CellValidationRule extends AdaptableBlotterObject {
  ColumnId: string;
  Range: QueryRange;
  ActionMode: 'Warn User' | 'Stop Edit';
  Expression?: Expression;
}
